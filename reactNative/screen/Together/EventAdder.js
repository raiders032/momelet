import React, { useEffect } from 'react';
import { View } from 'react-native';

export default ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      e.preventDefault();

      navigation.navigate('Invite');
      // Do something manually
      // ...
    });

    navigation.navigate('Main');
  }, []);

  return <View />;
};
