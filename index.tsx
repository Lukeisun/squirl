import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';

export default function Home() {
  const s = auth().currentUser;
  console.log(s)
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

// // import { Image, Text, View, StyleSheet, Button, FlatList, Modal, Dimensions } from 'react-native';
// import { Text, View, StyleSheet } from 'react-native';
// // function LogoTitle(props: any) {
// //   return (
// //     <Text style={[styles.title, styles.font]}>{props.children}</Text>
// //   );
// // }
// // const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
//
// export default async function Home() {
//   return (
//     <View>
//       <Text> HI </Text>
//     </View>);
// }
//
// // {/* <Link style={[styles.font]} href={{ pathname: 'details', params: { name: 'Bacon' } }}>Go to Details</Link> */}
// // {/* <Text style={[styles.font,]}>Home Screen</Text > */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'SpaceMono',
    backgroundColor: '#fff',
  },
  listWrapper: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#fff',
    fontFamily: 'SpaceMono',
    width: '80%',
  },
  font: { fontFamily: 'SpaceMono' },
  title: {
    fontSize: 24
  },
  item: {
    fontSize: 18,
    height: 36,
    color: "#fff",
    verticalAlign: "middle",
  },
  item_container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#000",
    width: '100%',
    borderRadius: 2,
  },
  modal: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dddd",
    // width: screenWidth * .8,
    // height: screenHeight * .8,
    borderRadius: 10,
    top: "10%",
    position: "absolute",
  }
});
