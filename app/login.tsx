import { View } from "react-native";
import React, { Component } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";

import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';

import { signIn, signUp } from 'aws-amplify/auth';

import { Input, Text, Layout, Button, Icon, IconElement, CheckBox } from "@ui-kitten/components";



export default class Login extends React.Component{
  
render(): React.ReactNode {
  return (
    <GestureHandlerRootView>

<Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <View style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>

        <Input placeholder="Email" status="primary" style={styles.textInputEmail}></Input>

        <Input secureTextEntry placeholder="Password" status="primary" style={styles.textInputPassword}></Input>

        <CheckBox checked style={styles.chkRememberMe}>Remember Me</CheckBox>

        <Button style={styles.btnLogin}>Login</Button>

        <Button appearance="outline" style={styles.btnSignup}>Signup</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

  
}
