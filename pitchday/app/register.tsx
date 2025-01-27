import API from "@/constants/API";
import { useAuthContext } from "@/contexts/AuthContext";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import RNPIcker from "react-native-picker-select";

export default function Register() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState("");
  const [goals, setGoals] = useState("");
  const [skills, setSkills] = useState([{ name: "", level: 1 }]);
  const [linkedin, setLinkedin] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [color, setColor] = useState("");

  const { token } = useAuthContext();

  function handleSubmit() {
    const arr = [about, name, surname, education, goals, skills, curriculum];
    if (
      arr.some((value) => {
        if (value instanceof String) value.trim().length == 0;
      })
    )
      return;

    const aboutWithBreaks = about.replace(/\n/g, "\\n");
    const educationWithBreaks = education.replace(/\n/g, "\\n");
    const goalsWithBreaks = goals.replace(/\n/g, "\\n");
    const curriculumWithBreaks = curriculum.replace(/\n/g, "\\n");

    fetch(`${API.API_CONNECTION_URL}/users`, {
      body: JSON.stringify({
        name,
        surname,
        about: aboutWithBreaks,
        education: educationWithBreaks,
        goal: goalsWithBreaks,
        curriculum: curriculumWithBreaks,
        skills,
        color,
        phoneNumber: phone,
        profilePicture: photo,
        linkedinLink: linkedin,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  const compressImage = async (uri: string) => {
    const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
      compress: 0.7,
      format: ImageManipulator.SaveFormat.JPEG,
    });
    return manipResult;
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      console.log(compressedUri);
      setPhoto(compressedUri.uri);
    }
  };

  const handleAddSkill = () => {
    setSkills([...skills, { name: "", level: 1 }]);
  };

  const handleSkillChange = (
    index: number,
    field: "name" | "level",
    value: string
  ) => {
    const updatedSkills = [...skills];
    if (field == "level") updatedSkills[index][field] = Number(value) as never;
    else updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          marginHorizontal: "auto",
          fontSize: 40,
          fontWeight: "bold",
          color: "#ffffff",
        }}
      >
        Registro
      </Text>
      <ScrollView style={styles.form}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
            {photo ? (
              <ImageBackground
                source={{ uri: photo }}
                style={styles.imageBackground}
                imageStyle={styles.imageBackgroundStyle}
              >
                <Text style={styles.text}>Editar</Text>
              </ImageBackground>
            ) : (
              <Text style={styles.text}>+</Text>
            )}
          </TouchableOpacity>
          <Text>Clique no circulo para adicionar uma foto</Text>
        </View>
        <TextInput
          style={[styles.input, styles.spacing]}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Nome:"
        />
        <TextInput
          style={[styles.input, styles.spacing]}
          value={surname}
          onChangeText={(text) => setSurname(text)}
          placeholder="Sobrenome:"
        />
        <TextInput
          style={[styles.input, styles.spacing]}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder="Número de telefone:"
        />
        <TextInput
          style={[styles.input, styles.spacing]}
          multiline
          value={color}
          numberOfLines={1}
          onChangeText={(text) => setColor(text)}
          placeholder="Seção (código hexadecimal com #):"
        />
        <TextInput
          style={[
            styles.input,
            styles.spacing,
            { height: 132, textAlignVertical: "top" },
          ]}
          multiline
          value={about}
          onChangeText={(text) => setAbout(text)}
          numberOfLines={4}
          placeholder="Sobre:"
        />
        <TextInput
          style={[
            styles.input,
            styles.spacing,
            { height: 112, textAlignVertical: "top" },
          ]}
          multiline
          numberOfLines={3}
          value={education}
          onChangeText={(text) => setEducation(text)}
          placeholder="Educação:"
        />
        <TextInput
          style={[
            styles.input,
            styles.spacing,
            { height: 112, textAlignVertical: "top" },
          ]}
          multiline
          numberOfLines={3}
          value={curriculum}
          onChangeText={(text) => setCurriculum(text)}
          placeholder="Experiência:"
        />
        <TextInput
          style={[
            styles.input,
            styles.spacing,
            { height: 129, textAlignVertical: "top" },
          ]}
          multiline
          value={goals}
          onChangeText={(text) => setGoals(text)}
          numberOfLines={4}
          placeholder="Objetivo:"
        />
        <TextInput
          style={[styles.input, styles.spacing]}
          multiline
          value={linkedin}
          onChangeText={(text) => setLinkedin(text)}
          numberOfLines={1}
          placeholder="Linkedin:"
        />
        <View style={{ marginBottom: 18 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
            Skills:
          </Text>
          {skills.map((skill, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}
            >
              <TextInput
                style={[styles.input, { flex: 2 }]}
                value={skill.name}
                onChangeText={(text) => handleSkillChange(index, "name", text)}
                placeholder="Nome da skill"
              />
              <RNPIcker
                style={{
                  inputIOS: [styles.input, { flex: 1 }],
                  inputAndroid: [styles.input, { flex: 1 }],
                  inputWeb: [styles.input, { flex: 1 }],
                }}
                value={skill.level}
                onValueChange={(value) =>
                  handleSkillChange(index, "level", value)
                }
                items={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                ]}
              />
            </View>
          ))}
          <TouchableOpacity
            onPress={handleAddSkill}
            style={[styles.button, { marginTop: 10 }]}
          >
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              + Adicionar mais skills
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Pressable onPress={handleSubmit} style={[styles.button]}>
        <Text style={{ fontSize: 16, textAlign: "center" }}>Cadastrar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 12,
    paddingBottom: 64,
    width: "100%",
    height: "100%",
    backgroundColor: "#065CBE",
  },
  spacing: {
    marginBottom: 18,
  },
  form: {
    height: "100%",
    marginTop: 52,
    marginBottom: 18,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "#00000061",
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackgroundStyle: {
    borderRadius: 60,
  },
  text: {
    color: "#fff",
    fontWeight: "regular",
    fontSize: 14,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  avatarButton: {
    width: 96,
    height: 96,
    borderRadius: 60,
    overflow: "hidden",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "#00000061",
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginBottom: 18,
  },
  inputAndroid: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "#00000061",
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginBottom: 18,
  },
  inputWeb: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 20,
    fontWeight: "bold",
    color: "#00000061",
    width: "100%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginBottom: 18,
  },
});
