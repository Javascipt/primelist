import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    rules: {
      indent: ["error", 2],
      "no-trailing-spaces": "error",
    },
  },
];
