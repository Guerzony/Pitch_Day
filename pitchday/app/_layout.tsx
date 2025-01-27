import { AuthContextProdivder } from "@/contexts/AuthContext";
import { FavoritedUsersContextProvider } from "@/contexts/FavoritedUsers";
import { FilteredUsersContextProvider } from "@/contexts/FilteredUsersContext";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthContextProdivder>
        <FavoritedUsersContextProvider>
          <FilteredUsersContextProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </FilteredUsersContextProvider>
        </FavoritedUsersContextProvider>
      </AuthContextProdivder>
    </GestureHandlerRootView>
  );
}
