import { View, BackHandler, Alert } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { Input, Text, Layout, Button, Icon, IconElement, Spinner } from "@ui-kitten/components";
import { confirmSignUp } from 'aws-amplify/auth';
import { ALL_YOU_HAVE_ENTERED_WILL_BE_LOST_FullStop_ARE_YOU_SURE_QuestionMark, CANCEL, START_OVER_QuestionMark, USERNAME, USERNAME_CAN_NOT_CONTAIN_SPACES, VERIFICATION_CODE, VERIFICATION_CODE_INVALID, VERIFIED, VERIFY, YES_Uppercase } from "../app/ShareResources/lang_resources";


//#region LANGUAGE
const lang_id = global.lang_id;
const txtALL_YOU_HAVE_ENTERED_WILL_BE_LOST = ALL_YOU_HAVE_ENTERED_WILL_BE_LOST_FullStop_ARE_YOU_SURE_QuestionMark(lang_id);
const txtCANCEL = CANCEL(lang_id);
const txtSTART_OVER = START_OVER_QuestionMark(lang_id);
const txtUSERNAME = USERNAME(lang_id);
const txtUSERNAME_CAN_NOT_CONTAIN_SPACES = USERNAME_CAN_NOT_CONTAIN_SPACES(lang_id);
const txtVERIFIED = VERIFIED(lang_id);
const txtVERIFY = VERIFY(lang_id);
const txtVERIFICATION_CODE = VERIFICATION_CODE(lang_id);
const txtVERIFICATION_CODE_INVALID = VERIFICATION_CODE_INVALID(lang_id);
const txtYES = YES_Uppercase(lang_id);
//#endregion

const regExVerficationCode = /^\d{0,6}$/;

const Verify = ({navigation, route}: {navigation: any, route: any}) => {
  
  //#region BackHandler
  useEffect(() => {
    const backAction = () => {
      Alert.alert(txtSTART_OVER, txtALL_YOU_HAVE_ENTERED_WILL_BE_LOST, [
        {
          text: txtCANCEL,
          onPress: () => null,
          style: 'cancel',
        },
        {text: txtYES, onPress: () => navigation.navigate("Login")},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //#endregion

  const [isSignupButtonClicked, setIsSignupButtonClicked] = useState(false);
  const [isConfirmationCodeValid, setIsConfirmationCodeValid] = useState<any>(null);

  const password = route.params?.password;

  //#region Input States
  const [username, setUsername] = useState(route.params?.username);
  const [confirmationCode, setConfirmationCode] = useState('');
  //#endregion

//#region References
const usernameFocusRef = useRef<any>(null);
const confirmationCodeFocusRef = useRef<any>(null);
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
  const renderVeificationCodeCaption = () => {
    if(isConfirmationCodeValid == false && !isSignupButtonClicked){
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

//#endregion Caption

const onVerificationCodeChanged = (text: string) => {
  try
  {
    if(regExVerficationCode.test(text.trim()) == true)
      {
        setConfirmationCode(text.trim());
        console.log(confirmationCode);
      }
  }
  catch (e : any)
  {
    console.log(e.toString());
  }
};

  const VerifyPress = async (data:any) => {
    try{

      const {username, confirmationCode} = data;

      console.log(username);

      if(username.trim() == ""){
        usernameFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }
      if(confirmationCode.trim() == "")
      {
        confirmationCodeFocusRef.current?.focus();
        setIsSignupButtonClicked(false);
        return;
      }

      const response = await confirmSignUp({
        username, 
        confirmationCode
      });
      
      if(await response.isSignUpComplete)
      {
        setIsConfirmationCodeValid(true);
        setIsSignupButtonClicked(false);
        navigation.navigate("Login", {username, password})
      }

    }catch (e: any){
      if(e.toString().split(':')[0]?.trim() == "CodeMismatchException"){
        setIsConfirmationCodeValid(false);
        setIsSignupButtonClicked(false);
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

        <Input style={styles.textInputLogin} placeholder={txtUSERNAME} disabled={true} value={route.params?.username} status="primary" onChangeText={newText => setUsername(newText)} ref={usernameFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder={txtVERIFICATION_CODE} maxLength={6} caption={renderVeificationCodeCaption} status="primary" onChangeText={newText => {onVerificationCodeChanged(newText); setIsConfirmationCodeValid(null)}} value={confirmationCode} ref={confirmationCodeFocusRef}></Input>

        <Button style={styles.btnLogin} accessoryRight={LoadingIndicator} onPress={()=>{VerifyPress({username, confirmationCode}); setIsSignupButtonClicked(true);}} >{txtVERIFY}</Button>


      </View>

     
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
}

export default Verify;
