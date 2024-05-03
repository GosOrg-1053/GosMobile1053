import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageManager{
    async saveData(key, value){
        AsyncStorage.setItem(key, value);
        console.log("saved")
    }
    async getData(key){
        const data = await AsyncStorage.getItem(key);
        return data
    }
}

export default new StorageManager()