import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'
import { LinkStorage, linkStorage } from '@/storage/link-storage'
import { colors } from '@/styles/colors'
import { categories } from '@/utils/categories'
import { MaterialIcons } from '@expo/vector-icons'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert, FlatList, Image, Linking, Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

export default function Index() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [category, setCategory] = useState<string>(categories[0].name)
  const [links, setLinks] = useState<LinkStorage[]>([])
  const [link, setLink] = useState<LinkStorage>({} as LinkStorage)
  async function getLinks() {
    try {
      const response = await linkStorage.get()

      const filtered = response.filter((link) => link.category === category)

      setLinks(filtered)
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel carregar os links.')
    }
  }

  function handleDetails(selected: LinkStorage) {
    setShowModal(true)
    setLink(selected)
  }

  async function handleDelete() {
    try {
      Alert.alert('Excluir', 'Deseja realmente excluir esse link?', [
        {
        style: 'default',
        text: 'Sim',
        onPress: async () => {
          await linkStorage.remove(link.id)
          getLinks()
          setShowModal(false)
        }
      },
      {
        style: 'cancel',
        text: 'Nao',
        onPress: () => setShowModal(false)
      }
      ])
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel excluir.')
    }
  }

  async function handleOpenLink() {
    try {
      await Linking.openURL(link.url)
      setShowModal(false)
    } catch (error) {
      Alert.alert('Link', 'Nao foi possivel abrir o link.')
    }
  }

  useFocusEffect(useCallback(() => {
    //useFocusEffect e uma funcao que fica ouvindo o estado da tela
    getLinks()
  }, [category]))

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
            onDetails={() => handleDetails(item)}  
          />
        )}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent animationType='slide' visible={showModal}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalcategory}>{link.category}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialIcons name="close" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalLinkName}>
              {link.name}
            </Text>
            <Text style={styles.modalUrl}>
              {link.url}
            </Text>

            <View style={styles.modalFooter}>
              <Option name="Excluir" icon="delete" variant='secundary' onPress={handleDelete} />
              <Option name="Abrir" icon="language" onPress={handleOpenLink}/>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

