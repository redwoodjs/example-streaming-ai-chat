import { defineApp } from "rwsdk/worker";
import { render, route } from "rwsdk/router";
import { Document } from "src/Document";
import { Chat } from "src/pages/Chat/Chat";
import { setCommonHeaders } from "src/headers";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  render(Document, [route("/", Chat)]),
]);
