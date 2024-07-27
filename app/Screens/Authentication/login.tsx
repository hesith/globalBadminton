import { View, BackHandler, Alert } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../../../styles/styles";
import { ATTEMPT_LIMIT_EXCEEDED, ENGLISH_inEnglish, FORGOT_PASSWORD_QuestionMark, HAS_BEEN_SET_FullStop, INVALID_USERNAME_OR_PASSWORD, LOGIN, OK, PASSWORD, PLEASE_ENTER_USERNAME_CORRECTLY_FullStop, PLEASE_RESTART_THE_APPLICATION_FullStop, PLEASE_TRY_AGAIN_AFTER_SOME_TIME_FullStop, REMEMBER_ME, SIGNUP, SINHALA_inSinhala, USER_NOT_FOUND, USERNAME, USERNAME_CAN_NOT_BE_EMPTY_Fullstop} from "../../ShareResources/lang_resources";
import { Input, Text, Layout, Button, CheckBox, Avatar, Icon, IconElement, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import * as UserSettings from '../../AsyncStorage/user_settings';

import { resetPassword, signIn } from 'aws-amplify/auth';

//#region Icons & Accessories
const CrossIcon = (): IconElement => (
  <Icon
    fill="#DE4637"
    name='close-circle-outline'
    style = {styles.labelLoginIcon}
  />
);
const TextIcon = (): IconElement => (
  <Icon
    fill="black"
    name='text'
    style = {styles.settingIconLogin}
  />
);
const CheckIcon = (isSelected: boolean): IconElement => ( isSelected?
  <Icon
    fill="#7900D2"
    name='checkmark'
    style = {styles.labelLoginIcon2}
  /> : <></>
);
const CheckIconGeneral = (): IconElement => (
  <Icon
    fill='#B6D93A'
    name='checkmark-circle-2'
    style = {styles.labelLoginIcon}
  />
);
//#endregion

const regExUsername = /\s/g;

const Login = ({navigation, route}: {navigation: any, route: any}) => {

  //#region LANGUAGE
  const[lang_id, setLanguageId] = useState(global.lang_id);
  const txtATTEMPT_LIMIT_EXCEEDED = ATTEMPT_LIMIT_EXCEEDED(lang_id);
  const txtENGLISH = ENGLISH_inEnglish(lang_id);
  const txtFORGOT_PASSWORD = FORGOT_PASSWORD_QuestionMark(lang_id);
  const txtHAS_BEEN_SET = HAS_BEEN_SET_FullStop(lang_id);
  const txtINVALID_USERNAME_OR_PASSWORD = INVALID_USERNAME_OR_PASSWORD(lang_id);
  const txtLOGIN = LOGIN(lang_id);
  const txtOK = OK(lang_id);
  const txtPASSWORD = PASSWORD(lang_id);
  const txtPLEASE_ENTER_USERNAME_CORRECTLY = PLEASE_ENTER_USERNAME_CORRECTLY_FullStop(lang_id);
  const txtPLEASE_RESTART_THE_APPLICATION = PLEASE_RESTART_THE_APPLICATION_FullStop(lang_id);
  const txtPLEASE_TRY_AGAIN_AFTER_SOME_TIME = PLEASE_TRY_AGAIN_AFTER_SOME_TIME_FullStop(lang_id);
  const txtREMEMBER_ME = REMEMBER_ME(lang_id);
  const txtSIGNUP = SIGNUP(lang_id);
  const txtSINHALA = SINHALA_inSinhala(lang_id);
  const txtUSERNAME = USERNAME(lang_id);
  const txtUSERNAME_CAN_NOT_BE_EMPTY = USERNAME_CAN_NOT_BE_EMPTY_Fullstop(lang_id);
  const txtUSER_NOT_FOUND = USER_NOT_FOUND(lang_id);
  //#endregion

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

  //#region Get Saved language
  const GetSavedLanguage = (lang_setting : string) => {
    switch (lang_setting){
        case "en":
          return 0;
        case "si":
          return 1;
        default:
          return 0;
    }
  }
  //#endregion
  

  const routedUsername = route.params?.username;
  const routedPassword = route.params?.password;

  //#region Input States
  const [username, setUsername] = useState(routedUsername != undefined ? routedUsername : "");
  const [password, setPassword] = useState(routedPassword != undefined ? routedPassword : "");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [shouldUseRoutedUsername, setShouldUseRoutedUsername] = useState(true);
  const [shouldUseRoutedPasswpord, setShouldUseRoutedPassword] = useState(true);
  const [selectedLang, setSelectedLang] = useState<IndexPath | IndexPath[]>(new IndexPath(GetSavedLanguage(global.lang_id)));
  //#endregion

  const [isLoginButtonClicked, setIsLoginButtonClicked] = useState(false);
  const [isUsernameOrPasswordValid, setIsUsernameOrPasswordValid] = useState<any>(null);

  //#region References
  const languageFocusRef = useRef<any>(null); 
  const usernameFocusRef = useRef<any>(null);
  const passwordFocusRef = useRef<any>(null);
  //#endregion

//#region Language Setting
  const SettingButtonPressed = () => {
    languageFocusRef.current?.focus();
  }

  const LanguageSelected = (index: any) => {
    try
    {
      setSelectedLang(index);
      UserSettings.setLangId(MapLangId(index));
      Alert.alert(`${ MapLangId(index, true) } ${txtHAS_BEEN_SET}`, txtPLEASE_RESTART_THE_APPLICATION, [
        {
          text: txtOK,
          onPress: () => null,
          style: 'cancel',
        }
      ]);
    }
    catch (e: any)
    {
      console.log(e.toString());
    }
  }

  const MapLangId = (index: IndexPath | IndexPath[], isVisualRepresentaionOnly = false) => {
    let langId;
    switch ((index as IndexPath).row){
      case 0:
         if(isVisualRepresentaionOnly)
         {
            langId = txtENGLISH
         }else{
            langId = "en"
         }
         break;
      case 1:
          if(isVisualRepresentaionOnly)
          {
            langId = txtSINHALA
          }else{
            langId = "si"
          }
          break;
      default:
          if(isVisualRepresentaionOnly)
          {
            langId = txtENGLISH
          }else{
            langId = "en"
          }
          break;
    }
    return langId;
}
//#endregion

//#region Captions
const renderUsernamePasswordCaption = () => {
    if(isLoginButtonClicked && !isUsernameOrPasswordValid){
      return(
        <Layout style={styles.labelLogin}>
        <Text status="danger" category="p2">{txtINVALID_USERNAME_OR_PASSWORD}</Text>
          <Button
          appearance='ghost'
          accessoryRight={CrossIcon}  
        />
        </Layout>
        )
    }
    else{
      return(<></>);
    }
};
//#endregion

  const LoginPress = async (data: any) => {
    try
    {
      setIsLoginButtonClicked(true);

      var {username, password} = data; 

      //#region Validations
      if(username?.trim() == ""){
        usernameFocusRef.current?.focus();
        return;
      }else if(regExUsername.test(username?.trim()) === true){
        usernameFocusRef.current?.focus();
        return;
      }
      if(password?.trim() == ""){
        passwordFocusRef.current?.focus();
        return;
      }
      //#endregion

      const response = await signIn({
        username,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        }
      });

      console.log(await response);

      if(await response.isSignedIn == true){
        navigation.navigate("Loading", {target: "Home"});
      }
    }
    catch (e: any)
    {
      console.log(e.toString());

      if((e.toString()).startsWith("UserNotFoundException") || e.toString().startsWith("NotAuthorizedException"))
      {
        setIsUsernameOrPasswordValid(false);
      }
  
    }
  }

  const ForgotPasswordPress = async () => {
    try
    {
      //#region Validations
      if(username?.trim() == ""){
        usernameFocusRef.current?.focus();
        Alert.alert("", txtUSERNAME_CAN_NOT_BE_EMPTY, [
          {
            text: txtOK,
            onPress: () => usernameFocusRef.current?.focus(),
            style: 'cancel',
          }
        ]);
        return;
      }else if(regExUsername.test(username?.trim()) === true){
        usernameFocusRef.current?.focus();
        return;
      }
      //#endregion

      const response = await resetPassword({
        username
      });

      console.log(await response);

      if(await response.nextStep?.resetPasswordStep == "CONFIRM_RESET_PASSWORD_WITH_CODE")
      {
        navigation.navigate("ResetPassword", {username: username});
      }

    }
    catch (e: any)
    {
      console.log(e.toString());

      if((e.toString()).startsWith("UserNotFoundException"))
      {
          Alert.alert(txtUSER_NOT_FOUND, txtPLEASE_ENTER_USERNAME_CORRECTLY, [
            {
              text: txtOK,
              onPress: () => usernameFocusRef.current?.focus(),
              style: 'cancel',
            }
          ]);
      }
      else if((e.toString()).startsWith("LimitExceededException"))
        {
            Alert.alert(txtATTEMPT_LIMIT_EXCEEDED, txtPLEASE_TRY_AGAIN_AFTER_SOME_TIME, [
              {
                text: txtOK,
                onPress: () => usernameFocusRef.current?.focus(),
                style: 'cancel',
              }
            ]);
        }
    }
  }

  return (
    <GestureHandlerRootView>

<Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

<View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
    <Select style={styles.selectLanguageLogin} selectedIndex={selectedLang} value={MapLangId(selectedLang)} onSelect={index => LanguageSelected(index)} ref={languageFocusRef}>
          <SelectItem accessoryRight={CheckIcon((selectedLang as IndexPath).row == 0)} title={txtENGLISH}/>
          <SelectItem accessoryRight={CheckIcon((selectedLang as IndexPath).row == 1)} title={txtSINHALA} /> 
    </Select>
<Button style={styles.btnSettingLogin} appearance="ghost" accessoryRight={TextIcon} onPress={SettingButtonPressed}/>
</View>


    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <View style={styles.viewFlexColumn}>

        <Avatar style={styles.logoLogin} size="large" shape="square" source={require('../../../assets/images/logowithtext.png')}/>

        <Input style={styles.textInputLogin} placeholder={txtUSERNAME} status="primary" value={username} onChangeText={newText => {setUsername(newText); setIsLoginButtonClicked(false); setIsUsernameOrPasswordValid(true); setShouldUseRoutedUsername(false);}} ref={usernameFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder={txtPASSWORD} status="primary" value={password} caption={renderUsernamePasswordCaption} onChangeText={newText => {setPassword(newText); setIsLoginButtonClicked(false); setIsUsernameOrPasswordValid(true); setShouldUseRoutedPassword(false);}} ref={passwordFocusRef} secureTextEntry></Input>

        <View style={styles.viewFlexRow}>
            <CheckBox checked={rememberMe} onChange={value => {setRememberMe(value)}} ><Text status="primary">{txtREMEMBER_ME}</Text></CheckBox>
            <Button status="primary" appearance="ghost" onPress={()=> ForgotPasswordPress()}>{txtFORGOT_PASSWORD}</Button> 
        </View>

        <Button style={styles.btnLogin} onPress={()=>{ LoginPress({username: shouldUseRoutedUsername? routedUsername : username, password: shouldUseRoutedPasswpord? routedPassword : password}); }}>{txtLOGIN}</Button>

        <Button style={styles.btnSignup} appearance="outline" onPress={()=>{navigation.navigate('Signup')}}>{txtSIGNUP}</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default Login;
