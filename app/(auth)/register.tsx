import React from "react";
import { router } from "expo-router";
import { View, Image, Text, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import Input from "@/components/Input";
import { fetchRegistration } from "@/services/api";
import { registerSchema } from "@/validation/auth.validation";
import { createToken } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

export default function register() {
  const { isAuthenticated, loading: loadingAuth } = useAuth()

  const [loading, setLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
      
  }, [isAuthenticated])

  async function handleSubmit() {
    setLoading(true)

    const data = { name, email, password };

    const validatedData = registerSchema.safeParse(data);

    if (!validatedData.success) {
      ToastAndroid.show(validatedData.error.errors[0].message, 1500)
    }
    
    const resRegister = await fetchRegistration(
      validatedData.data?.name as string, 
      validatedData.data?.email as string, 
      validatedData.data?.password as string
    );

    if (resRegister.statusCode === 201) {
      await createToken(resRegister.data.access_token)
      
      setTimeout(() => {
        setLoading(false)
        router.push('/profile');
      }, 1000)
    }

    setLoading(false)
  }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />

      <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <View className="flex justify-center items-center flex-1 flex-col gap-5">

          <View>
            <Text className="text-center text-white text-4xl mb-3">Registration</Text>
          </View>

          <Input value={name} onChangeText={setName} placeholder="Name" />

          <Input value={email} onChangeText={setEmail} placeholder="Email" />

          <Input secureTextEntry value={password} onChangeText={setPassword} placeholder="Password" />

          <View className="w-full">
            <TouchableOpacity disabled={loading} className={`w-full p-3 rounded-xl ${loading ? 'bg-purple-400': 'bg-purple-500'}`} onPress={handleSubmit}>
              <Text className="text-white text-center text-lg">{loading ? 'Loading...' : 'Submit' }</Text>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row">
            <Text className="text-white">If you have account, please </Text>
            
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-accent">Login</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text className="text-accent">Home</Text>
            </TouchableOpacity>
          </View>
        
        </View>
      </ScrollView>
    </View>
  );
}
