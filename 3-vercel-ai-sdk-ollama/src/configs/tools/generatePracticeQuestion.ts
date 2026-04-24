/**
 * Generate Practice Question Tool
 * Used to generate driving test practice questions
 */

export interface GeneratePracticeQuestionParams {
  // Topic for the practice question (required)
  topic: string;

  // Difficulty level - easy, medium, or hard (optional)
  difficulty?: "easy" | "medium" | "hard";
}

export const generatePracticeQuestionTool = {
  name: "generate_practice_question",
  description: "Generate a driving test practice question",
  parameters: {
    type: "object",
    properties: {
      topic: {
        type: "string",
        description: "Topic for the practice question",
      },
      difficulty: {
        type: "string",
        enum: ["easy", "medium", "hard"],
        description: "Difficulty level",
      },
    },
    required: ["topic"],
  },
};
