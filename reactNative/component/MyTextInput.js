import React from 'react';
import { TextInput } from 'react-native';

export default ({ placeholder }) => {
  return (
    <TextInput
      style={{
        width: '90%',
        height: 30,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      }}
      placeholder={placeholder}
    />
  );
};
