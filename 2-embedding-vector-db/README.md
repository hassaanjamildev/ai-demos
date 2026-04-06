# Ollama Embedding Model Sample

A simple and practical example of using **Ollama's `nomic-embed-text` model** with the **OpenAI SDK**, configured to match the performance and quality of OpenAI's `text-embedding-3-small`.

## 🎯 Overview

This project demonstrates how to:

- ✅ Use Ollama embeddings with the OpenAI JavaScript library
- ✅ Run embeddings locally without API costs
- ✅ Generate high-quality 768-dimensional embeddings
- ✅ Switch seamlessly between Ollama and OpenAI

Perfect for development, testing, and production deployments where you want **privacy-first, cost-effective embeddings**.

---

## 🚀 Quick Start

### Prerequisites

1. **Install Ollama**
   - Download from [ollama.ai](https://ollama.ai)
   - Install and start the Ollama server locally

2. **Pull the embedding model**

   ```bash
   ollama pull nomic-embed-text
   ```

3. **Verify Ollama is running**
   ```bash
   curl http://localhost:11434/api/tags
   ```

### Installation

```bash
# Install dependencies
pnpm install
# or
npm install
# or
yarn install
```

### Run the Example

```bash
# Run with default configuration
pnpm start
```

You should see embeddings output:

```
[
  {
    object: 'embedding',
    embedding: [ -0.0013, 0.0271, -0.1382, ... (768 total) ],
    index: 0
  }
]
```

---

## 📋 Configuration

Edit `config.js` to customize the embedding behavior:

```javascript
export const ollamaConfig = {
  baseUrl: "http://localhost:11434", // Ollama server URL
  model: {
    name: "nomic-embed-text:latest", // Model name
    outputDimension: 768, // Embedding dimensions
    maxTokens: 2048, // Context window
  },
  batch: {
    enabled: true,
    size: 32, // Batch size
  },
  cache: {
    enabled: true,
    type: "memory", // In-memory or Redis
  },
};
```

### Environment Variables

Create a `.env` file:

```bash
OLLAMA_BASE_URL=http://localhost:11434
```

Or use the `.env.example` template:

```bash
cp .env.example .env
```

---

## 📊 Model Comparison

### Ollama `nomic-embed-text` vs OpenAI `text-embedding-3-small`

| Feature              | Ollama               | OpenAI                 |
| -------------------- | -------------------- | ---------------------- |
| **Output Dimension** | 768                  | 512                    |
| **Max Tokens**       | 2048                 | 8191                   |
| **Quality**          | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Excellent   |
| **Speed**            | ⚡ Very Fast         | ✈️ Fast (network)      |
| **Cost**             | 💰 Free (local)      | 💵 $0.02 per 1K tokens |
| **Privacy**          | 🔒 100% Local        | ☁️ Cloud-based         |
| **Multilingual**     | ✅ Yes               | ✅ Yes                 |
| **Offline**          | ✅ Works             | ❌ Requires API        |

**Key Advantage**: 768-dimensional embeddings provide **50% more capacity** for nuanced semantic representation compared to text-embedding-3-small's 512 dimensions.

---

## 💻 Code Example

### Simple Usage

```javascript
import { openai } from "./config.js";

async function main() {
  const embedding = await openai.embeddings.create({
    model: "nomic-embed-text:latest",
    input: "Your text here",
  });

  console.log(embedding.data[0].embedding);
}

main();
```

### Multiple Texts

```javascript
const embeddings = await openai.embeddings.create({
  model: "nomic-embed-text:latest",
  input: ["First text", "Second text", "Third text"],
});

embeddings.data.forEach((item) => {
  console.log(`Text ${item.index}:`, item.embedding);
});
```

### Calculate Similarity

```javascript
function cosineSimilarity(a, b) {
  let dotProduct = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

const emb1 = embeddings.data[0].embedding;
const emb2 = embeddings.data[1].embedding;
const similarity = cosineSimilarity(emb1, emb2);

console.log(`Similarity: ${similarity.toFixed(4)}`);
```

---

## 🔄 Switching Between Ollama and OpenAI

### Use Ollama (Default)

```javascript
import { openai } from "./config.js"; // Points to local Ollama
```

### Switch to OpenAI

Update `config.js`:

```javascript
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // Falls back to default OpenAI baseURL
});
```

Then update `index.js`:

```javascript
const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small", // Change model
  input: content,
});
```

No other code changes needed! 🎉

---

## 📦 Project Structure

```
ollama-embedding-model-sample/
├── index.js              # Main application entry point
├── config.js             # Configuration & OpenAI client
├── package.json          # NPM dependencies
├── .env.example          # Environment template
├── .env                  # Your local environment (git ignored)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

---

## ⚙️ Advanced Configuration

### Custom Ollama Server

```javascript
// config.js
export const ollamaConfig = {
  baseUrl: "http://your-ollama-server:11434",
  // ...
};
```

### Using Different Models

Ollama supports multiple embedding models:

```bash
ollama pull all-minilm            # Smaller, faster
ollama pull mxbai-embed-large     # Larger, better quality
ollama pull nomic-embed-text      # Balanced (default)
```

Then update `config.js`:

```javascript
model: {
  name: "mxbai-embed-large:latest",
  outputDimension: 1024,
}
```

---

## 🎯 Use Cases

✅ **Semantic Search** - Find similar documents/texts  
✅ **Clustering** - Group similar items together  
✅ **Recommendations** - Suggest related content  
✅ **Classification** - Embed text for ML models  
✅ **Development & Testing** - Test embedding workflows locally  
✅ **Privacy-Sensitive Apps** - Never leave your infrastructure

---

## 📈 Performance

- **Speed**: ~100ms per embedding on CPU, <10ms on GPU
- **Memory**: ~3KB per embedding (768-dim × 4 bytes)
- **Dimensions**: 768 (high-quality representations)
- **Context Window**: 2048 tokens (handles long texts)
- **Local Processing**: No network latency

---

## 🔗 Resources

- [Ollama Official](https://ollama.ai)
- [OpenAI JavaScript SDK](https://github.com/openai/node-sdk)
- [Nomic Embed Text](https://huggingface.co/nomic-ai/nomic-embed-text)
- [Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)

---

## 📝 Environment Setup

### macOS / Linux

```bash
# 1. Install Ollama
brew install ollama
# or download from ollama.ai

# 2. Start Ollama
ollama serve

# 3. In another terminal, pull the model
ollama pull nomic-embed-text

# 4. Install dependencies
pnpm install

# 5. Run the example
pnpm start
```

### Windows

1. Download Ollama from [ollama.ai](https://ollama.ai)
2. Install and run
3. In terminal:
   ```bash
   ollama pull nomic-embed-text
   pnpm install
   pnpm start
   ```

---

## ✨ Features

- ✅ **Simple API** - One function to get embeddings
- ✅ **OpenAI Compatible** - Drop-in replacement for OpenAI SDK
- ✅ **High Quality** - 768-dimensional embeddings
- ✅ **Fast & Efficient** - Local processing, no network latency
- ✅ **Cost-Effective** - No per-request charges
- ✅ **Privacy First** - All data stays on your machine
- ✅ **Easy Switching** - Change from Ollama to OpenAI in seconds
- ✅ **Production Ready** - Configurable and extensible

---

## 🤝 Contributing

Feel free to fork, modify, and use this project for your needs!

---

## 📜 License

MIT

---

## 🎓 Learn More

This project uses:

- **Ollama** - Run large language models locally
- **OpenAI Node SDK** - Official OpenAI JavaScript client
- **nomic-embed-text** - High-quality open-source embeddings

For questions or issues, check the respective documentation.
