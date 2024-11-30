import { categories } from "@/utils/categories";
import { FlatList } from "react-native";
import { Category } from "../category";
import { styles } from "./styles";

type CategoryProps = {
  selected: string
  onChange: (category: string) => void
}

export function Categories({ selected, onChange }: CategoryProps) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(category) => category.id}
      renderItem={({ item }) => (
        <Category 
          name={item.name} 
          icon={item.icon} 
          isSelected={item.name === selected} 
          onPress={() => onChange(item.name)}  
        />
          
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content} //estilizando o conteúdo da flatlist
      showsHorizontalScrollIndicator={false}
    />
  )
}