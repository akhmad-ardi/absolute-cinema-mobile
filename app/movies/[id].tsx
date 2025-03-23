import {View, Text} from 'react-native';
import {useLocalSearchParams} from "expo-router";

export default function detail() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Detail {id}</Text>
        </View>
    )
}