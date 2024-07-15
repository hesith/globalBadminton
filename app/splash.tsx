import { styles } from "@/styles/styles";
import { Avatar, Layout } from "@ui-kitten/components";
import * as UserSettings from './AsyncStorage/user_settings';
import { getCurrentUser, signOut } from "aws-amplify/auth";

const Splash = ({navigation}: {navigation: any}) => {

    try
    {
        UserSettings.getLangId().then(id => {

            global.lang_id = id as string;
            navigation.navigate("Login");
    
          });

        getCurrentUser().then(user => console.log("user is ",user), err=> console.log(err));


        return (
            <Layout style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
                <Avatar style={styles.logoLogin} size="large" shape="square" source={require('../assets/images/logo.png')}/>
            </Layout>
        )
    }
    catch (e: any)
    {
        console.log(e.toString());
    }
   

}

export default Splash;