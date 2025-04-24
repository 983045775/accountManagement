import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key: string, value: string) => {
    console.log(value);
    return await AsyncStorage.setItem(key, value);
};

export const removeData = async (key: string) => {
    return await AsyncStorage.removeItem(key);
};
export const getData = async (key: string) => {
    return await AsyncStorage.getItem(key);
};
