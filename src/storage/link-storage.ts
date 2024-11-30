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

async function set(newLink: LinkStorage) {
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

export const linkStorage = { get, set }