import React, { useState, useEffect } from "react";
import MainPresenter from "./MainPresenter";
import { apis } from "../../api";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { View, Text } from "react-native";
import socket from "../../socket";

// 홈 식당 카드의 api 호출 데이터 전달

export default ({ navigation, route }) => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);
  const [isChanged, setIsChanged] = useState(1);
  const [coverMessageConfig, setCoverMessageConfig] = useState({
    zIndex: -1,
    bodyMessage: (
      <>
        <Text>abc</Text>
        <Text>abc</Text>
      </>
    ),
    footerMessage: ["예", "아니요"],
    coverMessageRightEvent: () => {},
    coverMessageLeftEvent: () => {},
  });
  const [restaurants, setRestaurants] = useState({
    loading: true,
    restaurants: [],
  });
  if (route.params.isChanged) {
    setIsChanged((before) => {
      return before ? 0 : 1;
    });

    route.params.isChanged = false;
  }

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
      console.log("get User Success \n");
      console.log("로그인한 유저의 정보 ");
      console.log("    토큰 : ", userToken);
      console.log("    id : ", result.data.data.userInfo.id);
      console.log("    이름 : ", result.data.data.userInfo.name);
      setUser(result.data);
      return { ...result.data };
    } catch (error) {
      console.log("error in get user", error);
    }
  };

  const getUserRestaurant = async (latitude, longitude) => {
    // console.log(latitude, longitude);
    if (user) {
      try {
        const { status, permissions } = await Permissions.askAsync(
          Permissions.LOCATION
        );
        if (status === "granted") {
          const response = await apis.getRestaurant(
            latitude,
            longitude,
            user.data.userInfo.id,
            userToken
          );

          console.log("get Restaurant Sucess");
          // console.log(response);
          setRestaurants({ loading: false, restaurants: response.data.data });
        } else {
          throw new Error("Location permission not granted");
        }
      } catch (e) {
        console.log("error In HomeContainer", e);
      }
    }
  };
  const socketConnect = async (latitude, longitude) => {
    if (user !== null) {
      const tmpUser = user.data.userInfo;

      socket.query.JWT = route.params.userToken;
      socket.query.email = tmpUser.email;
      socket.query.imageUrl = tmpUser.imageUrl;
      socket.query.name = tmpUser.name;
      socket.query.id = tmpUser.id;
      socket.query.latitude = latitude;
      socket.query.longitude = longitude;
      socket.open();

      socket.on("togetherInvitation", (msg) => {
        const tmpMsg = JSON.parse(msg);

        setCoverMessageConfig((before) => {
          return {
            ...before,
            zIndex: 1,
            bodyMessage: (
              <>
                <Text>{tmpMsg.hostName}님이</Text>
                <Text>초대하였습니다.</Text>
              </>
            ),

            coverMessageRightEvent: () => {
              setCoverMessageConfig((before) => {
                return { ...before, zIndex: -1 };
              });
            },
            coverMessageLeftEvent: () => {
              const sendMsg = { id: tmpUser.id, roomName: tmpMsg.roomName };
              socket.emit("gameRoomJoin", JSON.stringify(sendMsg), (msg) => {
                const tmpMsg = JSON.parse(msg);
                const { status, roomName, gameRoomUserList, hostId } = tmpMsg;
                const sendMsg = JSON.stringify({
                  roomName,
                  gameRoomUserList,
                  hostId,
                });

                setCoverMessageConfig((before) => {
                  return { ...before, zIndex: -1 };
                });
                if (tmpMsg.status === "success") {
                  navigation.navigate("WaitingRoomForStart", {
                    msg: sendMsg,
                    myId: user.data.userInfo.id,
                  });
                }
              });
            },
          };
        });
      });
    }
  };
  const getRestaurantAndSocketConnect = async () => {
    const location = await Location.getCurrentPositionAsync({});
    // const { latitude, longitude } = location.coords;
    const latitude = 37.5447048;
    const longitude = 127.0663154;
    await getUserRestaurant(
      latitude,
      longitude

      // location.coords.latitude,
      // location.coords.longitude
    );
    // await socketConnect(location.coords.latitude, location.coords.longitude);
    await socketConnect(latitude, longitude);
  };

  useEffect(() => {
    getUser();
  }, [isChanged]);
  useEffect(() => {
    getRestaurantAndSocketConnect();
    return () => {
      socket.disconnect();
    };
  }, [user]);
  // useEffect(() => {}, [user]);

  //같이 하기 버튼 클릭시
  const sendTogetherMessage = async () => {
    const tmpUser = user;

    // latitude , longitude 있음 , 나중에 사용 바람.!!!!
    const location = await Location.getCurrentPositionAsync({});

    const sendMsg = {
      id: socket.query.id,
      latitude: 37.5447048,
      longitude: 127.0663154,

      // latitude: location.coords.latitude,
      // longitude: location.coords.longitude,
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
        restaurants={restaurants.restaurants.restaurants}
        user={user}
        sendTogetherMessage={sendTogetherMessage}
        coverMessageConfig={coverMessageConfig}
      />
    );
  }
};
