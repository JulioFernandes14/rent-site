module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    '@testing-library/jest-native/extend-expect',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-vector-icons|react-native-web|@react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|expo-modules-core|expo-router)/)'
  ],
};