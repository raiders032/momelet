import React, { useState, useRef } from 'react';
import { View, Image, Dimensions, Text, TextInput, TouchableOpacity } from 'react-native';

import Basic from '../../../component/Basic';
import Footer from '../../../component/Footer';
import MypageBody from '../../../component/MypageBody';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export default ({
  user,
  setUser,
  onClickFooter,
  imageEditButtonEvent,
  coverMessageZIndex,
  coverMessageEnterButtonEvent,
}) => {
  const [isNameEdit, setIsNameEdit] = useState(false);
  const tmp = useRef(false);
  const footer = <Footer text="저장" onClick={onClickFooter} />;

  return (
    <Basic footer={footer}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: coverMessageZIndex,
        }}>
        <View
          style={{
            width: '60%',
            height: '25%',
            borderWidth: 0.5,
            backgroundColor: '#FEEE7D',
            borderRadius: 10,
          }}>
          <View style={{ alignItems: 'center', height: '60%', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Godo', fontSize: 15 }}>이미지 용량이 너무 커서</Text>
            <Text style={{ fontFamily: 'Godo', fontSize: 15 }}>작업을 수행 할 수 없습니다.</Text>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ padding: 10 }} onPress={coverMessageEnterButtonEvent}>
              <Text style={{ fontFamily: 'Godo', color: 'blue' }}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '100%',

          backgroundColor: 'white',
        }}>
        <View
          style={{
            height: '30%',

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ justifyContent: 'flex-end' }}>
            <Image
              source={{ uri: user.imageUrl }}
              style={{
                width: WIDTH / 5,
                height: WIDTH / 5,
                borderRadius: 20,
              }}
            />
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                right: -8,
              }}
              onPress={imageEditButtonEvent}>
              <Image
                source={require('../../../assets/imageEdit.png')}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ paddingTop: 15, paddingLeft: 30 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {isNameEdit ? (
                <TextInput
                  placeholder={user.name}
                  style={{
                    fontSize: 18,
                    fontFamily: 'Godo',
                    // backgroundColor: "yellow",
                    textAlign: 'right',
                  }}
                  onSubmitEditing={({ nativeEvent: { text } }) => {
                    setIsNameEdit(false);

                    if (text) {
                      setUser((before) => {
                        const changedUser = { ...before, name: text };

                        return changedUser;
                      });
                    }
                  }}
                  autoFocus
                />
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'Godo',

                    textAlign: 'left',
                  }}>
                  {user.name}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  setIsNameEdit(true);
                }}>
                <Image
                  source={require('../../../assets/nameEdit.png')}
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
