"use client";

import { sendMessage } from "./functions";
import { useState } from "react";
import { consumeEventStream } from "@redwoodjs/sdk/client";

export function Chat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    setReply(""); // Reset reply before new message
    (await sendMessage(message)).pipeTo(
      consumeEventStream({
        onChunk: (event) => {
          setReply((prev) => {
            if (event.data === "[DONE]") {
              // stop loading...
              setIsLoading(false);
              return prev;
            }
            return (prev += JSON.parse(event.data).response);
          });
        },
      }),
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 mx-auto min-w-6/12 max-w-6/12">
        {reply}
      </div>

      <form onSubmit={onSubmit} className="bg-white flex rounded-lg p-4">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-300 p-2 mr-2"
        />
        <button
          type="submit"
          disabled={message.length === 0 || isLoading}
          className="rounded bg-amber-800 text-white px-4 py-2"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
