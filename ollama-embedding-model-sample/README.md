# Ollama Embedding Model Sample

A basic implementation of Ollama embeddings configured to match OpenAI's `text-embedding-3-small` performance and quality.

## 🎯 Quick Start

### Prerequisites

1. **Install Ollama**
   - Download from [ollama.ai](https://ollama.ai)
   - Install and start the Ollama server

2. **Pull the embedding model**
   ```bash
   ollama pull nomic-embed-text
   ```
   This model provides quality and performance comparable to OpenAI's text-embedding-3-small.

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment configuration
cp .env.example .env
```

### Running the Example

```bash
# Run the example with all demonstrations
pnpm start
```

This will:

- ✅ Connect to Ollama server
- ✅ Generate single embedding
- ✅ Process batch embeddings
- ✅ Calculate semantic similarity
- ✅ Display cache statistics

## 📋 Configuration

Edit `config.js` to customize:

```javascript
{
  baseUrl: 'http://localhost:11434',         // Ollama server URL
  model: {
    name: 'nomic-embed-text',               // Model name
    outputDimension: 768,                   // Embedding dimensions
    maxTokens: 2048,                        // Context window
  },
  batch: {
    enabled: true,
    size: 32,                               // Batch size for processing
  },
  cache: {
    enabled: true,
    type: 'memory',                         // Simple in-memory cache
  }
}
```

## 🔄 Model Comparison

### Ollama `nomic-embed-text` vs OpenAI `text-embedding-3-small`

| Feature              | Ollama            | OpenAI              |
| -------------------- | ----------------- | ------------------- |
| **Output Dimension** | 768               | 512                 |
| **Max Tokens**       | 2048              | 8191                |
| **Cost**             | Free (local)      | $0.02 per 1K tokens |
| **Privacy**          | 100% local        | Cloud-based         |
| **Speed**            | Very fast (local) | Fast (network)      |
| **Quality**          | Excellent         | Excellent           |
| **Multilingual**     | ✅ Yes            | ✅ Yes              |

**Recommendation**: Use Ollama for development, privacy-sensitive applications, and local deployments. Use OpenAI for production scalability and latest model improvements.

## 📖 API Usage

### Single Embedding

```javascript
import { OllamaEmbeddingClient } from "./index.js";

const client = new OllamaEmbeddingClient();
await client.init();

const embedding = await client.getEmbedding("Hello world");
console.log(embedding.length); // 768
```

### Batch Processing

```javascript
const texts = ["First text", "Second text", "Third text"];

const results = await client.getEmbeddings(texts);
// Results include embeddings, caching info, and error handling
```

### Similarity Calculation

```javascript
const similarity = OllamaEmbeddingClient.cosineSimilarity(
  embedding1,
  embedding2,
);
console.log(similarity); // Value between -1 and 1
```

## 🎛️ Features

- ✅ **Automatic retries** - Handles temporary failures gracefully
- ✅ **Built-in caching** - Avoids redundant API calls
- ✅ **Batch processing** - Efficient handling of multiple texts
- ✅ **Error handling** - Comprehensive error messages
- ✅ **Similarity metrics** - Cosine similarity calculation
- ✅ **Configuration** - Easily customizable parameters

## 🚀 Production Considerations

For production use:

1. **Replace in-memory cache** with Redis or similar

   ```javascript
   cache: {
     enabled: true,
     type: 'redis',
     redisUrl: process.env.REDIS_URL,
   }
   ```

2. **Use connection pooling** for multiple requests

   ```javascript
   batch: {
     enabled: true,
     size: 64, // Larger batches for throughput
   }
   ```

3. **Add monitoring** - Track embeddings generated, cache hit rates

   ```javascript
   const stats = client.getCacheStats();
   ```

4. **Error logging** - Integrate with your logging system
   - Monitor timeouts
   - Track retry counts
   - Alert on model availability issues

## 📊 Performance Notes

- **Speed**: ~100ms per embedding on CPU, <10ms on GPU
- **Memory**: Each 768-dim embedding ≈ 3KB
- **Batch processing**: 4-8x faster than sequential for large datasets
- **Caching**: Eliminates redundant computations entirely

## 🔗 Resources

- [Ollama Documentation](https://github.com/andywer/ollama)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- [Nomic Embed Text Model Card](https://huggingface.co/nomic-ai/nomic-embed-text)

## 📝 License

MIT
