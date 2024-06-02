// @ts-check
import tseslint from "typescript-eslint";

import baseConfig from "./tooling/eslint/base.mjs";
import nextConfig from "./tooling/eslint/next.mjs";

const config = tseslint.config(...baseConfig, ...nextConfig, {
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  languageOptions: {
    parserOptions: {
      project: [
        "./apps/web/tsconfig.json",
        "./apps/mobile/tsconfig.json",
        "./tsconfig.json",
        "./packages/*/tsconfig.json",
      ],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});

export default config;
