import { styles } from "@/styles/styles";
import { Layout, Spinner } from "@ui-kitten/components";

const Loading = ({navigation}: {navigation: any}) => {

    return (
        <Layout style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <Spinner style={styles.spinnerLoading} status="primary" size='giant' />         
        </Layout>
    )

}

export default Loading;