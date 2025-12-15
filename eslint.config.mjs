import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    plugins: {
      extends: ["airbnb-base/legacy"]
    },
    ignores: ["dist"]
  }
];