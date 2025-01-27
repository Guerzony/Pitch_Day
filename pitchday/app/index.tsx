import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

import { UserCard } from "@/components/UserCard";
import { Filter } from "@/components/Filter";
import { useAuthContext } from "@/contexts/AuthContext";
import { useFilteredUsersContext } from "@/contexts/FilteredUsersContext";
import { useFocusEffect, useRouter } from "expo-router";
import { decodeJWT } from "@/utils/decodeJWT";
import API from "@/constants/API";
import { useFavoriteContext } from "@/contexts/FavoritedUsers";

export default function Homepage() {
  const router = useRouter();
  const { token } = useAuthContext();
  const [users, setUsers] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const { filteredUsers } = useFilteredUsersContext();
  const { favoritedUsers } = useFavoriteContext();
  const sectionsArray = useRef([]);

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        router.replace({ pathname: "/login" });
      }
    }, [token, router])
  );

  useEffect(() => {
    if (token) {
      fetchUsers(token);
    }
  }, [token]);

  const fetchUsers = async (authToken: string) => {
    try {
      const response = await fetch(`${API.API_CONNECTION_URL}/users`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();

      data.data.forEach((user: any) => {
        if (!sectionsArray.current.some((color) => color == user.color))
          sectionsArray.current.push(user.color as never);
      });
      setUsers(data.data.filter((user: any) => !user.deletedAt));
    } catch (error) {
      console.error(error);
    }
  };

  if (!token) return null;

  const handleFilterApply = async (filters: any) => {
    try {
      const response = await fetch(
        `${API.API_CONNECTION_URL}/users?filter=${encodeURIComponent(
          JSON.stringify(filters)
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
    }
  };

  const decoded = decodeJWT(token);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ position: "relative" }}>
        <TextInput
          style={[styles.input]}
          placeholder="Participantes"
          value={inputValue}
          onChangeText={setInputValue}
        />
        {decoded?.name === "Inatel" && (
          <Pressable
            onPress={() => router.push({ pathname: "/register" })}
            style={{ position: "absolute", right: 48, top: "75%" }}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </Pressable>
        )}
        <Pressable
          onPress={() => setIsFilterVisible(true)}
          style={{ position: "absolute", right: 12, top: "75%" }}
        >
          <Feather name="filter" size={24} color="black" />
        </Pressable>
      </View>
      <ScrollView style={styles.scrollView}>
        {users.length > 0 ? (
          users.filter((user) =>
            user.name.toLowerCase().includes(inputValue.toLowerCase())
          ).length > 0 ? (
            filteredUsers.includes("favorited") ? (
              users
                .filter((user) => filteredUsers.includes(user._id))
                .filter((user) =>
                  user.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((user) => (
                  <UserCard
                    _id={user._id}
                    section={user.color}
                    color={user.color}
                    name={user.name}
                    key={user._id}
                    photo={user.profilePicture}
                    onDelete={() => {
                      setUsers((prev) =>
                        prev.filter((u) => u._id !== user._id)
                      );
                    }}
                  />
                ))
            ) : (
              users
                .filter((user) =>
                  user.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((user) => (
                  <UserCard
                    _id={user._id}
                    section={user.color}
                    color={user.color}
                    name={user.name}
                    key={user._id}
                    photo={user.profilePicture}
                    onDelete={() => {
                      setUsers((prev) =>
                        prev.filter((u) => u._id !== user._id)
                      );
                    }}
                  />
                ))
            )
          ) : (
            <Text>Nenhum usuário encontrado</Text>
          )
        ) : (
          <Text>Nenhum usuário encontrado</Text>
        )}
      </ScrollView>
      <Filter
        onFilterApply={handleFilterApply}
        sections={sectionsArray.current}
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 8,
    backgroundColor: "#065CBE",
  },
  input: {
    marginTop: 91,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#00000099",
    borderRadius: 10,
  },
  scrollView: {
    marginTop: 35,
  },
});
