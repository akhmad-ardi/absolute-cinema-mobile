import React from "react";
import { router } from "expo-router";
import { View, Text, Image, Button, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";
import useAuth from "@/hooks/useAuth";
import { images } from "@/constants/images";
import Input from "@/components/Input";
import useFetch from "@/hooks/useFetch";
import { fetchUser } from "@/services/api";

export default function profile() {
    const { token, isAuthenticated, loading: loadingAuth, logout } = useAuth();
    const { data: user, loading: loadingUser, refetch: getUser } = useFetch(() => fetchUser(token), false);

    React.useEffect(() => {
        async function loadUser() {
            return await getUser();
        }

        if (isAuthenticated) {
            loadUser();
        }
    }, [isAuthenticated]);
    
    async function handleLogout() {
        await logout();

        router.push('/login');
    }

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            
            <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

                {loadingAuth || loadingUser ? (
                    <ActivityIndicator 
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : (
                    <>
                        {isAuthenticated ? (
                            <>
                                <View className="flex flex-1 flex-col justify-center gap-5">
                                    <Image source={icons.person} className="size-10 self-center mb-3" tintColor="#fff" />

                                    <View className="gap-5" pointerEvents="none">
                                        <Text className="text-white ms-4">Name</Text>

                                        <Input value={user?.data.name} disabled />

                                        <Text className="text-white ms-4">Email</Text>

                                        <Input value={user?.data.email} disabled />
                                    </View>

                                    <TouchableOpacity onPress={handleLogout} className="py-3 w-full rounded-xl bg-red-600">
                                        <Text className="text-white text-center">Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            ):(
                                <View className="flex flex-1 flex-col justify-center items-center gap-5">
                                    <Image source={icons.person} className="size-10" tintColor="#fff" />
                                        
                                    <Text className="text-gray-500 text-base">Profile</Text>
                                        
                                    <Button title="Login" onPress={() => { router.push('/login') }} />

                                    <Text className="text-gray-500">- OR -</Text>

                                    <Button title="Register" onPress={() => { router.push('/register') }} />
                                </View>
                            )}
                    </>
                )}
            </ScrollView>
        </View>
    );
}