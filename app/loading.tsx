import { styles } from "@/styles/styles";
import { Layout, Spinner } from "@ui-kitten/components";

const Loading = ({navigation, route}: {navigation: any, route: any}) => {

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