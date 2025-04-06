import { defineApp } from "@redwoodjs/sdk/worker";
import { render, route } from "@redwoodjs/sdk/router";
import { Document } from "src/Document";
import { Chat } from "src/pages/Chat/Chat";
import { setCommonHeaders } from "src/headers";

export default defineApp([
  setCommonHeaders(),
  render(Document, [route("/", Chat)]),
]);
