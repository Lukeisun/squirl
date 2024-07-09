
import { FlatList, TouchableOpacity, Text, View, StyleSheet, ViewStyle, Modal, Dimensions, TextInput, Button, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useState, useEffect, useRef, PropsWithChildren } from 'react';
import { Ionicons } from '@expo/vector-icons';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage'
import { Stack, useRouter } from 'expo-router';
export default function HomeScreen() {
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);
  const uid = auth().currentUser?.uid;
  if (!uid) {
    router.push("/");
    return;
  }
  const reference = storage().ref(`/user/${uid}`);
  // const task = reference.putString("hello", "raw");
  // task.then(() => console.log("uploaded"));
  useEffect(() => {
    async function getFiles(reference: FirebaseStorageTypes.Reference) {
      const result = await reference.list();
      result.items.forEach(ref => {
        const filename = ref.fullPath.split("/").pop();
        if (!filename) { return; }
        if (!files.includes(filename)) {
          setFiles(prevFiles => [...prevFiles, filename]);
        }
      });
    }
    getFiles(reference).then(() => console.log('fin'))
  }, []);
  console.log(files)
  return (
    <View style={styles.listWrapper}>
      <Stack.Screen
        options={{
          headerLeft: _ =>
            <Pressable style={styles.button} onPress={() => auth().signOut().then()}>
              <Text style={styles.text}>Sign Out</Text>
            </Pressable>
        }}
      />
      <FlatList ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
        data={
          files.map(file => {
            return { key: file };
          })
        }
        renderItem={({ item }) =>
          <View style={styles.item_container}>
            <Text numberOfLines={1} style={[styles.font, styles.item, { paddingLeft: 5 }]}>{item.key}</Text>
            <Ionicons name="chevron-forward-sharp" style={[styles.item, { paddingRight: 5 }]} />
          </View>
        } />
      <View style={{ paddingBottom: 10 }}>
        <Pressable style={styles.button}>
          <Text style={styles.text}>
            Create New
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
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
    textAlign: "left",
  },
  item_container: {
    flexWrap: "nowrap",
    overflow: "hidden",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#000",
    width: '100%',
    borderRadius: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    fontFamily: 'SpaceMono',
  },
});
