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
  const [isImageEdit, setIsImageEdit] = useState(false);

  console.log('유저 정보:', user);

  const onClickFooter = async () => {
    const token = await AsyncStorage.getItem('@userToken');
    const preprocessCategories = [];

    for (const category in user.categories) {
      if (user.categories[category]) preprocessCategories.push(category);
    }

    console.log(preprocessCategories);

    if (!preprocessCategories.length) {
      alert('카테고리는 비어 있을 수 없습니다.');
    } else if (!user.name.replace(' ', '')) {
      alert('유저 이름은 비어있을 수 없습니다.');
    } else {
      let imageUrl;

      if (isImageEdit) {
        imageUrl = user.imageUrl;
      } else {
        imageUrl = null;
      }

      const result = await apis.editUser(user.id, preprocessCategories, imageUrl, user.name, token);

      // console.log('mypageContainer 내부, api result 확인 ', result.data);

      if (!result.data.success) {
        if (result.data.errorCode === '102') {
          alert('카테고리 또는 이름이 비어있으면 안됩니다.');
        } else {
          alert('서버와 연결할 수 없습니다.');
        }
      } else {
        navigation.navigate('Main', {
          isChanged: true,
        });
      }
    }

    // navigation.dispatch(StackActions.pop(1));
    // navigation.dispatch(
    //   StackActions.replace("Main", {
    //     userToken: token,
    //   })
    // );
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

        // console.log('마이 페이지 컨테이너 내부 , 함수 이미지 피커 ', result);

        if (!result.cancelled) {
          console.log(Buffer.byteLength(result.base64));

          if (Buffer.byteLength(result.base64) >= 18000000) {
            setCoverMessageZIndex(1);
          } else {
            setUser({ ...user, imageUrl: result.uri });
            setIsImageEdit(true);
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
