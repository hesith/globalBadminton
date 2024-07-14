import { styles } from "@/styles/styles";
import { Avatar, Layout } from "@ui-kitten/components";
import * as UserSettings from './AsyncStorage/user_settings';

const Splash = ({navigation}: {navigation: any}) => {

    UserSettings.getLangId().then(id => {

        global.lang_id = id as string;
        navigation.navigate("Login");
  
      });

    return (
        <Layout style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <Avatar style={styles.logoLogin} size="large" shape="square" source={require('../assets/images/logo.png')}/>
        </Layout>
    )

}

export default Splash;