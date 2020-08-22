import React, { useState, useEffect } from "react";
import MainPresenter from "./MainPresenter";
import { apis } from "../../api";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { View } from "react-native";
import socket from "../../socket";
// 홈 식당 카드의 api 호출 데이터 전달

export default ({ navigation, route }) => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState({
    loading: true,
    restaurants: [],
  });
  const dummy = [
    {
      imageUrl:
        "https://img.wemep.co.kr/deal/7/083/4170837/5a04faa056e035874116fa70c75be8ef9b744408.jpg",
      title: "조개창고",
      distance: "500",
      point: 4.5,
      menu: [
        { name: "조개찜", price: "25000" },
        { name: "삼겹살 200g", price: "25000" },
        { name: "로스까스 정식", price: "11000" },
      ],
    },
    {
      imageUrl:
        "https://img.wemep.co.kr/deal/7/083/4170837/5a04faa056e035874116fa70c75be8ef9b744408.jpg",
      title: "조개 컨테이너",
      distance: "500",
      point: 4.5,
      menu: [
        { name: "조개찜", price: "25000" },
        { name: "삼겹살 200g", price: "25000" },
        { name: "로스까스 정식", price: "11000" },
      ],
    },
    {
      imageUrl:
        "https://img.wemep.co.kr/deal/7/083/4170837/5a04faa056e035874116fa70c75be8ef9b744408.jpg",
      title: "조개 박스",
      distance: "500",
      point: 4.5,
      menu: [
        { name: "조개찜", price: "25000" },
        { name: "삼겹살 200g", price: "25000" },
        { name: "로스까스 정식", price: "11000" },
      ],
    },
    {
      imageUrl:
        "https://img.wemep.co.kr/deal/7/083/4170837/5a04faa056e035874116fa70c75be8ef9b744408.jpg",
      title: "조개 피플",
      distance: "500",
      point: 4.5,
      menu: [
        { name: "조개찜", price: "25000" },
        { name: "삼겹살 200g", price: "25000" },
        { name: "로스까스 정식", price: "11000" },
      ],
    },
    {
      imageUrl:
        "https://img.wemep.co.kr/deal/7/083/4170837/5a04faa056e035874116fa70c75be8ef9b744408.jpg",
      title: "조개 피플",
      distance: "500",
      point: 4.5,
      menu: [
        { name: "조개찜", price: "25000" },
        { name: "삼겹살 200g", price: "25000" },
        { name: "로스까스 정식", price: "11000" },
      ],
    },
    {
      imageUrl:
        "https://img.wemep.co.kr/deal/7/083/4170837/5a04faa056e035874116fa70c75be8ef9b744408.jpg",
      title: "조개 피플",
      distance: "500",
      point: 4.5,
      menu: [
        { name: "조개찜", price: "25000" },
        { name: "삼겹살 200g", price: "25000" },
        { name: "로스까스 정식", price: "11000" },
      ],
    },
  ];

  const _loadAssetsAsync = async () => {
    await Promise.all(
      restaurants.restaurants.map((restaurant) =>
        Asset.loadAsync(restaurant.imageUrl)
      )
    );
  };
  const userToken = route.params.userToken;
  const getUser = async () => {
    try {
      const result = await apis.getUserMe(userToken);
      console.log("get User Success ");
      setUser(result.data);
      return { ...result.data };
    } catch (error) {
      console.log("error in get user", error);
    }
  };

  const getUserRestaurant = async () => {
    try {
      const { status, permissions } = await Permissions.askAsync(
        Permissions.LOCATION
      );
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const response = await apis.getRestaurant(
          // location.coords.latitude,
          // location.coords.longitude
          37.553292,
          126.9125836
        );
        console.log("get Restaurant");
        setRestaurants({ loading: false, restaurants: response.data });
      } else {
        throw new Error("Location permission not granted");
      }
    } catch (e) {
      console.log("error In HomeContainer", e);
    }
  };

  useEffect(() => {
    getUser();
    getUserRestaurant();
  }, []);
  useEffect(() => {
    if (user !== null) {
      const tmpUser = user.data.userInfo;
      socket.query.JWT = route.params.userToken;
      socket.query.email = tmpUser.email;
      socket.query.imageUrl = tmpUser.imageUrl;
      socket.query.name = tmpUser.name;
      socket.query.id = tmpUser.id;
      // socket.query.latitude = location.coords.latitude;
      // socket.query.longitude = location.coords.longitude;
      socket.open();

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  //같이 하기 버튼 클릭시
  const sendTogetherMessage = async () => {
    const tmpUser = user;

    // latitude , longitude 있음 , 나중에 사용 바람.!!!!
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    const sendMsg = {
      id: socket.query.id,
      latitude: 37.5,
      longitude: Platform.OS === "ios" ? 127.5 : 127.49999,
    };
    socket.emit("together", JSON.stringify(sendMsg), (msg) => {
      navigation.navigate("Together", { msg, user: user.data.userInfo });
    });
    // const sendMsg = { id: tmpUser.id, latitude: number, longitude: number }
    // socket.emit("together", JSON.stringify(msg), (msg) => {
    //   navigation.navigate("Together", { msg, user: user.data.userInfo });
    //   // navigation.navigate("Together", { msg, user: "abc" });
    //   // navigation.dispatch(StackActions.replace("Together", { msg: msg }));
    // });
  };

  if (restaurants.loading) {
    return <View></View>;
  } else {
    return (
      <MainPresenter
        navigation={navigation}
        route={route}
        restaurants={restaurants.restaurants}
        user={user}
        sendTogetherMessage={sendTogetherMessage}
      />
    );
  }
};
