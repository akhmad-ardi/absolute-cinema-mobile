import React from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import Input from "@/components/Input";
import { router } from "expo-router";
import { loginSchema } from "@/validation/auth.validation";
import { fetchLogin } from "@/services/api";
import { createToken } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

export default function login() {
  const { isAuthenticated, loading: loadingAuth } = useAuth();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }

  }, [isAuthenticated])

  async function handleSubmit() {
    setLoading(true)
    
    const data = { email, password }

    const validatedData = loginSchema.safeParse(data)

    if (!validatedData.success) {
      ToastAndroid.show(validatedData.error.errors[0].message, 1500)
    }

    const resLogin = await fetchLogin(
      validatedData.data?.email as string, 
      validatedData.data?.password as string
    )
    
    if (resLogin.statusCode === 200) {
      await createToken(resLogin.data.access_token)
      
      setTimeout(() => {
        setLoading(false)
        router.push('/profile');
      }, 1000)
    }

    setLoading(false);
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View className="flex justify-center items-center flex-1 flex-col gap-5">
          {loadingAuth? (
            <Text className="text-white text-4xl">Loading...</Text>
          ):(
            <>
              <View>
                <Text className="text-center text-white text-4xl mb-3">Login</Text>
              </View>

              <Input value={email} onChangeText={setEmail} placeholder="Email" />

              <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />

              <View className="w-full">
                <TouchableOpacity onPress={handleSubmit} disabled={loading} className={`w-full p-3 rounded-xl ${loading ? 'bg-purple-300': 'bg-purple-400'}`}>
                  <Text className="text-white text-center text-lg">Submit</Text>
                </TouchableOpacity>
              </View>

              <View className="flex flex-row">
                <Text className="text-white">If you don't have account, please </Text>

                <TouchableOpacity className="text-accent" onPress={() => router.push('/register')}>
                  <Text className="text-accent">Register</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity onPress={() => router.push('/')}>
                  <Text className="text-accent">Home</Text>
                </TouchableOpacity>
              </View>
            </>
          )}


        </View>
      </ScrollView>
    </View>
  );
}
