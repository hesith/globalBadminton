import { View } from "react-native";
import React, { useState } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { Input, Text, Layout, Button, Icon, IconElement } from "@ui-kitten/components";
import { confirmSignUp } from 'aws-amplify/auth';
import { USERNAME, VERIFICATION_CODE, VERIFICATION_CODE_INVALID, VERIFIED, VERIFY } from "../app/ShareResources/lang_resources";


//#region LANGUAGE
const lang_id = "en";
const txtUSERNAME = USERNAME(lang_id);
const txtVERIFIED = VERIFIED(lang_id);
const txtVERIFY = VERIFY(lang_id);
const txtVERIFICATION_CODE = VERIFICATION_CODE(lang_id);
const txtVERIFICATION_CODE_INVALID = VERIFICATION_CODE_INVALID(lang_id);
//#endregion

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
        <Text status="danger" category="p2">{txtVERIFICATION_CODE_INVALID}</Text>
          <Button
          appearance='ghost'
          accessoryRight={CrossIcon}  
        />
        </Layout>
        )
    }else if(isConfirmationCodeValid == true){
      return (
        <Layout style={styles.labelLogin}>
        <Text status="success" category="p2">{txtVERIFIED}</Text>
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
      <Text style={styles.h1} category="h1">{txtVERIFY}</Text>     

        <Input style={styles.textInputLogin} placeholder={txtUSERNAME} value={route.params?.username} status="primary" onChangeText={newText => setUsername(newText)} ></Input>
        <Input style={styles.textInputLogin} placeholder={txtVERIFICATION_CODE} caption={renderVeificationCodeCaption} status="primary" onChangeText={newText => {setconfirmationCode(newText); setIsConfirmationCodeValid(null)}} ></Input>

        <Button style={styles.btnLogin} onPress={()=>{VerifyPress({username, confirmationCode})}}>{txtVERIFY}</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default Verify;
