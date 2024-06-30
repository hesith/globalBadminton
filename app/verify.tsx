import { View } from "react-native";
import React, { useState } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";


import { Input, Text, Layout, Button, Icon, IconElement, CheckBox } from "@ui-kitten/components";

import { confirmSignUp } from 'aws-amplify/auth';


const Verify = ({navigation, route}: {navigation: any, route: any}) => {
  
  const password = route.params?.password;
  const [username, setUsername] = useState(route.params?.username);
  const [confirmationCode, setconfirmationCode] = useState('');
  const [isConfirmationCodeValid, setIsConfirmationCodeValid] = useState<any>(null);


//#region Icons
const CrossIcon = (): IconElement => (
  <Icon
    fill="#DE4637"
    name='close-circle-outline'
    style = {styles.labelLoginIcon}
  />
);
const CheckIcon = (): IconElement => (
  <Icon
    fill='#B6D93A'
    name='checkmark-circle-2'
    style = {styles.labelLoginIcon}
  />
);
//#endregion

  const renderVeificationCodeCaption = () => {
    if(isConfirmationCodeValid == false){
      return(
        <Layout style={styles.labelLogin}>
        <Text status="danger" category="p2">Verification Code invalid</Text>
          <Button
          appearance='ghost'
          accessoryRight={CrossIcon}  
        />
        </Layout>
        )
    }else if(isConfirmationCodeValid == true){
      return (
        <Layout style={styles.labelLogin}>
        <Text status="success" category="p2">Verified</Text>
          <Button
          appearance='ghost'
          accessoryRight={CheckIcon}  
        />
        </Layout>
        );
    }
    
    else{
      return(<></>)
    }
  };

  const VerifyPress = async (data:any) => {
    try{

      const {username, confirmationCode} = data;

      const response = await confirmSignUp({
        username, 
        confirmationCode
      });
      
      if(await response.isSignUpComplete)
      {
        setIsConfirmationCodeValid(true);
        navigation.navigate("Login", {username, password})
      }

    }catch (e: any){
      if(e.toString().split(':')[0]?.trim() == "CodeMismatchException"){
        setIsConfirmationCodeValid(false);
      }
      console.log(e.toString());

    }

  }


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
      <Text style={styles.h1} category="h1">Verify</Text>     

        <Input style={styles.textInputLogin} placeholder="Username" value={route.params?.username} status="primary" onChangeText={newText => setUsername(newText)} ></Input>
        <Input style={styles.textInputLogin} placeholder="Verification Code" caption={renderVeificationCodeCaption} status="primary" onChangeText={newText => {setconfirmationCode(newText); setIsConfirmationCodeValid(null)}} ></Input>

        <Button style={styles.btnLogin} onPress={()=>{VerifyPress({username, confirmationCode})}}>Verify</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default Verify;
