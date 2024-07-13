import { View, BackHandler } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { ENGLISH_inEnglish, FORGOT_PASSWORD_QuestionMark, LOGIN, PASSWORD, REMEMBER_ME, SIGNUP, SINHALA_inSinhala, USERNAME} from "../app/ShareResources/lang_resources";
import { Input, Text, Layout, Button, CheckBox, Avatar, Icon, IconElement, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import * as UserSettings from './AsyncStorage/user_settings';


//#region Icons & Accessories
const SettingIcon = (): IconElement => (
  <Icon
    fill="black"
    name='settings'
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


const Login = ({navigation, route}: {navigation: any, route: any}) => {

  //#region LANGUAGE
  const[lang_id, setLanguageId] = useState(global.lang_id);
  var txtENGLISH = ENGLISH_inEnglish(lang_id);
  var txtFORGOT_PASSWORD = FORGOT_PASSWORD_QuestionMark(lang_id);
  var txtLOGIN = LOGIN(lang_id);
  var txtPASSWORD = PASSWORD(lang_id);
  var txtREMEMBER_ME = REMEMBER_ME(lang_id);
  var txtSIGNUP = SIGNUP(lang_id);
  var txtSINHALA = SINHALA_inSinhala(lang_id);
  var txtUSERNAME = USERNAME(lang_id);
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

  //#region Input States
  const [username, setUsername] = useState(route.params?.username.trim() != "" ? route.params?.username : "");
  const [password, setPassword] = useState(route.params?.password.trim() != "" ? route.params?.password : "");
  const [selectedLang, setSelectedLang] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  //#endregion

  //#region References
  const languageFocusRef = useRef<any>(null); 
  //#endregion


  const SettingButtonPressed = () => {
    languageFocusRef.current?.focus();
  }

  const LanguageSelected = (index: any) => {
    try
    {
      setSelectedLang(index);
      UserSettings.setLangId(MapLangId(index));
      setLanguageId(MapLangId(index));
    }
    catch (e: any)
    {
      console.log(e.toString());
    }
  }

  const MapLangId = (index: IndexPath | IndexPath[]) => {
    let langId;
    switch ((index as IndexPath).row){
      case 0:
          langId = "en"
         break;
      case 1:
          langId = "si"
          break;
      default:
          langId = "en";
          break;
    }
    return langId;
}

  return (
    <GestureHandlerRootView>

<Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

<View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
    <Select style={styles.selectLanguageLogin} selectedIndex={selectedLang} value={MapLangId(selectedLang)} onSelect={index => LanguageSelected(index)} ref={languageFocusRef}>
          <SelectItem style={styles.selectItemLanguageLogin} accessoryRight={CheckIcon((selectedLang as IndexPath).row == 0)} title={txtENGLISH}/>
          <SelectItem style={styles.selectItemLanguageLogin} accessoryRight={CheckIcon((selectedLang as IndexPath).row == 1)} title={txtSINHALA} /> 
    </Select>
<Button style={styles.btnSettingLogin} appearance="ghost" accessoryRight={SettingIcon} onPress={SettingButtonPressed}/>
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
