// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  { ignores: ['**/*.d.ts', '**/coverage', '**/dist', '**/scripts/templates', '**/storybook-static'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/recommended'],
    ],
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {
      'vue/no-v-html': 'off',
      // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      // 'vue/comment-directive': 'off',
    },
  },
  eslintConfigPrettier,
  storybook.configs["flat/recommended"]
);