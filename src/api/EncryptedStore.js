import EncryptedStorage from 'react-native-encrypted-storage';

export default class EncryptedStorageManager {
  async setAuthCode(value) {
    try {
      await EncryptedStorage.setItem('authCode', value);
    } catch (error) {
      console.log('Error while adding AuthCode to encrypted storage', error);
    }
  }

  async getAuthCode() {
    try {
      return await EncryptedStorage.getItem('authCode');
    } catch (error) {
      console.log(
        'Error while retrieving AuthCode from encrypted storage',
        error,
      );
    }
  }
  async removeAuthCode() {
    try {
      return await EncryptedStorage.removeItem('authCode');
    } catch (error) {
      console.log(
        'Error while removing AuthCode from encrypted storage',
        error,
      );
    }
  }
}
