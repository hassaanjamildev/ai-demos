# Vercel AI SDK + Ollama Integration

A comprehensive demonstration of integrating **Vercel AI SDK** with **Ollama** for local AI model inference with tool/function calling capabilities. This project showcases the **Driving Institute v2** model configuration with specialized tools for driving education and safety scenarios.

## 🎯 Project Overview

This project demonstrates how to:

- Integrate Vercel AI SDK with local Ollama models
- Define and manage AI model configurations
- Implement tool-based interactions with LLMs
- Create reusable tool definitions with proper TypeScript typing
- Handle language-aware responses

### Key Features

✨ **Modular Architecture**

- Separation of concerns with dedicated tool directory
- Reusable configuration exports
- Type-safe tool definitions

🚗 **Driving Institute Model**

- Optimized for driving education scenarios
- 4 specialized tools for driving knowledge
- Low temperature (0.3) for consistent safety recommendations

🔧 **Tool System**

- Check Road Rules - Query traffic regulations
- Analyze Driving Scenario - Safety analysis for driving situations
- Generate Practice Question - Create driving test questions
- Get Safety Tips - Retrieve safety recommendations for conditions

📚 **Comprehensive Examples**

- Configuration demo with detailed output
- Model testing
- 4 complete tool usage examples with proper error handling

---

## 📁 Project Structure

```
3-vercel-ai-sdk-ollama/
├── src/
│   ├── app.ts                      # Main application with demos
│   └── configs/
│       ├── ollama.ts               # Core Ollama configuration
│       └── tools/
│           ├── index.ts            # Tools export hub
│           ├── checkRoadRules.ts   # Road rules tool
│           ├── analyzeDrivingScenario.ts  # Scenario analysis tool
│           ├── generatePracticeQuestion.ts # Question generation tool
│           └── getSafetyTips.ts    # Safety tips tool
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── .env                            # Environment variables
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ with ES6 module support
- **pnpm** 10.33.2+
- **Ollama** running locally (default: `http://localhost:11434`)

### Installation

1. **Install dependencies:**

   ```bash
   cd 3-vercel-ai-sdk-ollama
   pnpm install
   ```

2. **Configure environment (optional):**
   Create or edit `.env` file:

   ```env
   OLLAMA_BASE_URL=http://localhost:11434
   ```

3. **Ensure Ollama is running:**
   ```bash
   # In a separate terminal
   ollama serve
   ```

### Running the Project

```bash
# Start the demo
pnpm start

# Output will show:
# 1. Configuration details for driving-institute:v2 model
# 2. Model test query
# 3. Four detailed tool usage examples
```

---

## 🏗️ Architecture

### Configuration System

The project uses a centralized configuration approach:

**`src/configs/ollama.ts`**

- Defines model parameters and configurations
- Imports and registers tools
- Exports helper functions
- Type definitions for all configurations

**`src/configs/tools/index.ts`**

- Central export point for all tools
- Maintains `allTools` array for bulk access
- Exports TypeScript interfaces for parameters

### Tool Definitions

Each tool follows this structure:

```typescript
// Tool definition with JSON schema
export const toolName = {
  name: "tool_identifier",
  description: "What the tool does",
  parameters: {
    /* JSON Schema */
  },
};

// TypeScript interface for type safety
export interface ToolNameParams {
  requiredParam: string;
  optionalParam?: string;
}
```

### Model Configuration

```typescript
interface ModelConfig {
  name: string; // Display name
  modelId: string; // Model identifier
  maxTokens: number; // Maximum token limit
  supportsTools: boolean; // Tool support flag
  parameters: ModelParameters; // Temperature, topP, topK
  tools?: ToolDefinition[]; // Available tools
}
```

---

## 🔧 Available Tools

### 1. Check Road Rules

**Query specific traffic rules and regulations**

```typescript
checkRoadRulesTool: {
  topic: string;      // Required: Specific road rule topic
  region?: string;    // Optional: Geographic region
}
```

**Example:**

```
Topic: "Right-of-way at 4-way stop"
Region: "USA"
```

### 2. Analyze Driving Scenario

**Analyze driving scenarios for safety and best practices**

```typescript
analyzeDrivingScenarioTool: {
  scenario: string;    // Required: Description of scenario
  context?: string;    // Optional: Additional context
}
```

**Example:**

```
Scenario: "Merging onto highway in heavy rain with reduced visibility"
Context: "During evening rush hour"
```

### 3. Generate Practice Question

**Generate driving test practice questions**

```typescript
generatePracticeQuestionTool: {
  topic: string;           // Required: Question topic
  difficulty?: "easy" | "medium" | "hard"  // Optional: Difficulty level
}
```

**Example:**

```
Topic: "Safe following distance"
Difficulty: "medium"
```

### 4. Get Safety Tips

**Retrieve safety recommendations for driving conditions**

```typescript
getSafetyTipsTool: {
  condition: string;       // Required: Weather/time/traffic condition
  vehicleType?: "car" | "motorcycle" | "truck"  // Optional: Vehicle type
}
```

**Example:**

