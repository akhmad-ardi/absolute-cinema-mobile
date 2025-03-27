import React from 'react';
import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native';
import { images } from '@/constants/images';
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from '@/services/appwrite';
import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';

export default function search() {
    const [searchQuery, setSearchQuery] = React.useState('');    
    const { 
        data: movies, 
        loading, 
        error,
        refetch: loadMovies,
        reset } = useFetch(() => fetchMovies({
             query: searchQuery
        }), false);
        
    function handleSearch(text: string) {
        setSearchQuery(text);
    }

    React.useEffect(() => {
        const timeOutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies()


            } else {
                reset()
            }
        }, 1000);

        return () => clearTimeout(timeOutId)
    }, [searchQuery])

    React.useEffect(() => {
        // Call updateSearchCount only if there are results
        if (movies?.length! > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies])
        
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />

            <FlatList  
                data={movies}
                renderItem={({ item }) => (
                    <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id}
                className='px-5'
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className='w-full justify-center items-center mt-20'>
                            <Image source={icons.logo} className='w-12 h-10' />
                        </View>

                        <View className='my-5'>
                            <SearchBar 
                                placeholder='Search movie...'
                                value={searchQuery}
                                onChangeText={handleSearch}
                             />
                        </View>

                        {loading && (
                            <ActivityIndicator size="large" color="#0000FF" className='my-3' />
                        )}

                        {error && (
                            <Text className='text-red-500 px-5 my-5'>Error: {error.message}</Text>
                        )}

                        {!loading &&
                         !error && 
                         searchQuery.trim() &&
                         movies?.length > 0 && (
                            <Text className='text-xl text-white font-bold'>
                                Search result for{' '}
                                <Text className='text-accent'>{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }

                ListEmptyComponent={
                    !loading && !error ? (
                        <View className='mt-5 px-5'>
                            <Text className='text-center text-accent'>
                                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                            </Text>     
                        </View>
                    ): null
                }
            />
        </View>
    )
}