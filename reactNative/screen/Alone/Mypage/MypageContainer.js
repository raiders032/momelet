import React, { useState } from "react";
import MypagePresenter from "./MypagePresenter";
import { apis } from "../../../api";

import { AsyncStorage } from "react-native";
import { StackActions } from "@react-navigation/native";

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
  return (
    <MypagePresenter
      user={user}
      setUser={setUser}
      onClickFooter={onClickFooter}
    />
  );
};
