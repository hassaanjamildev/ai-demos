import OpenAI from "openai";

// Ollama Embedding Model Configuration
// Configured to match OpenAI text-embedding-3-small performance and quality

export const ollamaConfig = {
  // Ollama server connection
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",

  // Model configuration
  model: {
    name: "nomic-embed-text:latest",
    // nomic-embed-text specifications:
    // - Output dimension: 768 (vs text-embedding-3-small: 512)
    // - Context window: 2048
    // - Training data: Large multilingual corpus
    // - Quality: Comparable to OpenAI text-embedding-3-small
    outputDimension: 768,
    maxTokens: 2048,

    // Embedding parameters
    parameters: {
      // Temperature: 0 for consistency
      temperature: 0,
      // Use default precision (float32)
      precision: "float32",
    },
  },

  // Request configuration
  request: {
    // Timeout in milliseconds
    timeout: 30000,
    // Number of retries on failure
    retries: 3,
    // Retry delay in milliseconds
    retryDelay: 1000,
  },

  // Batch processing
  batch: {
    // Process embeddings in batches for efficiency
    enabled: true,
    // Batch size (adjust based on your system memory)
    // Larger batches = faster but more memory usage
    size: 32,
  },

  // Caching
  cache: {
    enabled: true,
    // Simple in-memory cache (for production use external cache like Redis)
    type: "memory",
  },
};

// OpenAI text-embedding-3-small reference specs (for comparison)
export const openaiReference = {
  modelName: "text-embedding-3-small",
  outputDimension: 512,
  maxTokens: 8191,
  costPer1kTokens: "$0.02",
};

// Model comparison notes
export const modelComparison = `
Ollama nomic-embed-text vs OpenAI text-embedding-3-small:

SIMILARITIES:
✓ Both provide high-quality semantic embeddings
✓ Both support multilingual text
✓ Both are efficient and fast
✓ Similar performance on semantic similarity tasks

DIFFERENCES:
- Ollama: 768 dimensions vs OpenAI: 512 dimensions
  (Higher dimensions can provide more granularity)
- Ollama: Local, free, privacy-focused
- OpenAI: Cloud-based, costs money, proven at scale
- Ollama: Can be run offline
- OpenAI: Regular updates and improvements

RECOMMENDATION:
Use Ollama nomic-embed-text for:
- Local deployment
- Privacy-sensitive applications
- Development and testing
- Cost-effective solutions
`;

// Initialize OpenAI client pointing to Ollama's v1 API endpoint
export const openai = new OpenAI({
  apiKey: "not-needed", // Ollama doesn't require API key
  baseURL: `${ollamaConfig.baseUrl}/v1`, // Ollama OpenAI-compatible endpoint
});
