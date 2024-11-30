import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'
import { LinkStorage, linkStorage } from '@/storage/link-storage'
import { colors } from '@/styles/colors'
import { categories } from '@/utils/categories'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

export default function Index() {
  const [category, setCategory] = useState<string>(categories[0].name)
  const [links, setLinks] = useState<LinkStorage[]>([])
  async function getLinks() {
    try {
      const response = await linkStorage.get()
      setLinks(response)
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel carregar os links.')
    }
  }

  useEffect(() => {
    getLinks()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/logo.png')} style={styles.logo} />
        <TouchableOpacity activeOpacity={0.5} onPress={() => router.navigate("/add")}>
          <MaterialIcons name='add' size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>
      <Categories onChange={setCategory} selected={category}/>


      <FlatList 
        data={links}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Link 
            name={item.name} 
            url={item.url}
            onDetails={() => console.log('clicou')} 
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={false}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalcategory}>Curso</Text>
              <TouchableOpacity>
                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLinkName}>
              Diego dev
            </Text>
            <Text style={styles.modalUrl}>
              https://diegodev.com.br/
            </Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant='secundary'/>
              <Option name="Abrir" icon="language" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

