import { View, BackHandler } from "react-native";
import React, { useState, useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { FORGOT_PASSWORD_QuestionMark, LOGIN, PASSWORD, REMEMBER_ME, SIGNUP, USERNAME} from "../app/ShareResources/lang_resources";
import { Input, Text, Layout, Button, CheckBox, Avatar } from "@ui-kitten/components";


//#region LANGUAGE
const lang_id = "en";
const txtFORGOT_PASSWORD = FORGOT_PASSWORD_QuestionMark(lang_id);
const txtLOGIN = LOGIN(lang_id);
const txtPASSWORD = PASSWORD(lang_id);
const txtREMEMBER_ME = REMEMBER_ME(lang_id);
const txtSIGNUP = SIGNUP(lang_id);
const txtUSERNAME = USERNAME(lang_id);
//#endregion



const Login = ({navigation, route}: {navigation: any, route: any}) => {

  //#region BackHandler
   useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //#endregion

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

        <Avatar style={styles.logoLogin} size="large" shape="square" source={require('../assets/images/logo.png')}/>

        <Input style={styles.textInputLogin} placeholder={txtUSERNAME} status="primary" value={route.params?.username} onChangeText={newText => setUsername(newText)} ></Input>
        <Input style={styles.textInputLogin} placeholder={txtPASSWORD} status="primary" value={route.params?.password} onChangeText={newText => setPassword(newText)} secureTextEntry></Input>

        <View style={styles.viewFlexRow}>
            <CheckBox checked>{txtREMEMBER_ME}</CheckBox>
            <Text status="primary">{txtFORGOT_PASSWORD}</Text>
        </View>

        <Button style={styles.btnLogin}>{txtLOGIN}</Button>
        <Button style={styles.btnSignup} appearance="outline" onPress={()=>{navigation.navigate('Signup')}}>{txtSIGNUP}</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default Login;
