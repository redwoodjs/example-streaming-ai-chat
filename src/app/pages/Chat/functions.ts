"use server";

import { env } from "cloudflare:workers";

export async function sendMessage(prompt: string) {
  console.log("Running AI with Prompt:", prompt);
  // @ts-ignore: Model is not yet typed.
  const response = await env.AI.run("@cf/meta/llama-4-scout-17b-16e-instruct", {
    prompt,
    stream: true,
  });
  return response as unknown as ReadableStream;
}
