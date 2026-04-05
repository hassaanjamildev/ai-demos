# AI Monorepo

A monorepo project containing AI/ML related applications and examples, focused on embedding models, vector search, and language model integrations.

## 📦 Workspace Structure

```
AI/
├── ollama-embedding-model-sample/     # Ollama embeddings with OpenAI SDK
├── package.json                       # Root workspace config
├── README.md                          # This file
└── .git/                              # Git repository
```

## 🎯 Projects Overview

### 1. **Ollama Embedding Model Sample**

📁 Location: `./ollama-embedding-model-sample/`

A practical example of using Ollama's `nomic-embed-text` model with the OpenAI JavaScript SDK.

**Features:**

- Local embeddings without API costs
- 768-dimensional embeddings matching quality of OpenAI's `text-embedding-3-small`
- Drop-in replacement for OpenAI SDK
- Easy switching between Ollama and OpenAI providers

**Quick Start:**

```bash
cd ollama-embedding-model-sample
pnpm install
pnpm start
```

**Technology Stack:**

- Node.js (ES6 modules)
- OpenAI JavaScript SDK
- Ollama (local LLM server)

**Full Documentation:** [ollama-embedding-model-sample/README.md](./ollama-embedding-model-sample/README.md)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16+)
- **pnpm** (recommended) or npm/yarn
- **Ollama** (for embedding models)

### Installation

#### 1. Install Ollama

```bash
# macOS
brew install ollama

# or download from https://ollama.ai
```

#### 2. Start Ollama Server

```bash
ollama serve
# Runs on http://localhost:11434
```

#### 3. Pull Required Models

```bash
# For embeddings
ollama pull nomic-embed-text

# Optional: Other useful models
ollama pull llama2          # 7B LLM
ollama pull mistral         # 7B LLM
```

#### 4. Install Project Dependencies

```bash
# Install all workspace dependencies
pnpm install

# Or individual project
cd ollama-embedding-model-sample
pnpm install
```

---

## 📋 Development

### Running Individual Projects

```bash
# Ollama Embedding Example
cd ollama-embedding-model-sample
pnpm start
```

### Project Commands

Each project has its own `package.json` with specific scripts:

```bash
# Run project scripts
pnpm --filter <project-name> <script>

# Example: Run ollama-embedding-model-sample start
pnpm --filter ollama-embedding-model-sample start
```

### Adding New Projects

To add a new project to this monorepo:

1. Create a new directory with its own `package.json`
2. Ensure it has a `name` field for identification
3. Run `pnpm install` from the root to sync dependencies

```bash
# Example
mkdir my-new-project
cd my-new-project
npm init -y
# Add your project files
cd ..
pnpm install
```

---

## 🏗️ Monorepo Architecture

### Current Setup

This is a **pnpm workspace** monorepo. Benefits:

✅ **Shared Dependencies** - Reduce duplication  
✅ **Efficient Disk Usage** - Single `node_modules` strategy  
✅ **Easy Cross-Project Links** - Reference local projects  
✅ **Unified Scripting** - Run commands across workspace

### Future Scaling

When the monorepo grows, consider:

- **Lerna** - Task orchestration and versioning
- **Nx** - Advanced build caching and dependency graph
- **Yarn Workspaces** - Alternative workspace manager
- **Turborepo** - Fast build system for monorepos

---

## 💻 Technology Stack

### Cross-Project

- **Runtime**: Node.js (ES6 modules)
- **Package Manager**: pnpm
- **Language**: JavaScript

### AI/ML Stack

- **Ollama** - Local LLM inference
- **OpenAI SDK** - Chat and embeddings integration
- **Nomic Embed Text** - High-quality embeddings

### Models Available

| Model              | Type       | Size | Use Case                    |
| ------------------ | ---------- | ---- | --------------------------- |
| `nomic-embed-text` | Embeddings | 274M | Semantic search, similarity |
| `llama2`           | LLM        | 7B   | Chat, text generation       |
| `mistral`          | LLM        | 7B   | Fast inference              |
| `neural-chat`      | LLM        | 7B   | Conversational              |

---

## 📚 Project Documentation

Each project contains detailed documentation:

- **[ollama-embedding-model-sample](./ollama-embedding-model-sample/README.md)** - Embeddings setup and usage

---

## 🔧 Troubleshooting

### Ollama Server Not Running

```bash
# Start Ollama server (if not already running)
ollama serve
```

### Model Not Found

```bash
# List available models
ollama list

# Pull a missing model
ollama pull nomic-embed-text
```

### Dependency Issues

```bash
# Clean install all dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 🔗 Useful Resources

- [Ollama Official](https://ollama.ai)
- [OpenAI JavaScript SDK](https://github.com/openai/node-sdk)
- [pnpm Documentation](https://pnpm.io)
- [Node.js ES Modules](https://nodejs.org/en/docs/guides/ecmascript-modules/)

---

## 📝 Environment Variables

Create a `.env` file in individual projects:

```bash
# .env files are git-ignored
OLLAMA_BASE_URL=http://localhost:11434
OPENAI_API_KEY=your-key-here  # Only if using OpenAI
```

See `.env.example` in individual projects for templates.

---

## 🎯 Future Projects

Planned additions to this monorepo:

- [ ] Vector database integration (Pinecone/Weaviate)
- [ ] Chat application example
- [ ] Document embedding & search
- [ ] Fine-tuning pipeline
- [ ] RAG (Retrieval Augmented Generation) example

---

## 🤝 Contributing

1. Create a new project directory with its own `package.json`
2. Follow the existing project structure
3. Include a detailed `README.md` for your project
4. Update this root `README.md` to document new projects

---

## 📜 License

MIT

---

## ℹ️ About This Monorepo

**Created**: April 2026  
**Purpose**: AI/ML experimentation and examples  
**Focus**: Local-first, cost-effective AI development

This monorepo demonstrates best practices for:

- Local LLM usage with Ollama
- Vector embeddings and similarity search
- OpenAI SDK integration and flexibility
- Monorepo project organization

---

**Last Updated**: April 5, 2026
