import { TouchableOpacity, Text, View, StyleSheet, ViewStyle, Modal, Dimensions, TextInput, Animated, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useState, useEffect, useRef, PropsWithChildren } from 'react';
import { FadeIn } from 'react-native-reanimated';
import { Stack, useRouter } from 'expo-router';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;
const FadeInView: React.FC<FadeInViewProps> = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};
export default function LoginModal() {
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err: any) {
      const codes = [
        "auth/email-already-in-use",
        "auth/invalid-credential",
      ]
      setErrorMsg("");
      if (codes.includes(err.code)) {
        setErrorMsg(err.code);
      }
    }
  }
  return (
    <Modal animationType='slide' visible={true} transparent={true}>
      <View style={styles.modal}>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.touchable} onPress={handleSignIn}>
            <Text>Sign In</Text>
          </TouchableOpacity>
          {errorMsg &&
            <FadeInView style={{}}>
              <Text style={{ alignSelf: "center", fontWeight: "bold", }}>{errorMsg}</Text>
            </FadeInView>
          }
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  font: { fontFamily: 'SpaceMono' },
  modal: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dddd",
    width: screenWidth * .8,
    height: screenHeight * .8,
    borderRadius: 10,
    top: "10%",
    position: "absolute",
  },
  inputs: {
    borderRadius: 10,
    padding: 30,
    alignItems: "flex-start",
    rowGap: 5,
    backgroundColor: "#fff",
    width: "60%",
  },
  touchable: {
    alignSelf: "center",
    padding: 20,
  },
})
