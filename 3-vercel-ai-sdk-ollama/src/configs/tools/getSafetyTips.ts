/**
 * Get Safety Tips Tool
 * Used to retrieve safety recommendations for specific driving conditions
 */

export interface GetSafetyTipsParams {
  // Weather, time, or traffic condition (required)
  condition: string;

  // Type of vehicle - car, motorcycle, or truck (optional)
  vehicleType?: "car" | "motorcycle" | "truck";
}

export const getSafetyTipsTool = {
  name: "get_safety_tips",
  description: "Get safety tips for specific driving conditions",
  parameters: {
    type: "object",
    properties: {
      condition: {
        type: "string",
        description: "Weather, time, or traffic condition",
      },
      vehicleType: {
        type: "string",
        enum: ["car", "motorcycle", "truck"],
        description: "Type of vehicle",
      },
    },
    required: ["condition"],
  },
};
