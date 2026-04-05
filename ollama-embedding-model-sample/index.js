import { openai } from "./config.js";

const content = ["Hassan Jamil"];

async function main() {
  const embedding = await openai.embeddings.create({
    model: "nomic-embed-text:latest",
    input: content,
  });
  console.log(embedding.data);
}

main();
