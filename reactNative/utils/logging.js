import * as Analytics from 'expo-firebase-analytics';

const logging = async ({ eventName, config }) => {
  await Analytics.logEvent(eventName, config);
};

export default logging;
