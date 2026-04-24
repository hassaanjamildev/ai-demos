import { ollama, generateText } from "ai-sdk-ollama";
import { z } from "zod";
import {
  getDrivingInstituteConfig,
  requestConfig,
  ollamaConfig,
  checkRoadRulesTool,
  analyzeDrivingScenarioTool,
  generatePracticeQuestionTool,
  getSafetyTipsTool,
  type CheckRoadRulesParams,
  type AnalyzeDrivingScenarioParams,
  type GeneratePracticeQuestionParams,
  type GetSafetyTipsParams,
} from "./configs/ollama.js";

/**
 * Demo: Display Driving Institute v2 Configuration
 */
function displayConfigurationDemo() {
  console.log("\n" + "=".repeat(70));
  console.log("🚗 DRIVING INSTITUTE v2 - OLLAMA CONFIGURATION DEMO");
  console.log("=".repeat(70) + "\n");

  // Get the configuration
  const drivingConfig = getDrivingInstituteConfig();

  // Display Model Information
  console.log("📋 MODEL INFORMATION:");
  console.log(`  • Name: ${drivingConfig.name}`);
  console.log(`  • Model ID: ${drivingConfig.modelId}`);
  console.log(`  • Max Tokens: ${drivingConfig.maxTokens}`);
  console.log(
    `  • Supports Tools: ${drivingConfig.supportsTools ? "✓ Yes" : "✗ No"}`,
  );

  // Display Model Parameters
  console.log("\n⚙️  MODEL PARAMETERS:");
  console.log(
    `  • Temperature: ${drivingConfig.parameters.temperature} (lower = more consistent)`,
  );
  console.log(`  • Top-P: ${drivingConfig.parameters.topP} (nucleus sampling)`);
  console.log(`  • Top-K: ${drivingConfig.parameters.topK} (top candidates)`);

  // Display Available Tools
  console.log("\n🔧 AVAILABLE TOOLS:");
  if (drivingConfig.tools && drivingConfig.tools.length > 0) {
    drivingConfig.tools.forEach((tool, index) => {
      console.log(`\n  ${index + 1}. ${tool.name}`);
      console.log(`     Description: ${tool.description}`);
      console.log(
        `     Parameters: ${JSON.stringify(tool.parameters, null, 2).split("\n").join("\n     ")}`,
      );
    });
  }

  // Display Request Configuration
  console.log("\n⏱️  REQUEST CONFIGURATION:");
  console.log(
    `  • Timeout: ${requestConfig.timeout}ms (${requestConfig.timeout / 1000}s)`,
  );
  console.log(`  • Retries: ${requestConfig.retries}`);
  console.log(`  • Retry Delay: ${requestConfig.retryDelay}ms`);

  // Display Base Configuration
  console.log("\n🌐 BASE CONFIGURATION:");
  console.log(`  • Ollama Base URL: ${ollamaConfig.baseUrl}`);
  console.log(
    `  • Available Models: ${Object.keys(ollamaConfig.models).length}`,
  );
  console.log(`  • Models: ${Object.keys(ollamaConfig.models).join(", ")}`);

  console.log("\n" + "=".repeat(70) + "\n");
}

/**
 * Demo: Test the model with a driving institute query
 */
async function testDrivingInstituteModel() {
  console.log("🚀 TESTING DRIVING INSTITUTE v2 MODEL");
  console.log("-".repeat(70) + "\n");

  try {
    const { text } = await generateText({
      model: ollama("driving-institute:v2"),
      prompt:
        "What are the key differences between defensive driving and normal driving? Explain briefly.",
    });

    console.log("💬 Model Response:");
    console.log(text);
    console.log("\n" + "-".repeat(70));
  } catch (error) {
    console.error("❌ Error testing model:", error);
  }
}

/**
 * Example 1: Check Road Rules Tool Usage
 * Query information about specific traffic rules and regulations
 */
async function exampleCheckRoadRules() {
  console.log("\n📚 EXAMPLE 1: CHECK ROAD RULES");
  console.log("-".repeat(70));
  console.log(
    "Prompt: Use the check_road_rules tool to explain the right-of-way rules at a 4-way stop intersection.\n",
  );

  try {
    const { text } = await generateText({
      model: ollama("driving-institute:v2"),
      tools: {
        check_road_rules: {
          description: checkRoadRulesTool.description,
          inputSchema: z.object({
            topic: z.string().describe("Specific road rule topic"),
            region: z
              .string()
              .optional()
              .describe("Geographic region/country for rules"),
          }),
          execute: async (params: CheckRoadRulesParams) => {
            console.log(`  🔧 Tool called: check_road_rules`);
            console.log(`     Topic: ${params.topic}`);
            console.log(`     Region: ${params.region || "General"}`);
            return `Right-of-way rules at 4-way stop: If two vehicles arrive at the same time, the vehicle on the right has the right of way. If all four arrive simultaneously, vehicles should proceed in a counter-clockwise manner.`;
          },
        },
      },
      prompt:
        "Use the check_road_rules tool to explain what are the right-of-way rules at a 4-way stop intersection.",
    });

    console.log("\n  💬 Response:");
    console.log(`     ${text}\n`);
  } catch (error) {
    console.log(`  ℹ️  Note: Tool execution may require Ollama to be running.`);
  }
}

/**
 * Example 2: Analyze Driving Scenario Tool Usage
 * Analyze specific driving situations for safety recommendations
 */
