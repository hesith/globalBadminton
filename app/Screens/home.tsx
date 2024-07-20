import { styles } from "@/styles/styles";
import { Layout, Button } from "@ui-kitten/components";
import { signOut } from "aws-amplify/auth";

const Home = ({navigation}: {navigation: any}) => {

    return (
        <Layout style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <Button status="primary" onPress={()=> {signOut(); navigation.navigate("Login")}}>Logout</Button>
        </Layout>
    )

}

export default Home;