import { View, BackHandler, Alert } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../../../styles/styles";
import { Input, Text, Layout, Button, Icon, IconElement, Spinner } from "@ui-kitten/components";
import { confirmResetPassword } from 'aws-amplify/auth';
import { ATTEMPT_LIMIT_EXCEEDED, CONFIRM_PASSWORD, DOES_NOT_MATCH, MATCH, OK, PASSWORD, PASSWORD_Colon_STRONG, PASSWORD_Colon_WEAK, PASSWORD_RESET_SUCCESSFUL_Fullstop, PASSWORD_RESET_UNSUCCESSFUL_Fullstop, PLEASE_TRY_AGAIN_AFTER_SOME_TIME_FullStop, RESET, RESET_PASSWORD, USERNAME, VERIFICATION_CODE, VERIFICATION_CODE_INVALID, VERIFIED } from "../../ShareResources/lang_resources";

const regExVerficationCode = /^\d{0,6}$/;

const ResetPassword = ({navigation, route}: {navigation: any, route: any}) => {
  //#region LANGUAGE
  const[lang_id, setLanguageId] = useState(global.lang_id);
  const txtATTEMPT_LIMIT_EXCEEDED = ATTEMPT_LIMIT_EXCEEDED(lang_id);
  const txtCONFIRM_PASSWORD = CONFIRM_PASSWORD(lang_id);
  const txtDOES_NOT_MATCH = DOES_NOT_MATCH(lang_id);
  const txtMATCH = MATCH(lang_id);
  const txtOK = OK(lang_id);
  const txtPASSWORD = PASSWORD(lang_id);
  const txtPASSWORD_RESET_SUCCESSFUL = PASSWORD_RESET_SUCCESSFUL_Fullstop(lang_id);
  const txtPASSWORD_RESET_UNSUCCESSFUL = PASSWORD_RESET_UNSUCCESSFUL_Fullstop(lang_id);
  const txtPASSWORD_STRONG = PASSWORD_Colon_STRONG(lang_id);
  const txtPASSWORD_WEAK = PASSWORD_Colon_WEAK(lang_id);
  const txtPLEASE_TRY_AGAIN_AFTER_SOME_TIME = PLEASE_TRY_AGAIN_AFTER_SOME_TIME_FullStop(lang_id);
  const txtRESET = RESET(lang_id);
  const txtRESET_PASSWORD = RESET_PASSWORD(lang_id);
  const txtUSERNAME = USERNAME(lang_id);
  const txtVERIFIED = VERIFIED(lang_id);
  const txtVERIFICATION_CODE = VERIFICATION_CODE(lang_id);
  const txtVERIFICATION_CODE_INVALID = VERIFICATION_CODE_INVALID(lang_id);
  //#endregion
  
  //#region BackHandler
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //#endregion

  const [isResetButtonClicked, setIsResetButtonClicked] = useState(false);
  const [isConfirmationCodeValid, setIsConfirmationCodeValid] = useState<any>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  //#region Input States
  const [username, setUsername] = useState(route.params?.username);
  const [confirmationCode, setConfirmationCode] = useState('');
  //#endregion

//#region References
const usernameFocusRef = useRef<any>(null);
const confirmationCodeFocusRef = useRef<any>(null);
const passwordFocusRef = useRef<any>(null);
const confPasswordFocusRef = useRef<any>(null);
//#endregion

//#region Icons & Accessories
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
const LoadingIndicator = (props: any): React.ReactElement => isResetButtonClicked? (
  <View style={[props.style, styles.indicator]}>
<Spinner status="control" size='large' />
</View> 
) : <></>;
//#endregion

//#region Caption
  const renderVeificationCodeCaption = () => {
    if(isConfirmationCodeValid == false && !isResetButtonClicked){
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

  const renderPasswordCaption = () => {
    if(!isResetButtonClicked){
      if(newPassword.length < 8 && newPassword.length > 0){
        return(
          <Layout style={styles.labelLogin}>
          <Text status="danger" category="p2">{txtPASSWORD_WEAK}</Text>
            <Button
            appearance='ghost'
            accessoryRight={CrossIcon}  
          />
          </Layout>
          )
      }
      else if(newPassword.length > 7)
        {
        return (
          <Layout style={styles.labelLogin}>
          <Text status="success" category="p2">{txtPASSWORD_STRONG}</Text>
            <Button
            appearance='ghost'
            accessoryRight={CheckIcon}  
          />
          </Layout>
          );
      }else{
        return(<></>);
      }
    }else{
      return(<></>);
    } 
  
  };

  const renderConfirmPasswordCaption = () => {
    if(!isResetButtonClicked){
    if(confirmPassword != newPassword && confirmPassword.length > 0){
      return(
        <Layout style={styles.labelLogin}>
        <Text status="danger" category="p2">{txtDOES_NOT_MATCH}</Text>
          <Button
          appearance='ghost'
          accessoryRight={CrossIcon}  
        />
        </Layout>
        )
    }else if(confirmPassword === newPassword && confirmPassword.length > 0)
      {
      return (
        <Layout style={styles.labelLogin}>
        <Text status="success" category="p2">{txtMATCH}</Text>
          <Button
          appearance='ghost'
          accessoryRight={CheckIcon}  
        />
        </Layout>
        );
    }else{
      return(<></>)
    }
  }else{
    return(<></>)
  }
};
//#endregion Caption

const onVerificationCodeChanged = (text: string) => {
  try
  {
    setIsConfirmationCodeValid(null);

    if(regExVerficationCode.test(text.trim()) == true)
      {
        setConfirmationCode(text.trim());
      }
  }
  catch (e : any)
  {
    console.log(e.toString());
  }
};

  const VerifyPress = async (data:any) => {
    try{
      setIsResetButtonClicked(true);

      const {username, confirmationCode, newPassword} = data;

      if(username.trim() == ""){
        usernameFocusRef.current?.focus();
        setIsResetButtonClicked(false);
        return;
      }
      if(confirmationCode.trim() == "")
      {
        confirmationCodeFocusRef.current?.focus();
        setIsResetButtonClicked(false);
        return;
      }
      if(newPassword.trim() == ""){
        passwordFocusRef.current?.focus();
        setIsResetButtonClicked(false);
        return;
      }else if(newPassword.length < 8){
        passwordFocusRef.current?.focus();
        setIsResetButtonClicked(false);
        return;
      }
      if(confirmPassword.trim() == ""){
        confPasswordFocusRef.current?.focus();
        setIsResetButtonClicked(false);
        return;
      }else if (confirmPassword != newPassword){
        confPasswordFocusRef.current?.focus();
        setIsResetButtonClicked(false);
        return;
      }

      const response = await confirmResetPassword({
        username,
        confirmationCode,
        newPassword
      }).then(() => {

        setIsConfirmationCodeValid(true);
        setIsResetButtonClicked(false);

        Alert.alert("", txtPASSWORD_RESET_SUCCESSFUL, [
          {
            text: txtOK,
            onPress: () => navigation.navigate("Login"),
            style: 'cancel',
          }
        ]);

        

      },(failed) => {
        
        if(failed.toString().split(':')[0]?.trim() == "CodeMismatchException")
        {
          setIsConfirmationCodeValid(false);
          setIsResetButtonClicked(false);
        }
        else if((failed.toString()).startsWith("LimitExceededException"))
          {
            setIsConfirmationCodeValid(true);
            setIsResetButtonClicked(false);
    
              Alert.alert(txtATTEMPT_LIMIT_EXCEEDED, txtPLEASE_TRY_AGAIN_AFTER_SOME_TIME, [
                {
                  text: txtOK,
                  onPress: () => null,
                  style: 'cancel',
                }
              ]);
          }
        else
        {
          setIsConfirmationCodeValid(true);
          setIsResetButtonClicked(false);
  
          Alert.alert("", txtPASSWORD_RESET_UNSUCCESSFUL + " " + txtPLEASE_TRY_AGAIN_AFTER_SOME_TIME, [
            {
              text: txtOK,
              onPress: () => null,
              style: 'cancel',
            }
          ]);
        }


      });
      

    }catch (e: any){
      if(e.toString().split(':')[0]?.trim() == "CodeMismatchException"){
        setIsConfirmationCodeValid(false);
        setIsResetButtonClicked(false);
      }
      else if(e.toString().split(':')[0]?.trim() == "LimitExceededException"){
        setIsConfirmationCodeValid(false);
        setIsResetButtonClicked(false);
      }
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
      <Text style={styles.h1} category="h1">{txtRESET_PASSWORD}</Text>     

        <Input style={styles.textInputLogin} placeholder={txtUSERNAME} disabled={true} value={route.params?.username} status="primary" onChangeText={newText => setUsername(newText)} ref={usernameFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder={txtVERIFICATION_CODE} maxLength={6} caption={renderVeificationCodeCaption} status="primary" onChangeText={newText => {onVerificationCodeChanged(newText); }} value={confirmationCode} ref={confirmationCodeFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder={txtPASSWORD} status="primary" caption={renderPasswordCaption} onChangeText={newText => {setNewPassword(newText); setIsResetButtonClicked(false);}} ref={passwordFocusRef} secureTextEntry></Input>
        <Input style={styles.textInputLogin} placeholder={txtCONFIRM_PASSWORD} status="primary" caption={renderConfirmPasswordCaption} onChangeText={newText => setConfirmPassword(newText)} ref={confPasswordFocusRef} secureTextEntry></Input>

        <Button style={styles.btnLogin} accessoryRight={LoadingIndicator} onPress={()=>{VerifyPress({username, confirmationCode, newPassword})}} >{txtRESET}</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default ResetPassword;
