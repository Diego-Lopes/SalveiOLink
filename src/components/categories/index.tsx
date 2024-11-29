import { categories } from "@/utils/categories";
import { FlatList } from "react-native";
import { Category } from "../category";
import { styles } from "./styles";

export function Categories() {
  return (
    <FlatList
      data={categories}
      keyExtractor={(category) => category.id}
      renderItem={({ item }) => (
        <Category name={item.name} icon={item.icon} isSelected={false} />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content} //estilizando o conteúdo da flatlist
      showsHorizontalScrollIndicator={false}
    />
  )
}