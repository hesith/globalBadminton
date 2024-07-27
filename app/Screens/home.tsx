import { styles } from "@/styles/styles";
import { Layout, Button } from "@ui-kitten/components";
import { signOut } from "aws-amplify/auth";
import { useEffect } from "react";
import { BackHandler } from "react-native";

const Home = ({navigation}: {navigation: any}) => {
    
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


    return (
        <Layout style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <Button status="primary" onPress={()=> {signOut(); navigation.navigate("Login")}}>Logout</Button>
        </Layout>
    )

}

export default Home;