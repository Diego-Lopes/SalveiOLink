import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

interface OptionProps extends TouchableOpacityProps {
  name: string
  icon: keyof typeof MaterialIcons.glyphMap
  variant?: 'primary' | 'secundary'
}

export function Option({ icon, name, variant = 'primary', ...rest }: OptionProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <MaterialIcons 
        name={icon} 
        size={20} 
        color={variant === 'primary' ? colors.green[300] : colors.gray[400]} 
      />

      <Text style={variant === 'primary' ? styles.primaryTitle : styles.secundaryTitle}>{name}</Text>

    </TouchableOpacity>
  )
}