import { Alert, View } from "react-native";
import Error from './Dialogs/error'
import React, {useState} from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { styles } from "../styles/styles";
import { Input, Text, Layout, Button, Icon, IconElement, CheckBox, Select, SelectItem, IndexPath, Divider } from "@ui-kitten/components";


import { signIn, signUp } from 'aws-amplify/auth';

const RenderToggleButton = (): React.ReactElement => (
  <Button style={styles.btnSignup} onPress={() => {            
  }}>Signup</Button> 
  // <Button onPress={() => setErrorVisible(true)}>
  //   TOGGLE POPOVER
  // </Button>
);


const Signup = () => { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [genderSelectedIndex, setGenderSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  
  
  const [errorVisible, setErrorVisible] = useState(false);
  //let errorProps = {anchor: renderToggleButton, visible: errorVisible}

  const signupPress = async (data:any) =>{ 
    try
    {
      const {name, email, genderSelectedIndex, username, password, confirmPassword} = data;

      const gender = MapGender(genderSelectedIndex);

      if(name.trim() == ""){
        return;
      }

      console.log(data);
        const response = await signUp({
          username,
          password,  
          options: {userAttributes:{email, gender, name}}      
        } )

        Alert.alert(await response.toString());
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

      {/* <Error {...errorProps}></Error> */}

      <View style={styles.viewFlexColumn}>

        <Text style={styles.h1} category="h1">Sign up</Text>     
        <Input style={styles.textInputLogin} placeholder="Player Name" status="primary" onChangeText={newText => setName(newText)}></Input>
        <Input style={styles.textInputLogin} placeholder="Email" status="primary" onChangeText={newText => setEmail(newText)}></Input>
        <Select style={styles.selectInputLogin} value={MapGender(genderSelectedIndex)} selectedIndex={genderSelectedIndex as IndexPath} status="primary" onSelect={ index => setGenderSelectedIndex(index)}>
          <SelectItem title='Male'/>
          <SelectItem title='Female' />
          <SelectItem title='Other' />
        </Select>

        <Divider style={styles.divider}/>
        
        <Input style={styles.textInputLogin} placeholder="Username" status="primary" onChangeText={newText => setUsername(newText)} ></Input>
        <Input style={styles.textInputLogin} placeholder="Password" status="primary" onChangeText={newText => setPassword(newText)} secureTextEntry></Input>
        <Input style={styles.textInputLogin} placeholder="ConfirmPassword" status="primary" onChangeText={newText => setConfirmPassword(newText)} secureTextEntry></Input>
        
        <Divider style={styles.divider}/>

        <Button style={styles.btnSignup} onPress={() => {            
          signupPress({name, email, genderSelectedIndex, username, password, confirmPassword})
        }}>Signup</Button>

      <RenderToggleButton></RenderToggleButton>

      </View>   
    </View>
    </Layout>
    </GestureHandlerRootView>

  );
//#endregion
}

export default Signup;
