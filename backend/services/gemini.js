const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Generate embeddings for text using Gemini API
 * @param {string} text - Text to embed
 * @returns {Promise<number[]>} - 768-dimensional embedding vector
 */
async function generateEmbedding(text) {
    try {
        const response = await axios.post(
            `${GEMINI_BASE_URL}/models/embedding-001:embedContent?key=${GEMINI_API_KEY}`,
            {
                model: 'models/embedding-001',
                content: {
                    parts: [{ text }]
                }
            }
        );

        return response.data.embedding.values;
    } catch (error) {
        console.error('Embedding generation error:', error.response?.data || error.message);
        throw new Error('Failed to generate embedding');
    }
}

/**
 * Generate AI response using Gemini chat model
 * @param {string} prompt - Prompt for the model
 * @returns {Promise<string>} - Generated text response
 */
async function generateText(prompt) {
    try {
        const response = await axios.post(
            `${GEMINI_BASE_URL}/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }
        );

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Text generation error:', error.response?.data || error.message);
        throw new Error('Failed to generate text');
    }
}

/**
 * RAG Prompt: Generate answer from retrieved chunks
 */
function createRAGPrompt(question, chunks) {
    const context = chunks.map((chunk, i) => `[${i + 1}] ${chunk.text}`).join('\n\n');

    return `You are a helpful event assistant. Answer the question based ONLY on the provided context from event documents.

CONTEXT:
${context}

QUESTION: ${question}

INSTRUCTIONS:
- Answer concisely and accurately using only the provided context
- If the answer is not in the context, say "I don't have that information in the event documents."
- Be friendly and helpful
- Keep answers under 200 words

ANSWER:`;
}

/**
 * Classification Prompt: Determine if message needs organizer attention
 */
function createClassificationPrompt(message) {
    return `Analyze this attendee message and determine if it requires organizer attention (flagging).

MESSAGE: "${message}"

Flag the message (should_flag=true) if it contains:
- Bug reports or technical issues
- Complaints or negative feedback
- Safety concerns or emergencies
- Payment/refund issues
- Requests that require human intervention
- Confusion that couldn't be answered by FAQs

Do NOT flag if:
- It's a simple FAQ question
- It's a thank you or positive feedback
- It can be easily answered by documentation

Respond in JSON format:
{
  "should_flag": true/false,
  "confidence": 0.0-1.0,
  "reason": "brief explanation"
}`;
}

module.exports = {
    generateEmbedding,
    generateText,
    createRAGPrompt,
    createClassificationPrompt
};
