import { Stack } from "expo-router";
import { Text } from "react-native";

export default function layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}