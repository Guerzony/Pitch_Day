import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { decodeJWT } from "@/utils/decodeJWT";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import API from "@/constants/API";
import { useFavoriteContext } from "@/contexts/FavoritedUsers";
import { FontAwesome } from "@expo/vector-icons";

export function UserCard({
  name,
  photo,
  section,
  _id,
  onDelete,
}: {
  color: string;
  name: string;
  _id: string;
  photo?: string;
  section: string;
  onDelete: () => void;
}) {
  const router = useRouter();
  const { token } = useAuthContext();
  const { favoritedUsers, setFavoritedUsers } = useFavoriteContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const decoded = decodeJWT(token!);

  const updateFavorites = async (updatedFavorites: string[]) => {
    try {
      const response = await fetch(
        `${API.API_CONNECTION_URL}/companies/${decoded.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify({
            name: decoded.name,
            favorites: updatedFavorites,
          }),
        }
      );
      const data = await response.json();
      setFavoritedUsers(data.favorites);
    } catch (err) {
      setError("Erro ao atualizar os favoritos.");
    }
  };

  const favoritePerson = (id: string) => {
    const isFavorited = favoritedUsers.includes(id);
    const updatedFavorites = isFavorited
      ? favoritedUsers.filter((favorite) => favorite !== id)
      : [...favoritedUsers, id];

    updateFavorites(updatedFavorites);
  };

  const handleClick = (id: string) => {
    router.push({ pathname: `/curriculum/${id}` });
  };

  async function deleteUser() {
    try {
      await fetch(`${API.API_CONNECTION_URL}/users/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      onDelete();
    } catch (err) {
      setError("Erro ao atualizar os favoritos.");
    }
  }

  const renderRightActions = () => (
    <RectButton style={styles.delete} onPress={deleteUser}>
      <Text>Deletar</Text>
    </RectButton>
  );

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <>
      {!loading && (
        <Swipeable
          renderRightActions={
            decoded.name === "Inatel" ? renderRightActions : undefined
          }
        >
          <Pressable
            onPress={() => handleClick(_id)}
            style={[styles.card, { backgroundColor: section }]}
          >
            <View>
              <Text style={{ fontSize: 24 }}>{name}</Text>
              <Text style={{ fontSize: 14 }}>Seção {section}</Text>
            </View>
            <View style={styles.actions}>
              <Pressable>
                <FontAwesome5 name="whatsapp" size={24} color="black" />
              </Pressable>
              <Pressable onPress={() => favoritePerson(_id)}>
                {favoritedUsers.includes(_id) ? (
                  <FontAwesome name="heart" size={24} color="red" />
                ) : (
                  <FontAwesome name="heart-o" size={24} color="black" />
                )}
              </Pressable>
              <Image source={{ uri: photo }} style={styles.circle} />
            </View>
          </Pressable>
        </Swipeable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 4,
    paddingLeft: 21,
    paddingTop: 16,
    paddingBottom: 11,
    paddingRight: 8,
    width: "100%",
    height: 79,
    borderWidth: 1,
    borderColor: "#00000099",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 8,
  },
  circle: {
    width: 64,
    height: 64,
    backgroundColor: "#D9D9D9",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#000000",
  },
  delete: {
    height: 77,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginLeft: 8,
    backgroundColor: "red",
    borderRadius: 6,
  },
});
