import { View } from "react-native";
import React, { Component } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";


import { Input, Text, Layout, Button, Icon, IconElement, CheckBox } from "@ui-kitten/components";


const Login = ({navigation}: {navigation: any}) => {

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

        <Input style={styles.textInputLogin} placeholder="Email" status="primary" ></Input>
        <Input style={styles.textInputLogin} placeholder="Password" status="primary" secureTextEntry></Input>

        <View style={styles.viewFlexRow}>
            <CheckBox checked>Remember Me</CheckBox>
            <Text status="primary">Forgot Password?</Text>
        </View>

        <Button style={styles.btnLogin}>Login</Button>
        <Button style={styles.btnSignup} appearance="outline" onPress={()=>{navigation.navigate('Signup')}}>Signup</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default Login;
