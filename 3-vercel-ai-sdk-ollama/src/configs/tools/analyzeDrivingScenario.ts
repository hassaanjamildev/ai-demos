/**
 * Analyze Driving Scenario Tool
 * Used to analyze driving scenarios for safety and best practices
 */

export type AnalyzeDrivingScenarioParams = {
  // Description of the driving scenario (required)
  scenario: string;

  // Additional context or conditions (optional)
  context?: string;
};

export const analyzeDrivingScenarioTool = {
  name: "analyze_driving_scenario",
  description: "Analyze a driving scenario for safety and best practices",
  parameters: {
    type: "object",
    properties: {
      scenario: {
        type: "string",
        description: "Description of the driving scenario",
      },
      context: {
        type: "string",
        description: "Additional context or conditions",
      },
    },
    required: ["scenario"],
  },
};
