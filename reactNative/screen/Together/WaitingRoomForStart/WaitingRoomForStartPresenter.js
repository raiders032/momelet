import React, { useEffect, useState } from 'react';
import { View, Image, Text, Platform, PlatformColor } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Basic from '../../../component/Basic';
import Footer from '../../../component/Footer';
import WaitBox from '../../../component/WaitBox';
import socket from '../../../socket';

export default ({ users, onClick, activation, isGetRestaurantSuccess, crewOnClick, myId }) => {
  // console.log('wait', activation);

  const [readyState, setReadyState] = useState(() => (activation ? 2 : 1));
  const abc = [];
  const footer = (
    <Footer
      // onClick={readyState == 0 ? onClick : crewOnClick}
      onClick={() => {
        if (readyState == 2) {
          onClick();
        } else {
          crewOnClick(readyState);
          setReadyState(Math.abs(readyState - 1));
        }
      }}
      style={readyState == 0 ? { backgroundColor: '#F0F0F0' } : {}}
      text={readyState == 2 ? '시작하기' : readyState == 1 ? '준비하기' : '준비완료'}
      // activation={activation}
    />
  );

  //임시로 테스트 하기 위해서 11 개만 만들고 밑에 추가로 하나 만듬.
  for (let i = 0; i < 12; i++) {
    if (i < users.length) {
      console.log(users, myId);
      abc.push(
        <WaitBox key={i}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: users[i].isReady ? '#F0F0F0' : 'white',
              borderRadius: 18,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ width: '40%', height: '40%', borderRadius: 18 }}
              source={{ uri: users[i].imageUrl }}
            />
            <Text
              style={
                Platform.OS === 'ios'
                  ? {
                      // fontFamily: 'NotoSansCJKkr',
                      fontSize: 15,
                      marginTop: 10,
                    }
                  : {
                      fontSize: 15,
                      marginTop: 10,
                    }
              }>
              {users[i].name}
            </Text>
          </View>
        </WaitBox>
      );
    } else {
      abc.push(<WaitBox key={i} />);
    }
  }

  return (
    <Basic footer={footer}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f7f7f7',
          paddingVertical: 20,
          paddingHorizontal: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          alignContent: 'space-around',
        }}>
        {abc}
      </View>
    </Basic>
  );
};
