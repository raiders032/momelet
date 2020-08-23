import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Basic from "../../../component/Basic";
import Footer from "../../../component/Footer";
import MypageBody from "../../../component/MypageBody";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export default ({ user, setUser, onClickFooter }) => {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const tmp = useRef(false);
  const footer = <Footer text="저장" onClick={onClickFooter} />;
  return (
    <Basic footer={footer}>
      <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <View
          style={{
            height: "30%",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ justifyContent: "flex-end" }}>
            <Image
              source={{ uri: user.imageUrl }}
              style={{
                width: WIDTH / 5,
                height: WIDTH / 5,
                borderRadius: 20,
              }}
            />
            <Image
              source={require("../../../assets/imageEdit.png")}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                alignSelf: "flex-end",
                position: "absolute",
                right: -8,
              }}
            />
          </View>
          <View style={{ paddingTop: 15, paddingLeft: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {isNameEdit ? (
                <TextInput
                  placeholder={user.name}
                  style={{
                    fontSize: 18,
                    fontFamily: "Godo",
                    // backgroundColor: "yellow",
                    textAlign: "right",
                  }}
                  onSubmitEditing={({ nativeEvent: { text: text } }) => {
                    setIsNameEdit(false);
                    if (text) {
                      setUser((before) => {
                        const changedUser = { ...before, name: text };
                        return changedUser;
                      });
                    }
                  }}
                  autoFocus={true}
                />
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Godo",

                    textAlign: "left",
                  }}
                >
                  {user.name}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  setIsNameEdit(true);
                }}
              >
                <Image
                  source={require("../../../assets/nameEdit.png")}
                  style={{ width: 20, height: 20, marginLeft: 5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <MypageBody categories={user.categories} setUser={setUser} />
      </View>
    </Basic>
  );
};
