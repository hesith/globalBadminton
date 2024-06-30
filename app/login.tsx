import { View } from "react-native";
import React, { useState } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";


import { Input, Text, Layout, Button, Icon, IconElement, CheckBox } from "@ui-kitten/components";


const Login = ({navigation, route}: {navigation: any, route: any}) => {

  const [username, setUsername] = useState(route.params?.username.trim() != "" ? route.params?.username : "");
  const [password, setPassword] = useState(route.params?.password.trim() != "" ? route.params?.password : "");


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

        <Input style={styles.textInputLogin} placeholder="Username" status="primary" value={route.params?.username} onChangeText={newText => setUsername(newText)} ></Input>
        <Input style={styles.textInputLogin} placeholder="Password" status="primary" value={route.params?.password} onChangeText={newText => setPassword(newText)} secureTextEntry></Input>

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
