import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from '../styles/theme1.json'; 
import { Amplify } from 'aws-amplify';
import amplifyconfig from '..//src/amplifyconfiguration.json';

import Splash from './splash';
import Login from './login';
import Signup from './signup';
import Verify from './verify';

Amplify.configure(amplifyconfig);

const Stack = createNativeStackNavigator();

const RootLayout = () => {
  try
  {

    return (
      <>
      <NavigationContainer independent={true}>  
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
      
              <Stack.Navigator>
                  <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
                  <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
                  <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
                  <Stack.Screen name="Verify" component={Verify} options={{headerShown: false}}/>
              </Stack.Navigator>
      
          </ApplicationProvider>
      </NavigationContainer>
      </>
        );
  }
  catch (e: any)
  {
    console.log(e.toString());
  }

  
}

export default RootLayout;
