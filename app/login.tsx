import { View, BackHandler, Alert } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { ENGLISH_inEnglish, FORGOT_PASSWORD_QuestionMark, HAS_BEEN_SET_FullStop, LOGIN, OK, PASSWORD, PLEASE_RESTART_THE_APPLICATION_FullStop, REMEMBER_ME, SIGNUP, SINHALA_inSinhala, USERNAME} from "../app/ShareResources/lang_resources";
import { Input, Text, Layout, Button, CheckBox, Avatar, Icon, IconElement, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import * as UserSettings from './AsyncStorage/user_settings';

import { signIn } from 'aws-amplify/auth';

//#region Icons & Accessories
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
//#endregion

const regExUsername = /\s/g;

const Login = ({navigation, route}: {navigation: any, route: any}) => {

  //#region LANGUAGE
  const[lang_id, setLanguageId] = useState(global.lang_id);
  const txtENGLISH = ENGLISH_inEnglish(lang_id);
  const txtFORGOT_PASSWORD = FORGOT_PASSWORD_QuestionMark(lang_id);
  const txtHAS_BEEN_SET = HAS_BEEN_SET_FullStop(lang_id);
  const txtLOGIN = LOGIN(lang_id);
  const txtOK = OK(lang_id);
  const txtPASSWORD = PASSWORD(lang_id);
  const txtPLEASE_RESTART_THE_APPLICATION = PLEASE_RESTART_THE_APPLICATION_FullStop(lang_id);
  const txtREMEMBER_ME = REMEMBER_ME(lang_id);
  const txtSIGNUP = SIGNUP(lang_id);
  const txtSINHALA = SINHALA_inSinhala(lang_id);
  const txtUSERNAME = USERNAME(lang_id);
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
  
  //#region Input States
  const [username, setUsername] = useState(route.params?.username.trim() != "" ? route.params?.username : "");
  const [password, setPassword] = useState(route.params?.password.trim() != "" ? route.params?.password : "");
  const [selectedLang, setSelectedLang] = useState<IndexPath | IndexPath[]>(new IndexPath(GetSavedLanguage(global.lang_id)));
  //#endregion

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

  const LoginPress = async (data: any) => {
    try
    {

      const {username, password} = data;

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
      }else if(password?.length < 8){
        passwordFocusRef.current?.focus();
        return;
      }
      //#endregion

      const response = await signIn({
        username,
        password
      });

      console.log(await response);

    }
    catch (e: any)
    {
      console.log(e.toString());
    }
  }

  return (
    <GestureHandlerRootView>

<Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

<View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
    <Select style={styles.selectLanguageLogin} selectedIndex={selectedLang} value={MapLangId(selectedLang)} onSelect={index => LanguageSelected(index)} ref={languageFocusRef}>
          <SelectItem style={styles.selectItemLanguageLogin} accessoryRight={CheckIcon((selectedLang as IndexPath).row == 0)} title={txtENGLISH}/>
          <SelectItem style={styles.selectItemLanguageLogin} accessoryRight={CheckIcon((selectedLang as IndexPath).row == 1)} title={txtSINHALA} /> 
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

        <Avatar style={styles.logoLogin} size="large" shape="square" source={require('../assets/images/logo.png')}/>

        <Input style={styles.textInputLogin} placeholder={txtUSERNAME} status="primary" value={route.params?.username} onChangeText={newText => setUsername(newText)} ref={usernameFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder={txtPASSWORD} status="primary" value={route.params?.password} onChangeText={newText => setPassword(newText)} ref={passwordFocusRef} secureTextEntry></Input>

        <View style={styles.viewFlexRow}>
            <CheckBox checked>{txtREMEMBER_ME}</CheckBox>
            <Text status="primary">{txtFORGOT_PASSWORD}</Text>
        </View>

        <Button style={styles.btnLogin} onPress={()=>{LoginPress({username, password})}}>{txtLOGIN}</Button>
        <Button style={styles.btnSignup} appearance="outline" onPress={()=>{navigation.navigate('Signup')}}>{txtSIGNUP}</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default Login;
