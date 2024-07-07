import { useFonts } from 'expo-font';
import { router, Link, SplashScreen, Stack, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Button, FlatList, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginModal from '@/components/LoginModal'

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
          headerTitle: props => <LogoTitle {...props} />,
        }}
      />
      {user ?
        <View style={styles.listWrapper}>
          <FlatList ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
            data={
              [
                { key: 'CS1' },
                { key: 'CS2' },
              ]
            }
            renderItem={({ item }) =>
              <View style={styles.item_container}>
                <Text style={[styles.font, styles.item, { paddingLeft: 5 }]}>{item.key}</Text>
                <Ionicons name="chevron-forward-sharp" style={[styles.item, { paddingRight: 5 }]} />
              </View>
            } />
          <View style={{ paddingBottom: 10 }}>
            <Button title="Close Modal" onPress={
              () => auth().signOut().then(() => console.log(auth().currentUser))
            } />
          </View>
        </View>
        :
        <LoginModal />
      }
    </View >
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
