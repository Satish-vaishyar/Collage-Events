const { admin } = require('../config/firebase');
const { generateEmbedding, generateText, createRAGPrompt } = require('./gemini');

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Retrieve top-k most relevant chunks for a query
 */
async function retrieveChunks(eventId, query, topK = 5) {
    const db = admin.firestore();

    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // Get all chunks for the event
    const chunksSnapshot = await db.collection('events').doc(eventId)
        .collection('chunks').get();

    if (chunksSnapshot.empty) {
        return [];
    }

    // Calculate similarity scores
    const chunksWithScores = [];
    chunksSnapshot.forEach(doc => {
        const chunk = doc.data();
        const similarity = cosineSimilarity(queryEmbedding, chunk.embedding);

        chunksWithScores.push({
            id: doc.id,
            text: chunk.text,
            documentId: chunk.documentId,
            position: chunk.position,
            similarity
        });
    });

    // Sort by similarity and return top-k
    chunksWithScores.sort((a, b) => b.similarity - a.similarity);
    return chunksWithScores.slice(0, topK);
}

/**
 * RAG: Retrieve chunks and generate answer
 */
async function answerQuestion(eventId, question) {
    // Retrieve relevant chunks
    const chunks = await retrieveChunks(eventId, question, 5);

    if (chunks.length === 0) {
        return "I don't have any event documents to reference. Please contact the organizer.";
    }

    // Generate answer using RAG prompt
    const prompt = createRAGPrompt(question, chunks);
    const answer = await generateText(prompt);

    return answer;
}

module.exports = {
    cosineSimilarity,
    retrieveChunks,
    answerQuestion
};
