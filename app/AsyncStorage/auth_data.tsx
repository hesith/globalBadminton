import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from 'aws-amplify/auth';

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





