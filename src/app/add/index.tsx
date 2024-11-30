import { Button } from "@/components/button";
import { Categories } from "@/components/categories";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function Add() {
  const [ name, setName ] = useState<string>("")
  const [url, setUrl] = useState<string>("")

  function handleAdd() {

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

      <Categories />

      <View style={styles.form}>
        <Input placeholder="Nome" onChangeText={setName} autoCorrect={false}/>
        <Input placeholder="Url" onChangeText={setUrl} autoCorrect={false}/>
        <Button title="Adicionar" activeOpacity={0.7} onPress={handleAdd}/>
      </View>
    </View>
  )
}