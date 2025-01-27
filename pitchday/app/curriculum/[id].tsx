import API from "@/constants/API";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLocalSearchParams } from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Curriculum() {
  const { id } = useLocalSearchParams();
  const { token } = useAuthContext();
  const [userInformation, setUserInformation] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${API.API_CONNECTION_URL}/users/${id.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUserInformation(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (token && id) fetchUser();
  }, [id, token]);

  if (!userInformation) return null;

  function renderBreakedText(text: string) {
    return text.split("\\n").map((line: string, index: number) => (
      <Text key={index}>
        {line}
        {index !== userInformation.about.split("\\n").length - 1 && "\n"}
      </Text>
    ));
  }
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <Image
          source={{ uri: userInformation.profilePicture }}
          style={styles.picture}
        ></Image>
        <View style={{ marginTop: 48 }}>
          <View style={{ marginBottom: 32, display: "flex", gap: 8 }}>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Contato
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              {userInformation.phoneNumber}
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Linkedin: {userInformation.linkedinLink}
            </Text>
          </View>
          <Text style={styles.skills}>Skills</Text>
          {userInformation.skills.map((skill: any, index: number) => {
            return (
              <View style={{ marginBottom: 12 }} key={index}>
                <Text style={styles.skill}>{skill.name}</Text>
                <View style={{ display: "flex", gap: 4, flexDirection: "row" }}>
                  {new Array(skill.level).fill(0).map((item, i) => {
                    return (
                      <View
                        key={i + 99}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 12,
                          backgroundColor: "white",
                        }}
                      ></View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <ScrollView style={styles.rightSide}>
        <Text style={styles.name}>{userInformation.name}</Text>
        <View style={styles.topics}>
          <Text style={styles.topicsTitle}>Sobre</Text>
          <Text style={[styles.topicDescription]}>
            {renderBreakedText(userInformation.about)}
          </Text>
        </View>
        <View style={styles.topics}>
          <Text style={styles.topicsTitle}>Educação</Text>
          <Text style={styles.topicDescription}>
            {renderBreakedText(userInformation.education)}
          </Text>
        </View>
        <View style={styles.topics}>
          <Text style={styles.topicsTitle}>Carreira</Text>
          <Text style={styles.topicDescription}>
            {renderBreakedText(userInformation.curriculum)}
          </Text>
        </View>
        <View style={styles.topics}>
          <Text style={styles.topicsTitle}>Objetivo</Text>
          <Text style={styles.topicDescription}>
            {renderBreakedText(userInformation.goal)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
  },
  leftSide: {
    width: "45%",
    height: "100%",
    backgroundColor: "blue",
    paddingHorizontal: 12,
  },
  rightSide: {
    width: "55%",
    height: "100%",
    paddingHorizontal: 12,
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "#D9D9D9",
    borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal: "auto",
    marginTop: 40,
  },
  skills: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    marginBottom: 16,
  },
  skill: {
    color: "white",
    marginBottom: 8,
    fontSize: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 60,
    marginHorizontal: "auto",
    marginBottom: 48,
  },
  topics: {
    marginBottom: 24,
  },
  topicsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  topicDescription: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 16,
  },
});
