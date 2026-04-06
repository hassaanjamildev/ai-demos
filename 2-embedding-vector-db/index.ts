import { openai } from "./src/ollama/config.ts";

const content: string[] = ["Hassan Jamil"];

async function main(): Promise<void> {
  const embedding = await openai.embeddings.create({
    model: "nomic-embed-text:latest",
    input: content,
  });
  console.log(embedding.data);
}

main();
