import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeToken(token: string) {
  try {
    await AsyncStorage.setItem("@jwt_token", token);
  } catch (e) {}
}

export async function getToken() {
  try {
    return await AsyncStorage.getItem("@jwt_token");
  } catch (e) {}
}
