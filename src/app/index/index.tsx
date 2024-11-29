import { Categories } from '@/components/categories'
import { Link } from '@/components/link'
import { Option } from '@/components/option'
import { colors } from '@/styles/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/logo.png')} style={styles.logo} />
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons name='add' size={32} color={colors.green[300]} />
        </TouchableOpacity>
      </View>
      <Categories />


      <FlatList 
        data={['1', '2', '3', '4', '5']}
        keyExtractor={item => item}
        renderItem={({ item }) => <Link name='Diego dev' url='https://diegodev.com.br' onDetails={() => console.log('clicou')} />}
        style={styles.links}
        contentContainerStyle={styles.linksContent}
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={true}>
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

