import React from "react";
import { View, Text, Image, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { fetchGetSavedMovie } from "@/services/api";
import SavedCard from "@/components/SavedCard";

export default function saved() {
    const { token, isAuthenticated, loading: loadingAuth } = useAuth();
    const { data: movies, loading: loadingSavedMovie, refetch: getSavedMovie } = useFetch(() => fetchGetSavedMovie(token), false);

    useFocusEffect(
        React.useCallback(() => {
            async function loadSavedMovie ()  {
                if (isAuthenticated) {
                  await getSavedMovie();
                }
            };
        
            loadSavedMovie();
        }, [isAuthenticated])
    );
    React.useEffect(() => {
        async function loadSavedMovie() {
            return await getSavedMovie();
        }

        if (isAuthenticated) {
            loadSavedMovie();
        }
    }, [isAuthenticated]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />

            <ScrollView className="flex-1 px-5" showsHorizontalScrollIndicator={false} contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

                <Text className="text-lg text-white font-bold mt-5 mb-5">Saved Movies</Text>

                {loadingAuth || loadingSavedMovie ? (
                    <ActivityIndicator 
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : (
                    <>
                        {movies?.data.length > 0 ? (
                            <FlatList 
                                data={movies?.data}
                                renderItem={({item}) => (
                                    <SavedCard {...item} />
                                )}
                                keyExtractor={(item) => item.id}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: 'flex-start',
                                    gap: 20,
                                    paddingRight: 5,
                                    marginBottom: 10
                                }}
                                className="mt-2 pb-32"
                                scrollEnabled={false}
                            />
                        ): (
                            <Text className="text-white text-center mt-36">No saved movie</Text>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    )
}
