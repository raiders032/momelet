import React from 'react';
import { View, Text, Dimensions, Linking, Platform, Clipboard, ToastAndroid } from 'react-native';

import truncate from '../utils/truncate';
import ExtraIcon from './ExtraIcon';
import Menu from './Menu';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default ({ menus, name, phoneNumber, address }) => {
  return (
    <View>
      <View
        style={{
          height: '70%',
          alignItems: 'center',
          padding: 15,
          // backgroundColor: "blue",
        }}>
        <Text style={{ fontSize: HEIGHT / 30, marginBottom: 25 }}>{name}</Text>

        {menus[0] && <Menu menu={truncate(menus[0].name)} price={menus[0].price} />}
        {menus[1] && <Menu menu={truncate(menus[1].name)} price={menus[1].price} />}
        {menus[2] && <Menu menu={truncate(menus[2].name)} price={menus[2].price} />}
        {menus[3] && <Menu menu={truncate(menus[3].name)} price={menus[3].price} />}
        {menus[4] && (
          <Menu menu={truncate(menus[4].name)} price={menus[4].price} style={{ marginBottom: 0 }} />
        )}
      </View>
      <View
        style={{
          height: '30%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          // backgroundColor: "yellow",
        }}>
        <ExtraIcon
          icon={require('../assets/call.png')}
          text="전화하기"
          onPress={async () => {
            let number;

            if (Platform.OS !== 'android') {
              number = `telprompt:${phoneNumber}`;
            } else {
              number = `tel:${phoneNumber}`;
            }
            const canOpen = await Linking.canOpenURL(number);

            console.log(number);
            if (canOpen) {
              Linking.openURL(number);
            } else {
              console.log('해당 url을 열수 없습니다!');
            }
          }}
        />

        <ExtraIcon icon={require('../assets/geo.png')} text="길찾기" />

        <ExtraIcon
          icon={require('../assets/copy.png')}
          text="주소복사"
          onPress={() => {
            console.log(address);
            Clipboard.setString(address);
            if (Platform.OS == 'android') {
              ToastAndroid.show('주소가 클립보드에 복사 되었습니다.', ToastAndroid.SHORT);
            }
          }}
        />
      </View>
    </View>
  );
};
