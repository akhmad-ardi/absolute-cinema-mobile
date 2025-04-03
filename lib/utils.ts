import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = 'token';
const EXPIRY_KEY = 'expire_token'
const EXPIRY_TIME =  24 * 60 * 60 * 1000; // Waktu sekarang + 1 hari

export async function createToken(token: string) {
  try {
    const expiryTime = Date.now() + EXPIRY_TIME;

    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      [EXPIRY_KEY, expiryTime.toString()],
    ]);
  } catch (error) {
    console.error('Gagal menyimpan token:', error);
  }
}

export async function removeToken() {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, EXPIRY_KEY]);
  } catch (error) {
    console.error('Gagal menghapus token:', error);
  }
}

export async function getToken() {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const expiryTime = await AsyncStorage.getItem(EXPIRY_KEY);

    if (!token || !expiryTime) return null;

    if (Date.now() > parseInt(expiryTime)) {
      await removeToken();
      return null;
    }

    return token;
  } catch (error) {
    console.error('Gagal mengambil token:', error);
    return null;
  }
}