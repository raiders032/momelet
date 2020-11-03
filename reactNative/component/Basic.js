import { AppLoading } from 'expo';
import React, { Children } from 'react';
import { View, Text } from 'react-native';

import CoverMessage from './CoverMessage';

export default ({
  coverMessageConfig = {
    zIndex: -1,
    bodyMessage: <Text />,
    footerMessage: ['예', '아니요'],
    coverMessageRightEvent: () => {},
    coverMessageLeftEvent: () => {},
  },
  children,
  footer,
  style,
}) => {
  // console.log(footer);U

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: '#FEEE7D', ...style }}>{children}</View>
      {/* <View style={{ flex: 1, backgroundColor: 'yellow', ...style }}>{children}</View> */}
      {/* <View style={{ flex: 1, backgroundColor: 'white' }}>{children}</View> */}
      {footer ? <View style={{ height: 56, backgroundColor: 'white' }}>{footer}</View> : <></>}

      {/* <View
        style={{
          height: 56,
          backgroundColor: 'white',
          // borderTopWidth: 0.3,
          // borderColor: 'grey',
        }}>
        {footer}
      </View> */}
      <CoverMessage
        zIndex={coverMessageConfig.zIndex}
        bodyMessage={coverMessageConfig.bodyMessage}
        footerMessage={coverMessageConfig.footerMessage}
        coverMessageRightEvent={coverMessageConfig.coverMessageRightEvent}
        coverMessageLeftEvent={coverMessageConfig.coverMessageLeftEvent}
      />
    </View>
  );
};
