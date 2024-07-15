import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from 'aws-amplify/auth';
import { USERNAME } from '../ShareResources/lang_resources';

  export const setAccessToken = async () => {
    try {
      getCurrentUser().then(user => {

        const token = 'username#' + user.username + 'userId' + user.userId;

        AsyncStorage.setItem(
          'access_token',
          token,
        );
      }, 
      err=> {
        console.log(err);
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  export const getAccessToken = async () => {
    try {
      return (await AsyncStorage.getItem(
        'access_token'
      ));
    } catch (error) {
      console.log(error);
    }
  };

