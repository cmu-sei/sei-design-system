import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTsEslint from "typescript-eslint";
import pluginVitest from "eslint-plugin-vitest";
import pluginVue from "eslint-plugin-vue";

/* Setup Vue 3 globals */
import globalsVue from './.eslintrc-auto-import.json' with { type: "json" };

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
        sourceType: 'module'
      }
    },
    files: ['**/*.{js,vue}'],
    plugins: {
      'typescript-eslint': pluginTsEslint.plugin
    },
    rules: {
      'vue/no-v-html': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'vue/comment-directive': 'off'
    }
  }
]
