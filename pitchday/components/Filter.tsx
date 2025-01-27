import React, { useState } from "react";
import { useFilteredUsersContext } from "@/contexts/FilteredUsersContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

// Tipo do filtro
type FilterType = {
  isVisible: boolean;
  onClose: () => void;
  sections: string[]; // Receber as seções do backend como prop
  onFilterApply: (filters: any) => void; // Função callback para aplicar o filtro
};

export function Filter({
  isVisible,
  onClose,
  sections,
  onFilterApply,
}: FilterType) {
  const { setFilteredUsers, filteredUsers } = useFilteredUsersContext();
  const [keyword, setKeyword] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  function handlePress(value: string) {
    if (value.trim().length == 0) setFilteredUsers([]);
    else setFilteredUsers([value]);
  }

  function applyFilters() {
    const filters: any = {};

    if (keyword) {
      filters["skills.name"] = keyword;
    }

    if (selectedSection) {
      filters.color = selectedSection;
    }

    if (isFavorited) {
      handlePress("favorited");
    } else {
      handlePress("");
    }

    onFilterApply(filters);
    onClose();
  }

  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Filtrar Usuários</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Digite palavras-chave"
            placeholderTextColor="#aaa"
            value={keyword}
            onChangeText={setKeyword}
          />

          <RNPickerSelect
            onValueChange={(value) => setSelectedSection(value)}
            value={selectedSection}
            items={sections.map((section) => ({
              label: section,
              value: section,
            }))}
            placeholder={{ label: "Selecione uma seção", value: "" }}
            style={{
              inputAndroid: styles.picker,
              inputIOS: styles.picker,
            }}
          />

          <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
            <Pressable
              style={[
                styles.checkboxBase,
                isFavorited && styles.checkboxChecked,
              ]}
              onPress={() => setIsFavorited((prev) => !prev)}
            >
              {isFavorited && (
                <Ionicons name="checkmark" size={24} color="white" />
              )}
            </Pressable>
            <Text>Favoritos</Text>
          </View>

          <Pressable style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: 50,
    backgroundColor: "#464C55",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    padding: 16,
    marginVertical: 12,
    flex: 1,
    flexDirection: "column",
    gap: 16,
  },
  textInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: "#333",
  },
  pickerContainer: {
    marginVertical: 12,
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: "#333",
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "transparent",
    marginHorizontal: 8,
  },
  checkboxChecked: {
    backgroundColor: "blue",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  applyButton: {
    marginTop: 16,
    backgroundColor: "#464C55",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
