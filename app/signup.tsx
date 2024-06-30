import { Alert, TextComponent, View } from "react-native";
import React, {ReactElement, useRef, useState} from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { Input, Text, Layout, Button, Icon, IconElement, CheckBox, Select, SelectItem, IndexPath, Divider, InputElement, InputProps } from "@ui-kitten/components";


import { signIn, signUp } from 'aws-amplify/auth';

const regExEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const Signup = () => { 
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

//#region Caption
const renderEmailCaption = () => {
  if(!regExEmail.test(email) && email.length > 0){
    return(
      <Layout style={styles.labelLogin}>
      <Text status="danger" category="p2">Invalid Email</Text>
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
    if(password.length < 8 && password.length > 0){
      return(
        <Layout style={styles.labelLogin}>
        <Text status="danger" category="p2">Password :     Weak</Text>
          <Button
          appearance='ghost'
          accessoryRight={CrossIcon}  
        />
        </Layout>
        )
    }else if(password.length > 7)
      {
      return (
        <Layout style={styles.labelLogin}>
        <Text status="success" category="p2">Password :     Strong</Text>
          <Button
          appearance='ghost'
          accessoryRight={CheckIcon}  
        />
        </Layout>
        );
    }else{
      return(<></>)
    }
  };

  const renderConfirmPasswordCaption = () => {
    if(confirmPassword != password && confirmPassword.length > 0){
      return(
        <Layout style={styles.labelLogin}>
        <Text status="danger" category="p2">Does not match</Text>
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
        <Text status="success" category="p2">Match</Text>
          <Button
          appearance='ghost'
          accessoryRight={CheckIcon}  
        />
        </Layout>
        );
    }else{
      return(<></>)
    }
  };
//#endregion

  const signupPress = async (data:any) =>{ 
    try
    {
      const {name, email, genderSelectedIndex, username, password, confirmPassword} = data;

      const gender = MapGender(genderSelectedIndex);

      console.log(data);

//#region Validation
      if(name.trim() == ""){
        nameFocusRef.current?.focus();
        return;
      }
      if(email.trim() == ""){
        emailFocusRef.current?.focus();
        return;
      }else if(regExEmail.test(email.trim()) === false){
        emailFocusRef.current?.focus();
        return;
      }
      if(gender.trim() == "Gender"){
        genderFocusRef.current?.focus();
        return;
      }
      if(username.trim() == ""){
        usernameFocusRef.current?.focus();
        return;
      }
      if(password.trim() == ""){
        passwordFocusRef.current?.focus();
        return;
      }else if(password.length < 8){
        Alert.alert("Password must be minimum 8 characters long");
        passwordFocusRef.current?.focus();
        return;
      }
      if(confirmPassword.trim() == ""){
        confPasswordFocusRef.current?.focus();
        return;
      }else if (confirmPassword != password){
        confPasswordFocusRef.current?.focus();
        return;
      }
//#endregion

        const response = await signUp({
          username,
          password,  
          options: {userAttributes:{email, gender, name}}      
        } )

        console.log(await response);
    }catch(e: any)
    {
          console.log(e.toString());
    }
  }
  
  const MapGender = (index: IndexPath | IndexPath[]) => {
      let gender;
      switch ((index as IndexPath).row){
        case 0:
          gender = "Male"
          break;
        case 1:
          gender = "Female"
          break;
        case 2:
          gender = "Other"
          break;
        default:
          gender = "Gender"
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

        <Text style={styles.h1} category="h1">Sign up</Text>     
        <Input style={styles.textInputLogin} placeholder="Player Name" status="primary" onChangeText={newText => setName(newText)} ref={nameFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder="Email" status="primary" caption={renderEmailCaption} onChangeText={newText => setEmail(newText)} ref={emailFocusRef}></Input>
        <Select style={styles.selectInputLogin} value={MapGender(genderSelectedIndex)} selectedIndex={genderSelectedIndex as IndexPath} placeholder="Gender" status="primary" onSelect={ index => setGenderSelectedIndex(index)} ref={genderFocusRef}>
          <SelectItem title='Male'/>
          <SelectItem title='Female' />
          <SelectItem title='Other' />
        </Select>

        <Divider style={styles.divider}/>
        
        <Input style={styles.textInputLogin} placeholder="Username" status="primary" onChangeText={newText => setUsername(newText)} ref={usernameFocusRef}></Input>
        <Input style={styles.textInputLogin} placeholder="Password" status="primary" caption={renderPasswordCaption} onChangeText={newText => setPassword(newText)} ref={passwordFocusRef} secureTextEntry></Input>
        <Input style={styles.textInputLogin} placeholder="Confirm Password" status="primary" caption={renderConfirmPasswordCaption} onChangeText={newText => setConfirmPassword(newText)} ref={confPasswordFocusRef} secureTextEntry></Input>
        
        <Divider style={styles.divider}/>

        <Button style={styles.btnSignup} onPress={() => {            
          signupPress({name, email, genderSelectedIndex, username, password, confirmPassword})
        }}>Signup</Button>

      </View>   
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
//#endregion
}

export default Signup;
