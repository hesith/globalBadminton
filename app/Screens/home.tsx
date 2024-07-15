import { styles } from "@/styles/styles";
import { Layout, Button } from "@ui-kitten/components";

const Home = ({navigation}: {navigation: any}) => {

    return (
        <Layout style={{flex: 1, justifyContent: "center", alignItems: "center" }}> 
            <Button status="primary">Logout</Button>
        </Layout>
    )

}

export default Home;