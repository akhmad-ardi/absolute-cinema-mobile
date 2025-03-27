import { Tabs } from 'expo-router';
import {ImageBackground, Image, Text, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

function TabIcon({ focused, title, icon }: { focused: boolean; title: string; icon: any }) {
    if (!focused) {
        return (
            <View className="size-full jutify-center items-center mt-4 rounded-full">
                <Image source={icon} tintColor="#A8B5DB" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={images.highlight}
            className="flex flex-row w-full items-center justify-center flex-1 min-w-[112px] min-h-16 mt-4 rounded-full overflow-hidden"
        >
            <Image source={icon} tintColor="#151312" className="size-5" />

            <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
        </ImageBackground>
    );
}

export default function _layout() {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                backgroundColor: '#0F0D23',
                borderRadius: 50,
                marginHorizontal: 20,
                marginBottom: 36,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 0,
                borderColor: '0F0D23'
            }
        }}>
            <Tabs.Screen name="index" options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.home} title="Home" />
                )
            }} />

            <Tabs.Screen name="search" options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.search} title="Search" />
                )
            }} />

            <Tabs.Screen name="saved" options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.save} title="Saved" />
                )
            }} />

            <Tabs.Screen name="profile" options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon focused={focused} icon={icons.person} title="Profile" />
                )
            }} />
        </Tabs>
    )
}
