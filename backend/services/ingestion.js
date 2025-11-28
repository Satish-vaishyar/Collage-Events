const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { generateEmbedding } = require('./gemini');
const { admin } = require('../config/firebase');

const CHUNK_SIZE = 400; // tokens (approx 300 words)
const CHUNK_OVERLAP = 100; // tokens

/**
 * Parse document based on file type
 */
async function parseDocument(buffer, filename) {
    const ext = filename.split('.').pop().toLowerCase();

    try {
        if (ext === 'pdf') {
            const data = await pdfParse(buffer);
            return data.text;
        } else if (ext === 'docx') {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        } else if (ext === 'txt') {
            return buffer.toString('utf-8');
        } else {
            throw new Error(`Unsupported file type: ${ext}`);
        }
    } catch (error) {
        console.error('Document parsing error:', error);
        throw new Error('Failed to parse document');
    }
}

/**
 * Split text into chunks with overlap
 */
function chunkText(text) {
    // Simple word-based chunking (approximate token count: 1 token ≈ 0.75 words)
    const words = text.split(/\s+/);
    const chunks = [];
    const wordsPerChunk = Math.floor(CHUNK_SIZE * 0.75);
    const wordsOverlap = Math.floor(CHUNK_OVERLAP * 0.75);

    for (let i = 0; i < words.length; i += wordsPerChunk - wordsOverlap) {
        const chunk = words.slice(i, i + wordsPerChunk).join(' ');
        if (chunk.trim()) {
            chunks.push(chunk.trim());
        }
    }

    return chunks;
}

/**
 * Process document: parse -> chunk -> embed -> store
 */
async function ingestDocument(eventId, documentId, buffer, filename) {
    const db = admin.firestore();

    console.log(`📄 Processing document: ${filename}`);

    // 1. Parse document
    const text = await parseDocument(buffer, filename);
    console.log(`✅ Parsed ${text.length} characters`);

    // 2. Chunk text
    const chunks = chunkText(text);
    console.log(`✅ Created ${chunks.length} chunks`);

    // 3. Generate embeddings and store chunks
    const batch = db.batch();

    for (let i = 0; i < chunks.length; i++) {
        const chunkText = chunks[i];

        // Generate embedding
        const embedding = await generateEmbedding(chunkText);

        // Store chunk with embedding
        const chunkRef = db.collection('events').doc(eventId)
            .collection('chunks').doc();

        batch.set(chunkRef, {
            documentId,
            text: chunkText,
            embedding,
            position: i,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log(`✅ Embedded chunk ${i + 1}/${chunks.length}`);
    }

    // Update document metadata
    const docRef = db.collection('events').doc(eventId)
        .collection('documents').doc(documentId);

    batch.update(docRef, {
        processedAt: admin.firestore.FieldValue.serverTimestamp(),
        chunkCount: chunks.length
    });

    await batch.commit();
    console.log(`✅ Stored ${chunks.length} chunks for document ${documentId}`);

    return chunks.length;
}

module.exports = {
    parseDocument,
    chunkText,
    ingestDocument
};
