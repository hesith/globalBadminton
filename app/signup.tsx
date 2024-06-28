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


const Signup = () => {

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

      <View style={styles.viewFlexColumn}>

        <Text category="h1">Sign up</Text>

        <Input style={styles.textInputLogin} placeholder="First Name" status="primary" ></Input>
        <Input style={styles.textInputLogin} placeholder="Last Name" status="primary" ></Input>
        <Input style={styles.textInputLogin} placeholder="Email" status="primary" ></Input>
        <Input style={styles.textInputLogin} placeholder="Password" status="primary" secureTextEntry></Input>
        <Input style={styles.textInputLogin} placeholder="ConfirmPassword" status="primary" secureTextEntry></Input>

     

        <Button style={styles.btnSignup} >Signup</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default Signup;
