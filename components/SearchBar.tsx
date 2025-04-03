import { View, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

type Props = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void
  onPress?: () => void
}

export default function SearchBar({ placeholder, onPress, value, onChangeText }: Props) {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className="size-5" resizeMode='contain' tintColor='#AB8BFF' />
    
        <TextInput 
            onPress={onPress} 
            value={value} 
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor='#A8B5DB'
            className='flex-1 ml-2 text-white'
        />
    </View>
  )
}