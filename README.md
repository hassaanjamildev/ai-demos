# AI Monorepo

A monorepo project containing AI/ML related applications and examples, focused on embedding models, vector search, and language model integrations.

## 📦 Workspace Structure

```
AI/
├── 1-ollama-embedding-model-sample/       # Ollama embeddings with OpenAI SDK
├── 2-embedding-vector-db/                 # Vector database with embeddings
├── 3-vercel-ai-sdk-ollama/                # Vercel AI SDK + Ollama integration
├── package.json                           # Root workspace config
├── pnpm-workspace.yaml                    # Workspace configuration
├── README.md                              # This file
└── .git/                                  # Git repository
```

## 🎯 Projects Overview

### 1. **Ollama Embedding Model Sample** ✨

📁 Location: `./1-ollama-embedding-model-sample/`

A practical example of using Ollama's `nomic-embed-text` model with the OpenAI JavaScript SDK.

**Features:**

- Local embeddings without API costs
- 768-dimensional embeddings matching OpenAI's `text-embedding-3-small`
- Drop-in replacement for OpenAI SDK
- Easy provider switching

**Quick Start:**

```bash
cd 1-ollama-embedding-model-sample
pnpm install
pnpm start
```

**Full Documentation:** [1-ollama-embedding-model-sample/README.md](./1-ollama-embedding-model-sample/README.md)

---

### 2. **Embedding Vector Database**

📁 Location: `./2-embedding-vector-db/`

Integration of embeddings with vector database capabilities using Prisma.

**Features:**

- Vector storage and retrieval
- pgvector extension support
- Prisma ORM integration
- Document management

**Quick Start:**

```bash
cd 2-embedding-vector-db
pnpm install
pnpm start
```

**Full Documentation:** [2-embedding-vector-db/README.md](./2-embedding-vector-db/README.md)

---

### 3. **Vercel AI SDK + Ollama Integration** 🚀 (New!)

📁 Location: `./3-vercel-ai-sdk-ollama/`

Comprehensive demonstration of Vercel AI SDK with Ollama featuring the **Driving Institute v2** model and specialized tools for driving education.

**Key Features:**

- ✅ Modular tool architecture with dedicated tool directory
- ✅ Driving Institute v2 model configuration (optimized for education)
- ✅ 4 specialized tools: Road Rules, Scenario Analysis, Practice Questions, Safety Tips
- ✅ Language-aware responses matching input language
- ✅ Full TypeScript support with type-safe parameters
- ✅ Comprehensive configuration demo and examples

**Model Configuration:**

- **Temperature:** 0.3 (consistent safety recommendations)
- **Top-P:** 0.9 (balanced variety)
- **Top-K:** 40 (context-aware responses)
- **Timeout:** 30 seconds with 3 retries

**Available Tools:**

1. **Check Road Rules** - Query specific traffic regulations
2. **Analyze Driving Scenario** - Safety analysis for driving situations
3. **Generate Practice Question** - Create driving test questions
4. **Get Safety Tips** - Retrieve safety tips for conditions

**Quick Start:**

```bash
cd 3-vercel-ai-sdk-ollama
pnpm install
pnpm start
```

**Output Example:**

- Configuration details for driving-institute:v2 model
- Model capability test
- 4 detailed tool usage examples with proper error handling
- Language consistency validation

**Technology Stack:**

- Vercel AI SDK (^6.0.0)
- ai-sdk-ollama (^3.8.3)
- Zod for schema validation
- TypeScript 5.9.3

**Full Documentation:** [3-vercel-ai-sdk-ollama/README.md](./3-vercel-ai-sdk-ollama/README.md)

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
# Ollama Embedding Example (Project 1)
cd 1-ollama-embedding-model-sample
pnpm start

# Vector Database Example (Project 2)
cd 2-embedding-vector-db
pnpm start

# Vercel AI SDK Example (Project 3)
cd 3-vercel-ai-sdk-ollama
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

## � Technology Stack

### Cross-Project

- **Runtime**: Node.js (ES6 modules)
- **Package Manager**: pnpm
- **Language**: JavaScript/TypeScript
- **Workspace**: pnpm workspaces

### AI/ML Stack

- **Ollama** - Local LLM inference
- **Vercel AI SDK** - Unified AI interface with tool support
- **OpenAI SDK** - Chat and embeddings integration
- **Nomic Embed Text** - High-quality embeddings
- **Prisma** - Database ORM
- **pgvector** - PostgreSQL vector extension

### Development Tools

- **TypeScript** 5.9.3 - Type safety
- **Zod** - Schema validation
- **tsx** - TypeScript executor
- **ESLint** - Code linting (optional)

### Models Available

| Model                  | Type       | Size | Use Case                    | Project |
| ---------------------- | ---------- | ---- | --------------------------- | ------- |
| `nomic-embed-text`     | Embeddings | 274M | Semantic search, similarity | 1, 2    |
| `llama2`               | LLM        | 7B   | Chat, text generation       | 1       |
| `mistral`              | LLM        | 7B   | Fast inference              | 1       |
| `neural-chat`          | LLM        | 7B   | Conversational              | 1       |
| `driving-institute:v2` | LLM        | ~7B  | Driving education, tools    | 3       |

---

## 📚 Project Documentation

Each project contains detailed documentation:

- **[1-ollama-embedding-model-sample](./1-ollama-embedding-model-sample/README.md)** - Embeddings setup and usage
- **[2-embedding-vector-db](./2-embedding-vector-db/README.md)** - Vector database integration
- **[3-vercel-ai-sdk-ollama](./3-vercel-ai-sdk-ollama/README.md)** - AI SDK + Tool integration

## 📊 Project Comparison

| Feature           | Project 1       | Project 2        | Project 3         |
| ----------------- | --------------- | ---------------- | ----------------- |
| **Focus**         | Embeddings      | Vector DB        | AI + Tools        |
| **Models**        | Embeddings      | Embeddings       | LLM               |
| **Tool Support**  | ✗               | ✗                | ✓                 |
| **Type Safety**   | Partial         | Partial          | Full (TypeScript) |
| **Configuration** | Basic           | Advanced         | Advanced          |
| **Use Case**      | Semantic Search | Document Storage | Intelligent Agent |
| **Complexity**    | Beginner        | Intermediate     | Advanced          |

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
- [Vercel AI SDK Documentation](https://sdk.vercel.ai/)
- [OpenAI JavaScript SDK](https://github.com/openai/node-sdk)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [pnpm Documentation](https://pnpm.io)
- [Node.js ES Modules](https://nodejs.org/en/docs/guides/ecmascript-modules/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Zod Schema Validation](https://zod.dev/)

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

- [ ] Advanced RAG (Retrieval Augmented Generation) example
- [ ] Multi-model orchestration
- [ ] Real-time streaming responses
- [ ] Agent-based workflows
- [ ] Custom model fine-tuning pipeline
- [ ] Chat application with persistent storage
- [ ] Document processing and indexing
- [ ] Performance benchmarking tools

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

**Last Updated**: April 24, 2026
**Latest Project**: Vercel AI SDK + Ollama Integration (Project 3)
