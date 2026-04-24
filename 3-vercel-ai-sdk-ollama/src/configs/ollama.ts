/**
 * Ollama Configuration for AI SDK
 * Defines model configurations and parameters for driving institute projects
 */

import {
  checkRoadRulesTool,
  analyzeDrivingScenarioTool,
  generatePracticeQuestionTool,
  getSafetyTipsTool,
} from "./tools/index.js";

interface ModelParameters {
  // Controls randomness in model output (0.0 = deterministic, 1.0 = maximum randomness)
  temperature: number;

  // Nucleus sampling parameter (filters out low probability tokens)
  topP: number;

  // Number of top candidates to consider
  topK: number;
}

interface ToolDefinition {
  // Name of the tool function
  name: string;

  // Description of what the tool does
  description: string;

  // Input parameters the tool accepts
  parameters: Record<string, unknown>;
}

interface ModelConfig {
  // Display name and identifier for the model
  name: string;

  // Internal model identifier used by Ollama
  modelId: string;

  // Maximum token length the model can process
  maxTokens: number;

  // Whether this model supports tool use
  supportsTools: boolean;

  // Model-specific parameters
  parameters: ModelParameters;

  // Available tools for this model
  tools?: ToolDefinition[];
}

interface RequestConfig {
  // Request timeout in milliseconds
  timeout: number;

  // Number of automatic retries on failure
  retries: number;

  // Delay between retries in milliseconds
  retryDelay: number;
}

interface OllamaConfig {
  // Base URL for Ollama server
  baseUrl: string;

  // Model configurations indexed by key
  models: Record<string, ModelConfig>;
}

/**
 * Main Ollama Configuration
 * Configured for driving institute project scenarios
 */
export const ollamaConfig: OllamaConfig = {
  // Ollama server connection
  baseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",

  // Available models and their configurations
  models: {
    /**
     * Driving Institute v2 Model Configuration
     * Optimized for driving education scenarios including:
     * - Road rules and regulations explanation
     * - Safe driving practice recommendations
     * - Driver training assessments
     * - Traffic situation analysis
     */
    "driving-institute:v2": {
      name: "Driving Institute v2",
      modelId: "driving-institute:v2",
      maxTokens: 2048,
      supportsTools: true,

      // Model parameters for driving institute scenarios
      parameters: {
        // Lower temperature for more consistent safety recommendations
        temperature: 0.3,

        // Moderate top-p for balanced response variety
        topP: 0.9,

        // Reasonable top-k for context-aware responses
        topK: 40,
      },

      // Tools available for driving institute queries
      tools: [
        checkRoadRulesTool,
        analyzeDrivingScenarioTool,
        generatePracticeQuestionTool,
        getSafetyTipsTool,
      ],
    },
  },
};

/**
 * Request configuration for API calls
 */
export const requestConfig: RequestConfig = {
  // 30 second timeout for model requests
  timeout: 30000,

  // Retry up to 3 times on failure
  retries: 3,

  // 2 second delay between retry attempts
  retryDelay: 2000,
};

/**
 * Helper function to get a model configuration
 * @param modelKey - Key of the model to retrieve
 * @returns Model configuration or undefined if not found
 */
export function getModelConfig(modelKey: string): ModelConfig | undefined {
  return ollamaConfig.models[modelKey];
}

/**
 * Helper function to get the driving institute v2 model
 * @returns Driving institute v2 model configuration
 */
export function getDrivingInstituteConfig(): ModelConfig {
  const config = getModelConfig("driving-institute:v2");
  if (!config) {
    throw new Error("Driving institute v2 model configuration not found");
  }
  return config;
}

/**
 * Export all tools for use in applications
 */
export {
  checkRoadRulesTool,
  analyzeDrivingScenarioTool,
  generatePracticeQuestionTool,
  getSafetyTipsTool,
  type CheckRoadRulesParams,
  type AnalyzeDrivingScenarioParams,
  type GeneratePracticeQuestionParams,
  type GetSafetyTipsParams,
} from "./tools/index.js";
