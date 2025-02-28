import globals from "globals";
import pluginJs from "@eslint/js";
import { readFile } from "fs/promises";
import pluginTsEslint from "typescript-eslint";
import pluginVitest from "eslint-plugin-vitest";
import pluginVue from "eslint-plugin-vue";

/* Setup Vue 3 globals */
const globalsVue = JSON.parse(
  await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url))
)

/* Setup the .gitignore as a usable ignore pattern file */
import { includeIgnoreFile } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  /* Put ignores first */
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      'public/',
      'dist/',
      'src/shims-vue.d.ts',
      'scripts/templates/',
      'storybook-static/',
      'index.html'
    ]
  },
  pluginJs.configs.recommended,
  ...pluginTsEslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  pluginVitest.configs.recommended,
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2024,
        ...globals.node,
        ...globalsVue.globals
      },
      parserOptions: {
        parser: pluginTsEslint.parser,
        extraFileExtensions: ['.vue'],
      }
    },
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      'typescript-eslint': pluginTsEslint.plugin
    },
    rules: {
      'vue/no-v-html': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'vue/comment-directive': 'off',
      // TODO: Remove the following rules and fix the resulting issues:
      'no-undef': 0,
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-this-alias': 0,
      '@typescript-eslint/no-unused-vars': 0,
    }
  }
]
