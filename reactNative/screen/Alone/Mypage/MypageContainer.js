import React, { useState } from "react";
import MypagePresenter from "./MypagePresenter";
import { apis } from "../../../api";

import { AsyncStorage } from "react-native";
import { StackActions } from "@react-navigation/native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default ({ navigation, route }) => {
  const [user, setUser] = useState(route.params.user);
  const onClickFooter = async () => {
    const token = await AsyncStorage.getItem("@userToken");
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
    navigation.navigate("Main", {
      isChanged: true,
    });
  };
  const imageEditButtonEvent = async () => {
    const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (permission.status !== "granted") {
      alert("카메라 앨범 권한이 없어 실행할 수 없습니다.");
    } else {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          console.log(result);
          setUser({ ...user, imageUrl: result.uri });
        }
      } catch (E) {
        console.log(E);
      }
    }
  };
  return (
    <MypagePresenter
      user={user}
      setUser={setUser}
      onClickFooter={onClickFooter}
      imageEditButtonEvent={imageEditButtonEvent}
    />
  );
};
