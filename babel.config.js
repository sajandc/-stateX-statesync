module.exports = {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react", // For JSX syntax
      "@babel/preset-typescript" // If TypeScript is used
    ],
    plugins: [
      "react-native-reanimated/plugin" // For React Native animations if needed
    ],
  };
  