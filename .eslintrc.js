module.exports = {
  root: true,
  env: {
    'react-native/react-native': true,
  },
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react-native', 'typescript', 'jsx', 'flow'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    babelOptions: {
      parserOpts: {
        plugins: ['jsx'],
      },
    },
    requireConfigFile: false, // Disables require of Babel config file
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      // jsx: true, // Allows for the parsing of JSX
      typescript: true, // Allows for the parsing of TypeScript
    },
  },
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'react-native/no-inline-styles': 'off',
  },
  ignorePatterns: ['node_modules/', 'android/', 'ios/'], // Add any other folders to ignore
}
