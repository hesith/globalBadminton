import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLangId = async (lang_id : string) => {
    try {
      await AsyncStorage.setItem(
        'lang_id',
        lang_id,
      );
    } catch (error) {
      console.log(error);
    }
  };

export const getLangId = async () => {
    try {
      return (await AsyncStorage.getItem(
        'lang_id'
      ));
    } catch (error) {
      console.log(error);
    }
  };