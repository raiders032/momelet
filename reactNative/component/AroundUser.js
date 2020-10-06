import React from 'react';
import { CheckBox, View, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

import Checkbox from './Checkbox';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default ({ index, setUsers, user }) => {
  return (
    <View
      style={{
        width: '100%',
        height: HEIGHT / 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{
            uri: user.imageUrl,
            width: HEIGHT / 18,
            height: HEIGHT / 18,
          }}
          style={{
            borderRadius: 12,
          }}
        />
        <Text
          style={{
            // fontFamily: 'NotoSansCJKkr',
            fontSize: HEIGHT / 40,
            marginLeft: WIDTH / 22,
          }}>
          {user.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setUsers((before) => {
            const tmp = [...before];

            tmp[index] = { ...user, selected: !user.selected };

            return tmp;
          });
        }}>
        <Checkbox value={user.selected} />
      </TouchableOpacity>
    </View>
  );
};
