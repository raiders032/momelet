import { StackActions } from '@react-navigation/native';
import { Buffer } from 'buffer';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';

import { apis } from '../../../api';
import MypagePresenter from './MypagePresenter';

export default ({ navigation, route }) => {
  const [user, setUser] = useState(route.params.user);
  const [coverMessageZIndex, setCoverMessageZIndex] = useState(-1);

  console.log('유저 정보:', user);
  const onClickFooter = async () => {
    const token = await AsyncStorage.getItem('@userToken');
    const preprocessCategories = [];

    for (const category in user.categories) {
      if (user.categories[category]) preprocessCategories.push(category);
    }

    const result = await apis.editUser(
      user.id,
      preprocessCategories,
      user.imageUrl,
      user.name,
      token
    );

    console.log(result.data);
    // navigation.dispatch(StackActions.pop(1));
    // navigation.dispatch(
    //   StackActions.replace("Main", {
    //     userToken: token,
    //   })
    // );
    navigation.navigate('Main', {
      isChanged: true,
    });
  };
  const imageEditButtonEvent = async () => {
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    console.log(permission);
    if (permission.status !== 'granted') {
      alert(
        '카메라 앨범 권한이 없어 실행할 수 없습니다. 설정에서 카메라 앨범 권한을 허용해주세요.'
      );
    } else {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
          base64: true,
          exif: true,
        });

        if (!result.cancelled) {
          console.log(Buffer.byteLength(result.base64));
          if (Buffer.byteLength(result.base64) >= 18000000) {
            setCoverMessageZIndex(1);
          } else {
            setUser({ ...user, imageUrl: result.uri });
          }
        }
      } catch (E) {
        console.log(E);
      }
    }
  };
  const coverMessageEnterButtonEvent = () => {
    setCoverMessageZIndex(-1);
  };

  return (
    <MypagePresenter
      user={user}
      setUser={setUser}
      onClickFooter={onClickFooter}
      imageEditButtonEvent={imageEditButtonEvent}
      coverMessageZIndex={coverMessageZIndex}
      coverMessageEnterButtonEvent={coverMessageEnterButtonEvent}
    />
  );
};
