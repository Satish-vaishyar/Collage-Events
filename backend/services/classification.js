const { generateText, createClassificationPrompt } = require('./gemini');

// Quick keyword fallback to avoid unnecessary LLM calls
const URGENT_KEYWORDS = [
    'bug', 'error', 'broken', 'not working', 'crash', 'issue', 'problem',
    'complaint', 'refund', 'cancel', 'emergency', 'urgent', 'help',
    'payment failed', 'charged twice', 'scam', 'fraud'
];

const POSITIVE_KEYWORDS = [
    'thank', 'thanks', 'great', 'awesome', 'love', 'amazing', 'perfect'
];

/**
 * Quick keyword-based classification fallback
 */
function quickClassify(message) {
    const lowerMessage = message.toLowerCase();

    // Check positive feedback - definitely don't flag
    if (POSITIVE_KEYWORDS.some(kw => lowerMessage.includes(kw))) {
        return { should_flag: false, confidence: 0.8, reason: 'Positive feedback' };
    }

    // Check urgent keywords - likely need flagging
    if (URGENT_KEYWORDS.some(kw => lowerMessage.includes(kw))) {
        return { should_flag: true, confidence: 0.7, reason: 'Contains urgent keywords' };
    }

    // Inconclusive - need LLM
    return null;
}

/**
 * Classify message to determine if it needs organizer attention
 */
async function classifyMessage(message) {
    // Try quick classification first
    const quickResult = quickClassify(message);
    if (quickResult) {
        console.log('📌 Quick classification:', quickResult);
        return quickResult;
    }

    // Use LLM for more nuanced classification
    try {
        const prompt = createClassificationPrompt(message);
        const responseText = await generateText(prompt);

        // Parse JSON response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const result = JSON.parse(jsonMatch[0]);
            console.log('🤖 LLM classification:', result);
            return result;
        }

        // Fallback if JSON parsing fails
        return { should_flag: true, confidence: 0.5, reason: 'Parse error - flag for safety' };
    } catch (error) {
        console.error('Classification error:', error);
        // Default to flagging on error (safer)
        return { should_flag: true, confidence: 0.3, reason: 'Error - flag for safety' };
    }
}

module.exports = {
    classifyMessage,
    quickClassify
};
