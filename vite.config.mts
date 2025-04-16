import { defineConfig } from "vite";
import { redwood } from "@redwoodjs/sdk/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // context(justinvdm, 2025-04-16): Vite plugin assumes SSR environment, we have worker one
  environments: { ssr: {} },
  plugins: [redwood(), tailwindcss()],
});
