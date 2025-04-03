import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

type Props = {
  movie_id: number;
  user_id: number;
  title: string;
  poster_url: string;
}

export default function SavedCard({ movie_id, poster_url, title }: Props){
    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image 
                    source={{
                        uri: poster_url ?
                        `https://image.tmdb.org/t/p/w500${poster_url}` 
                        : `https://placehold.co/600x400/1a1a1a/ffffff.png`
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                    />

                <Text className="text-sm text-white font-bold mt-2" numberOfLines={1}>{title}</Text>
            </TouchableOpacity>
        </Link>
    );
}