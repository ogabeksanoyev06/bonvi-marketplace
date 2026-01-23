// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // Clean code
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': 'warn',

      // Import tartibi
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Vue best practices
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',

      // Prettier
      'prettier/prettier': 'error',
    },
  },
)
