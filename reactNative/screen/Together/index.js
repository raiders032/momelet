// import { createStackNavigator } from '@react-navigation/stack';
// import React, { useEffect } from 'react';
// import { Text, View } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// import GameResult from './GameResult';
// import GameRoom from './GameRoom';
// import Invite from './Invite';
// import WaitingRoomForResult from './WaitingRoomForResult';
// import WaitingRoomForStart from './WaitingRoomForStart';

// const Stack = createStackNavigator();

// export default ({ navigation, route }) => {
//   // useEffect(() => {
//   //   console.log('Hello');

//   //   return () => {
//   //     console.log('bye');
//   //   };
//   // }, [navigation, route]);

//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Invite"
//         component={Invite}
//         options={{
//           headerLeft: () => (
//             <TouchableOpacity
//               style={{ marginLeft: 10 }}
//               onPress={() => {
//                 navigation.navigate('Main');
//               }}>
//               <Text>홈으로</Text>
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="WaitingRoomForStart"
//         component={WaitingRoomForStart}
//         options={{
//           headerShown: true,
//           title: '대기실',
//           headerLeft: () => <View />,
//           headerTitleAlign: 'center',
//         }}
//       />
//       <Stack.Screen
//         name="GameRoom"
//         component={GameRoom}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="WaitingRoomForResult"
//         component={WaitingRoomForResult}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="GameResult"
//         component={GameResult}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };
