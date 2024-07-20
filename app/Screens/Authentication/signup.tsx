import { View, BackHandler, Alert } from "react-native";
import React, { useRef, useState, useEffect} from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../../../styles/styles";
import { Input, Text, Layout, Button, Icon, IconElement, Spinner , Select, SelectItem, IndexPath, Divider } from "@ui-kitten/components";
import { CONFIRM_PASSWORD, DOES_NOT_MATCH, EMAIL, EMAIL_ALREADY_EXISTS, FEMALE, GENDER, INVALID_EMAIL, MALE, MATCH, OTHER, PASSWORD, PASSWORD_Colon_STRONG, PASSWORD_Colon_WEAK, PLAYER_NAME, SIGNUP, USERNAME, USERNAME_CAN_NOT_CONTAIN_SPACES} from "../../../app/ShareResources/lang_resources";

import { signUp } from 'aws-amplify/auth';

const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const regExUsername = /\s/g;

const Signup = ({navigation}: {navigation: any}) => { 

// //#region LANGUAGE
const[lang_id, setLanguageId] = useState(global.lang_id);
const txtCONFIRM_PASSWORD = CONFIRM_PASSWORD(lang_id);
const txtEMAIL = EMAIL(lang_id);
const txtEMAIL_ALREADY_EXISTS = EMAIL_ALREADY_EXISTS(lang_id);
const txtFEMALE = FEMALE(lang_id);
const txtDOES_NOT_MATCH = DOES_NOT_MATCH(lang_id);
const txtGENDER = GENDER(lang_id);
const txtINVALID_EMAIL = INVALID_EMAIL(lang_id);
const txtMALE = MALE(lang_id);
const txtMATCH = MATCH(lang_id);
const txtOTHER = OTHER(lang_id);
const txtPASSWORD = PASSWORD(lang_id);
const txtPASSWORD_STRONG = PASSWORD_Colon_STRONG(lang_id);
const txtPASSWORD_WEAK = PASSWORD_Colon_WEAK(lang_id);
const txtPLAYER_NAME = PLAYER_NAME(lang_id);
const txtSIGNUP = SIGNUP(lang_id);
const txtUSERNAME = USERNAME(lang_id);
const txtUSERNAME_CAN_NOT_CONTAIN_SPACES = USERNAME_CAN_NOT_CONTAIN_SPACES(lang_id);
// //#endregion

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

  const [isEmailAlreadyExist, setIsEmailAlreadyExist] = useState(false);
  const [isSignupButtonClicked, setIsSignupButtonClicked] = useState(false);

  //#region Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [genderSelectedIndex, setGenderSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(-1));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
//#endregion

//#region References
  const nameFocusRef = useRef<any>(null);
  const emailFocusRef = useRef<any>(null);
  const genderFocusRef = useRef<any>(null);
  const usernameFocusRef = useRef<any>(null);
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
  const LoadingIndicator = (props: any): React.ReactElement => isSignupButtonClicked? (
        <View style={[props.style, styles.indicator]}>
      <Spinner status="control" size='large' />
    </View> 
) : <></>;
//#endregion

//#region Caption
const renderEmailCaption = () => {
  if(!regExEmail.test(email.trim()) && email.length > 0){
    return(
      <Layout style={styles.labelLogin}>
      <Text status="danger" category="p2">{txtINVALID_EMAIL}</Text>
        <Button
        appearance='ghost'
        accessoryRight={CrossIcon}  
      />
      </Layout>
      )
  }else if(isEmailAlreadyExist && !isSignupButtonClicked){
      return(
        <Layout style={styles.labelLogin}>
        <Text status="danger" category="p2">{txtEMAIL_ALREADY_EXISTS}</Text>
          <Button
          appearance='ghost'
          accessoryRight={CrossIcon}  
        />
        </Layout>
        )
  }
  else{
    return(<></>)
  }
};

const renderUsernameCaption = () => {
  if(regExUsername.test(username.trim()) && username.length > 0){
    return(
      <Layout style={styles.labelLogin}>
      <Text status="danger" category="p2">{txtUSERNAME_CAN_NOT_CONTAIN_SPACES}</Text>
        <Button
        appearance='ghost'
        accessoryRight={CrossIcon}  
      />
      </Layout>
      )
  }else{
    return(<></>)
  }
};

  const renderPasswordCaption = () => {
    if(!isSignupButtonClicked){
      if(password.length < 8 && password.length > 0){
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
      else if(password.length > 7)
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
    if(!isSignupButtonClicked){
    if(confirmPassword != password && confirmPassword.length > 0){
      return(
        <Layout style={styles.labelLogin}>
        <Text status="danger" category="p2">{txtDOES_NOT_MATCH}</Text>
          <Button
          appearance='ghost'
          accessoryRight={CrossIcon}  
        />
        </Layout>
        )
    }else if(confirmPassword === password && confirmPassword.length > 0)
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
//#endregion

const signupPress = async (data:any) =>{ 
    try
    {
      setIsSignupButtonClicked(true);

      const {name, email, genderSelectedIndex, username, password, confirmPassword} = data;

      const gender = MapGender(genderSelectedIndex);

      //#region Validation
      if(name.trim() == ""){
        nameFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }
      if(email.trim() == ""){
        emailFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }else if(regExEmail.test(email.trim()) === false){
        emailFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }
      if(gender.trim() == "Gender"){
        genderFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }
      if(username.trim() == ""){
        usernameFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }else if(regExUsername.test(username.trim()) === true){
        usernameFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }
      if(password.trim() == ""){
        passwordFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }else if(password.length < 8){
        passwordFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }
      if(confirmPassword.trim() == ""){
        confPasswordFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }else if (confirmPassword != password){
        confPasswordFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }
//#endregion

        const response = await signUp({
          username,
          password,  
          options: {userAttributes:{email, gender, name}}    
        } )

        
        console.log(await response);

        if(await response.userId?.toString().trim() != null && await response.nextStep?.signUpStep == "CONFIRM_SIGN_UP")
        {
          navigation.navigate('Verify', {username, password});
        }
    }catch(e: any)
    {
        console.log(e.toString());

        if(e.toString().split(": ")[1] == "PreSignUp failed with error Email already exists."){
          setIsEmailAlreadyExist(true);
          emailFocusRef.current?.focus();     
          console.log("Email Already Exist");
        }else if(e.toString().split(": ")[1] == "User already exists"){
          console.log("Username Already Exist");
        }

        setIsSignupButtonClicked(false);
    }
  }
  
  const MapGender = (index: IndexPath | IndexPath[], isVisualRepresentaionOnly = false) => {
      let gender;
      switch ((index as IndexPath).row){
        case 0:
          if(isVisualRepresentaionOnly){
            gender = txtMALE;
          }else{
            gender = "Male"
          }
          break;
        case 1:
          if(isVisualRepresentaionOnly){
            gender = txtFEMALE;
          }else{
            gender = "Female"
          }
          break;
        case 2:
          if(isVisualRepresentaionOnly){
            gender = txtOTHER;
          }else{
            gender = "Other"
          }
          break;
        default:
          if(isVisualRepresentaionOnly){
            gender = txtGENDER;
          }else{
            gender = "Gender"
          }
          break;
      }
      return gender;
  }

//#region UI
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

        <Text style={styles.h1} category="h1">{txtSIGNUP}</Text>     
        <Input style={styles.textInputLogin} placeholder={txtPLAYER_NAME} status="primary" onChangeText={newText => setName(newText)} ref={nameFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder={txtEMAIL} status="primary" caption={renderEmailCaption} onChangeText={newText => {setEmail(newText); setIsEmailAlreadyExist(false);}} ref={emailFocusRef}></Input>
        <Select style={styles.selectInputLogin} value={MapGender(genderSelectedIndex, true)} selectedIndex={genderSelectedIndex as IndexPath} placeholder={txtGENDER} status="primary" onSelect={ index => setGenderSelectedIndex(index)} ref={genderFocusRef}>
          <SelectItem title={txtMALE}/>
          <SelectItem title={txtFEMALE} />
          <SelectItem title={txtOTHER} />
        </Select>

        <Divider style={styles.divider}/>
        
        <Input style={styles.textInputLogin} placeholder={txtUSERNAME} status="primary" caption={renderUsernameCaption} onChangeText={newText => setUsername(newText)} ref={usernameFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder={txtPASSWORD} status="primary" caption={renderPasswordCaption} onChangeText={newText => setPassword(newText)} ref={passwordFocusRef} secureTextEntry></Input>
        <Input style={styles.textInputLogin} placeholder={txtCONFIRM_PASSWORD} status="primary" caption={renderConfirmPasswordCaption} onChangeText={newText => setConfirmPassword(newText)} ref={confPasswordFocusRef} secureTextEntry></Input>
        
        <Divider style={styles.divider}/>

        <Button style={styles.btnSignup} accessoryRight={LoadingIndicator} onPress={() => {            
          signupPress({name, email, genderSelectedIndex, username, password, confirmPassword})
        }}>{txtSIGNUP}</Button>

      </View>   
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
//#endregion
}

export default Signup;
