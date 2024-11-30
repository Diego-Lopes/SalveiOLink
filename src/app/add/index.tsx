import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { linkStorage } from "@/storage/link-storage";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function Add() {
  const [ name, setName ] = useState<string>("")
  const [url, setUrl] = useState<string>("")
  const [category, setCategory] = useState<string>("")

  async function handleAdd() {
    try {
      if (!category) {
        return Alert.alert('Categoria', 'Selecione uma categoria.')
      }
      if (!name.trim()) {
        return Alert.alert('Nome', 'Informe o nome.')
      }
      if(!url.trim()) {
        return Alert.alert('Url', 'Informe a url.')
      }
      
      await linkStorage.set({
        id: new Date().getTime().toString(),
        name,
        url,
        category,
      })

      //const data = await linkStorage.get()

    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel adicionar o link.')
      console.log(error);
      
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back-ios" size={32} color={colors.gray[200]} />
        </TouchableOpacity>

        <Text style={styles.title}>Novo</Text>
      </View>

      <Text style={styles.label}>
        Selecione uma categoria
      </Text>

      <Categories onChange={setCategory} selected={category}/>

      <View style={styles.form}>
        <Input 
          placeholder="Nome" 
          onChangeText={setName} 
          autoCorrect={false}
        />
        <Input 
          placeholder="Url" 
          onChangeText={setUrl} 
          autoCorrect={false} 
          autoCapitalize="none"
        />
        
        <Button title="Adicionar" activeOpacity={0.7} onPress={handleAdd}/>
      </View>
    </View>
  )
}