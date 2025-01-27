import { useAuthContext } from "@/contexts/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [enterprise, setEnterprise] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn } = useAuthContext();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <View>
            <Text style={styles.appName}>PitchDay</Text>
            <View style={styles.appIcon}></View>
          </View>
          <View style={{ width: "100%" }}>
            <Text style={styles.label}>Empresa</Text>
            <View style={{ position: "relative" }}>
              <TextInput
                value={enterprise}
                onChangeText={(text) => setEnterprise(text)}
                style={styles.input}
                keyboardType="email-address"
              />
              <FontAwesome
                name="user-circle"
                size={24}
                color="black"
                style={{
                  position: "absolute",
                  top: "15%",
                  right: 5,
                  justifyContent: "center",
                  opacity: 0.5,
                }}
              />
            </View>
            <Text style={{ ...styles.label, marginTop: 17 }}>Senha</Text>
            <View style={{ position: "relative" }}>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                keyboardType="visible-password"
              />
              <Entypo
                name="lock"
                size={24}
                color="black"
                style={{
                  position: "absolute",
                  top: "15%",
                  right: 5,
                  justifyContent: "center",
                  opacity: 0.5,
                }}
              />
            </View>
            <Pressable
              onPress={() => signIn(enterprise, password)}
              style={styles.button}
            >
              <Text style={{ fontSize: 20 }}>Entrar</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 80,
    paddingTop: 66,
    gap: 130,
  },
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontFamily: "Inter",
    fontSize: 32,
    height: 61,
    color: "#ffffff",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  appIcon: {
    width: 117,
    height: 117,
    backgroundColor: "#D9D9D9",
    borderRadius: 117 / 2,
    borderWidth: 1,
    borderColor: "#000000",
  },
  label: {
    fontFamily: "Inter",
    // fontWeight: 700,
    fontSize: 20,
    color: "#ffffff",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: 2,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 12,
    height: 37,
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  button: {
    paddingHorizontal: 17,
    paddingVertical: 2,
    backgroundColor: "#D9D9D9",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 51,
  },
});
