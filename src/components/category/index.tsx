import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";

interface CategoryProps extends PressableProps{
  name: string;
  isSelected?: boolean
  icon: keyof typeof MaterialIcons.glyphMap
}
export function Category({ icon, name, isSelected, ...rest }: CategoryProps) {
  
  const color = isSelected ? colors.green[300] : colors.gray[400]
  
  return (
    <Pressable style={styles.container} {...rest}>
      <MaterialIcons name={icon} size={16} color={color} />
      <Text style={[styles.name, { color }]}>{name}</Text>
    </Pressable>
  )
}