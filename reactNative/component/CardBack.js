import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Linking,
  Platform,
  Clipboard,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';

// import logging from '../utils/logging';
import truncate from '../utils/truncate';
import ExtraIcon from './ExtraIcon';
import Menu from './Menu';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default ({ menus, name, phoneNumber, address, lat, lng, userLocation }) => {
  const navigation = useNavigation();
  let isProcessing = false;

  return (
    <View>
      <View
        style={{
          height: '70%',
          alignItems: 'center',
          padding: 15,
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
            if (isProcessing) return;

            isProcessing = true;

            // await logging({
            //   eventName: 'BTN_CALL',
            //   config: {
            //     name: 'callButton',
            //     screen: 'Home|Together',
            //     purpose: 'how many people click call button',
            //   },
            // });

            let number;

            if (Platform.OS !== 'android') {
              number = `telprompt:${phoneNumber}`;
            } else {
              number = `tel:${phoneNumber}`;
            }

            const canOpen = await Linking.canOpenURL(number);

            if (canOpen) {
              Linking.openURL(number);
            } else {
              console.log('해당 url을 열수 없습니다!');
            }

            isProcessing = false;
          }}
        />

        <ExtraIcon
          icon={require('../assets/geo.png')}
          text="길찾기"
          onPress={async () => {
            if (isProcessing) return;

            isProcessing = true;

            // await logging({
            //   eventName: 'BTN_MAP',
            //   config: {
            //     name: 'seeMapButton',
            //     screen: 'Home|Together',
            //     purpose: 'how many people click map button',
            //   },
            // });

            const canOpen = await Linking.canOpenURL(
              'kakaomap://route?sp=37.537229,127.005515&ep=37.4979502,127.0276368&by=FOOT'
            );

            if (canOpen) {
              Linking.openURL(
                `kakaomap://route?sp=${userLocation.latitude},${userLocation.longitude}&ep=${lat},${lng}&by=FOOT`
              );
            } else {
              if (Platform.OS === 'android') {
                Linking.openURL('market://details?id=net.daum.android.map');
              } else if (Platform.OS === 'ios') {
                Linking.openURL('https://apps.apple.com/us/app/id304608425');
              }
            }

            isProcessing = false;
          }}
        />

        <ExtraIcon
          icon={require('../assets/copy.png')}
          text="주소복사"
          onPress={async () => {
            if (isProcessing) return;

            isProcessing = true;
            // await logging({
            //   eventName: 'BTN_COPY_ADDRESS',
            //   config: {
            //     name: 'copyAddressButton',
            //     screen: 'Home|Together',
            //     purpose: 'how many people click copy button',
            //   },
            // });

            Clipboard.setString(address);

            if (Platform.OS == 'android') {
              ToastAndroid.show('주소가 클립보드에 복사 되었습니다.', ToastAndroid.SHORT);
            } else {
              alert('주소가 클립보드에 복사 되었습니다.');
            }

            isProcessing = false;
          }}
        />
      </View>
    </View>
  );
};
