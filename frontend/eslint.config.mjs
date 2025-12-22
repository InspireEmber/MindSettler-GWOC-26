import nextPlugin from "next/eslint-plugin-next";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
    ],
  },
  {
    files: ["src/**/*.{js,jsx}", "src/app/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
];

export default config;
