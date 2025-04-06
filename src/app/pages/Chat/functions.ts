"use server";

import { env } from "cloudflare:workers";

export async function sendMessage(message: string) {
  // @ts-ignore: Model is not yet typed.
  const response = await env.AI.run("@cf/meta/llama-4-scout-17b-16e-instruct", {
    prompt: message,
    stream: true,
  });
  return response as unknown as ReadableStream;
}
