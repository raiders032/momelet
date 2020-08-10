import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080",
    // apiUrl: "http://localhost:8080",
  },
  staging: {
    apiUrl: "http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080",
  },
  prod: {
    apiUrl: "http://ec2-3-34-162-241.ap-northeast-2.compute.amazonaws.com:8080",
    // Add other keys you want here
  },
};
const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "staging") {
    return ENV.staging;
  } else if (env === "prod") {
    return ENV.prod;
  }
};

export default getEnvVars;