```
Condition: "Night driving"
VehicleType: "car"
```

---

## 📋 Model Configuration Details

### Driving Institute v2

**Model ID:** `driving-institute:v2`

**Parameters:**

- **Temperature:** 0.3 (Lower = more consistent safety recommendations)
- **Top-P:** 0.9 (Nucleus sampling for balanced variety)
- **Top-K:** 40 (Top candidates for context-aware responses)
- **Max Tokens:** 2048

**Request Configuration:**

- **Timeout:** 30 seconds
- **Retries:** 3 attempts
- **Retry Delay:** 2 seconds

---

## 💻 Usage Examples

### Basic Model Interaction

```typescript
import { ollama, generateText } from "ai-sdk-ollama";

const { text } = await generateText({
  model: ollama("driving-institute:v2"),
  prompt: "What are the key safety tips for highway driving?",
});

console.log(text);
```

### Using Tools

```typescript
import { ollama, generateText } from "ai-sdk-ollama";
import {
  checkRoadRulesTool,
  type CheckRoadRulesParams,
} from "./configs/ollama.js";
import { z } from "zod";

const { text } = await generateText({
  model: ollama("driving-institute:v2"),
  tools: {
    check_road_rules: {
      description: checkRoadRulesTool.description,
      inputSchema: z.object({
        topic: z.string(),
        region: z.string().optional(),
      }),
      execute: async (params: CheckRoadRulesParams) => {
        // Handle tool execution
        return "Tool result";
      },
    },
  },
  prompt: "What is the right-of-way rule at a 4-way stop?",
});

console.log(text);
```

### Language-Aware Responses

The system maintains language consistency automatically. When you provide a prompt in a specific language, responses will be in that language:

```typescript
// System message for language consistency
system: "Respond in the same language as the user's input. Maintain consistency with the language used in the prompt.";
```

---

## 🔌 Dependencies

### Core Dependencies

- **ai** (^6.0.0) - Vercel AI SDK for LLM interactions
- **ai-sdk-ollama** (^3.8.3) - Ollama provider for AI SDK
- **zod** (^4.3.6) - TypeScript-first schema validation

### Development Dependencies

- **typescript** (^5.9.3) - TypeScript compiler
- **tsx** (^4.21.0) - TypeScript executor
- **@types/node** (^25.5.2) - Node.js type definitions

---

## 🛠️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Ollama server connection
OLLAMA_BASE_URL=http://localhost:11434

# Optional: Additional configuration
NODE_ENV=development
```

### TypeScript Configuration

The project uses ESNext modules with the following settings:

- **Module:** nodenext
- **Target:** esnext
- **Types:** Node.js types enabled
- **Strict Mode:** Enabled with additional checks

---

## 📊 Demo Output

Running `pnpm start` produces:

```
======================================================================
🚗 DRIVING INSTITUTE v2 - OLLAMA CONFIGURATION DEMO
======================================================================

📋 MODEL INFORMATION:
  • Name: Driving Institute v2
  • Model ID: driving-institute:v2
  • Max Tokens: 2048
  • Supports Tools: ✓ Yes

⚙️  MODEL PARAMETERS:
  • Temperature: 0.3 (lower = more consistent)
  • Top-P: 0.9 (nucleus sampling)
  • Top-K: 40 (top candidates)

🔧 AVAILABLE TOOLS:
  1. check_road_rules
  2. analyze_driving_scenario
  3. generate_practice_question
  4. get_safety_tips

⏱️  REQUEST CONFIGURATION:
  • Timeout: 30000ms (30s)
  • Retries: 3
  • Retry Delay: 2000ms

🌐 BASE CONFIGURATION:
  • Ollama Base URL: http://localhost:11434
  • Available Models: 1
  • Models: driving-institute:v2

======================================================================
```

---

## 🐛 Troubleshooting

### Issue: Cannot connect to Ollama

**Solution:** Ensure Ollama is running:

```bash
ollama serve
```

### Issue: Model not found

**Solution:** Verify the model exists:

```bash
ollama list
# Pull the model if needed:
ollama pull qwen2.5:7b
```

### Issue: Tool execution errors

**Solution:** Check that tool parameters match the expected schema in TypeScript interfaces.

---

## 📝 Notes

- The project uses ES6 modules (`"type": "module"` in package.json)
- All tools support both English and multilingual prompts
- Language consistency is maintained through system messages
- Tool responses automatically match the prompt language

---

## 🤝 Contributing

To extend this project:

1. **Add new tools:** Create a new file in `src/configs/tools/`
2. **Export tools:** Add exports to `src/configs/tools/index.ts`
3. **Import in config:** Update imports in `src/configs/ollama.ts`
4. **Create examples:** Add example functions in `src/app.ts`

---

## 📄 License

MIT

---

## 👤 Author

Hassan Jamil

---

## 🔗 Resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/)
- [Ollama Documentation](https://ollama.ai/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Zod Schema Validation](https://zod.dev/)

---

## 📞 Support

For issues or questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review example implementations in `src/app.ts`
3. Verify Ollama is running and configured correctly
