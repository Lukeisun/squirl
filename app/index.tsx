import { useFonts } from 'expo-font';
import { Link, Redirect, SplashScreen, Stack, useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Button, FlatList, Modal, Dimensions } from 'react-native';
import LoginModal from '@/components/LoginModal'
import HomeScreen from '@/components/HomeScreen';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
function LogoTitle(props: any) {
  return (
    <Text style={[styles.title, styles.font]}>{props.children}</Text>
  );
}

export default function Home() {
  const [_] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Notes',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerShown: true,
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      {user ?
        <HomeScreen />
        :
        <LoginModal />
      }
    </View>
  );
}

// {/* <Link style={[styles.font]} href={{ pathname: 'details', params: { name: 'Bacon' } }}>Go to Details</Link> */}
// {/* <Text style={[styles.font,]}>Home Screen</Text > */}
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
});
