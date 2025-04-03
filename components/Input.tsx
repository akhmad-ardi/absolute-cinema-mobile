import { TextInput, View } from "react-native"

type Props = {
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  disabled?: boolean;
}

export default function Input({ value, onChangeText, placeholder, disabled = true, secureTextEntry = false }: Props) {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-xl px-3 py-2'>    
      <TextInput 
        secureTextEntry={secureTextEntry}
        value={value} 
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#A8B5DB'
        className='flex-1 ml-2 text-white'
        editable={disabled}
      />
    </View>
  )
}