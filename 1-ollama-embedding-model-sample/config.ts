import OpenAI from "openai";

// Ollama Embedding Model Configuration
// Configured to match OpenAI text-embedding-3-small performance and quality

interface ModelParameters {
  temperature: number;
  precision: string;
}

interface ModelConfig {
  name: string;
  outputDimension: number;
  maxTokens: number;
  parameters: ModelParameters;
}

interface RequestConfig {
  timeout: number;
  retries: number;
  retryDelay: number;
}

interface BatchConfig {
  enabled: boolean;
  size: number;
}

interface CacheConfig {
  enabled: boolean;
  type: string;
}

interface OllamaConfig {
  baseUrl: string;
  model: ModelConfig;
  request: RequestConfig;
  batch: BatchConfig;
  cache: CacheConfig;
}

export const ollamaConfig: OllamaConfig = {
  // Ollama server connection
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",

  // Model configuration
  model: {
    name: "nomic-embed-text:latest",
    outputDimension: 768,
    maxTokens: 2048,
    parameters: {
      temperature: 0,
      precision: "float32",
    },
  },

  // Request configuration
  request: {
    timeout: 30000,
    retries: 3,
    retryDelay: 1000,
  },

  // Batch processing
  batch: {
    enabled: true,
    size: 32,
  },

  // Caching
  cache: {
    enabled: true,
    type: "memory",
  },
};

interface OpenAIReference {
  modelName: string;
  outputDimension: number;
  maxTokens: number;
  costPer1kTokens: string;
}

// OpenAI text-embedding-3-small reference specs (for comparison)
export const openaiReference: OpenAIReference = {
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
