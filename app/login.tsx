import { Text, View } from "react-native";
import React, { Component } from 'react';
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { styles } from "../styles/styles";

import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';

export default class Login extends React.Component{

render(): React.ReactNode {
  return (
    <GestureHandlerRootView>

    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Global Badminton</Text>

      <View
        style={{
          flexDirection: 'row'
        }}>
        <Text>E-mail :</Text>
        <TextInput style={styles.textInputEmail}></TextInput>
      </View>

     
    </View>

    </GestureHandlerRootView>

  );
}
  
}
