import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './login';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '..//src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
          <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
