import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Basic from '../../../component/Basic';
import Card from '../../../component/Card';
import CardTopCover from '../../../component/CardTopCover';
import Footer from '../../../component/Footer';
import RestaurantCard from '../../../component/RestaurantCard';
import socket from '../../../socket';

export default ({ result, total, selected, onClick, footerClick, userLocation }) => {
  // const footer = (
  //   <View
  //     style={{ height: "100%", justifyContent: "center", alignItems: "center" }}
  //   >
  //     <TouchableOpacity>
  //       <Text style={{ fontFamily: "Godo", fontSize: 24 }}>홈으로</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  const cover = <CardTopCover total={total} selected={selected} onClick={onClick} />;
  const footer = <Footer text="다시하기" onClick={footerClick} />;

  return (
    <Basic footer={footer}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RestaurantCard restaurant={result} cover={cover} userLocation={userLocation} />
      </View>
    </Basic>
  );
};
