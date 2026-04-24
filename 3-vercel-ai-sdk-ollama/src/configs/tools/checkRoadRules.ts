/**
 * Check Road Rules Tool
 * Used to query specific traffic rules and regulations
 */

export type CheckRoadRulesParams = {
  // Specific road rule topic (required)
  topic: string;

  // Geographic region/country for rules (optional)
  region?: string;
};

export const checkRoadRulesTool = {
  name: "check_road_rules",
  description: "Check specific road rules and traffic regulations",
  parameters: {
    type: "object",
    properties: {
      topic: {
        type: "string",
        description: "Specific road rule topic",
      },
      region: {
        type: "string",
        description: "Geographic region/country for rules",
      },
    },
    required: ["topic"],
  },
};
