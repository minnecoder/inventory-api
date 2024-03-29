module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "prettier/prettier": 0,
    "no-console": 0
  },
};
