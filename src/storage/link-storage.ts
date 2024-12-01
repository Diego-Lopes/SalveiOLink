import AsyncStorage from "@react-native-async-storage/async-storage"

const LINKS_STORAGE_KEY = 'links-storage'

export type LinkStorage = {
  id: string
  name: string
  url: string
  category: string
}

async function get(): Promise<LinkStorage[]> {
  //recupera as informações do storage
  const storage = await AsyncStorage.getItem(LINKS_STORAGE_KEY)
  const response = storage ? JSON.parse(storage) : []

  return response
}

async function save(newLink: LinkStorage) {
  //salva as informações no storage
  try {
    const storage = await get()

    const hasLink = storage.find((link: LinkStorage) => link.id === newLink.id)

    if (hasLink) {
      throw new Error('Ja existe um link com esse id')
    }

    storage.push(newLink)
    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(storage))
  } catch (error) {
    throw error
  }
}

async function remove(id: string) {
  try {
    const storage = await get()
    const filtered = storage.filter((link: LinkStorage) => link.id !== id)
    await AsyncStorage.setItem(LINKS_STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    throw error
  }
}

export const linkStorage = { get, save, remove }