async function exampleAnalyzeDrivingScenario() {
  console.log("\n🚗 EXAMPLE 2: ANALYZE DRIVING SCENARIO");
  console.log("-".repeat(70));
  console.log(
    "Prompt: Use the analyze_driving_scenario tool to analyze a rainy highway merge scenario.\n",
  );

  try {
    const { text } = await generateText({
      model: ollama("driving-institute:v2"),
      system: "Respond in the same language as the user's input. Maintain consistency with the language used in the prompt.",
      tools: {
        analyze_driving_scenario: {
          description: analyzeDrivingScenarioTool.description,
          inputSchema: z.object({
            scenario: z
              .string()
              .describe("Description of the driving scenario"),
            context: z
              .string()
              .optional()
              .describe("Additional context or conditions"),
          }),
          execute: async (params: AnalyzeDrivingScenarioParams) => {
            console.log(`  🔧 Tool called: analyze_driving_scenario`);
            console.log(`     Scenario: ${params.scenario}`);
            console.log(`     Context: ${params.context || "None specified"}`);
            return `Safety recommendations: (1) Reduce speed by 25-50% below the limit, (2) Increase following distance to 8-10 seconds, (3) Avoid sudden maneuvers, (4) Use headlights and ensure visibility, (5) Check mirrors frequently before merging.`;
          },
        },
      },
      prompt:
        "Use the analyze_driving_scenario tool to analyze this scenario: I need to merge onto a busy highway during heavy rain with reduced visibility. What safety precautions should I take?",
    });

    console.log("\n  💬 Response:");
    console.log(`     ${text}\n`);
  } catch (error) {
    console.log(`  ℹ️  Note: Tool execution may require Ollama to be running.`);
  }
}

/**
 * Example 3: Generate Practice Question Tool Usage
 * Create study questions for driving test preparation
 */
async function exampleGeneratePracticeQuestion() {
  console.log("\n✍️  EXAMPLE 3: GENERATE PRACTICE QUESTION");
  console.log("-".repeat(70));
  console.log(
    "Prompt: Use the generate_practice_question tool to create a driving test question.\n",
  );

  try {
    const { text } = await generateText({
      model: ollama("driving-institute:v2"),
      tools: {
        generate_practice_question: {
          description: generatePracticeQuestionTool.description,
          inputSchema: z.object({
            topic: z.string().describe("Topic for the practice question"),
            difficulty: z
              .enum(["easy", "medium", "hard"])
              .optional()
              .describe("Difficulty level"),
          }),
          execute: async (params: GeneratePracticeQuestionParams) => {
            console.log(`  🔧 Tool called: generate_practice_question`);
            console.log(`     Topic: ${params.topic}`);
            console.log(`     Difficulty: ${params.difficulty || "medium"}`);
            return `Q: What is the maximum safe following distance on a highway at 60 mph? A) 2 seconds B) 3 seconds C) 5 seconds D) 1 second. Answer: B) 3 seconds (representing approximately 180 feet).`;
          },
        },
      },
      prompt:
        "Use the generate_practice_question tool to create a medium difficulty driving test question about following distance and safe driving speeds.",
    });

    console.log("\n  💬 Response:");
    console.log(`     ${text}\n`);
  } catch (error) {
    console.log(`  ℹ️  Note: Tool execution may require Ollama to be running.`);
  }
}

/**
 * Example 4: Get Safety Tips Tool Usage
 * Retrieve safety recommendations for specific driving conditions
 */
async function exampleGetSafetyTips() {
  console.log("\n💡 EXAMPLE 4: GET SAFETY TIPS");
  console.log("-".repeat(70));
  console.log(
    "Prompt: Use the get_safety_tips tool to get tips for night driving.\n",
  );

  try {
    const { text } = await generateText({
      model: ollama("driving-institute:v2"),
      tools: {
        get_safety_tips: {
          description: getSafetyTipsTool.description,
          inputSchema: z.object({
            condition: z
              .string()
              .describe("Weather, time, or traffic condition"),
            vehicleType: z
              .enum(["car", "motorcycle", "truck"])
              .optional()
              .describe("Type of vehicle"),
          }),
          execute: async (params: GetSafetyTipsParams) => {
            console.log(`  🔧 Tool called: get_safety_tips`);
            console.log(`     Condition: ${params.condition}`);
            console.log(
              `     Vehicle Type: ${params.vehicleType || "Not specified"}`,
            );
            return `Night driving safety tips: (1) Use high-beam headlights on empty roads, (2) Clean windshield and headlights, (3) Reduce speed by 10-15%, (4) Increase following distance, (5) Avoid driving if fatigued, (6) Use reflectors and wear bright clothing if outside vehicle.`;
          },
        },
      },
      prompt:
        "Use the get_safety_tips tool to provide comprehensive safety tips for driving at night.",
    });

    console.log("\n  💬 Response:");
    console.log(`     ${text}\n`);
  } catch (error) {
    console.log(`  ℹ️  Note: Tool execution may require Ollama to be running.`);
  }
}

/**
 * Main function to run all demos
 */
async function main() {
  try {
    // Display configuration details
    displayConfigurationDemo();

    // Test the model (if Ollama is running)
    await testDrivingInstituteModel();

    // Run tool examples
    console.log("\n" + "=".repeat(70));
    console.log("🛠️  TOOL USAGE EXAMPLES");
    console.log("=".repeat(70));

    await exampleCheckRoadRules();
    await exampleAnalyzeDrivingScenario();
    await exampleGeneratePracticeQuestion();
    await exampleGetSafetyTips();

    console.log("=".repeat(70));
    console.log("✅ All demos completed successfully!\n");
  } catch (error) {
    console.error("Error in main execution:", error);
  }
}

main();
