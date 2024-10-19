import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      eqeqeq: "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "prefer-const": ["error", { "destructuring": "all" }],
      "no-var": "error",
      "prefer-arrow-callback": "error",
      "no-duplicate-imports": "error",
      "no-unused-vars": "warn",
      "curly": "error",
      "no-implicit-globals": "error",
      "no-redeclare": "error",
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "arrow-parens": ["error", "always"],
      "no-unused-expressions": "error",
      "no-console": "warn",
      "no-undef": "error",
      "callback-return": "error",
      "no-path-concat": "error",


    },
  },
  {
    ignores: [".node_modules/*", ".dist/*"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];