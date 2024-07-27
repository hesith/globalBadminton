import { styles } from "@/styles/styles";
import { Layout, Spinner } from "@ui-kitten/components";
import { useEffect } from "react";
import { BackHandler } from "react-native";

const Loading = ({navigation, route}: {navigation: any, route: any}) => {
//#region BackHandler
    useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  //#endregion
    var target = route.params?.target;
    var timer = route.params?.timer;

    let interval = setInterval(() => {
        navigation.navigate({name: target});
        clearInterval(interval);
    }, timer == undefined? 1000 : timer)


    return (
        <Layout style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <Spinner style={styles.spinnerLoading} status="primary" size='giant' />         
        </Layout>
    )

}

export default Loading;