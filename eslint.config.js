export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      semi: "off",
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
    },
  },
];
