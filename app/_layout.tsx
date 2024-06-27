import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import Login from './login';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '..//src/amplifyconfiguration.json';

import { default as theme } from '../styles/theme1.json'; 

Amplify.configure(amplifyconfig);

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
<>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
    <NavigationContainer independent={true}>  

        <Stack.Navigator>
            <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
        </Stack.Navigator>

    </NavigationContainer>
    </ApplicationProvider>
</>
  );
}
