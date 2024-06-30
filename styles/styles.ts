import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    h1:{
        marginVertical: 10
    },
    divider:{
        alignSelf: "stretch",
        marginVertical: 10
    },
    textInputLogin: {
        width: '75%',
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    selectInputLogin:{
        width: 200,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        alignContent: 'center'
    },
    btnLogin:{
        width: 250,
        marginTop: 30,
        alignContent: 'center'
    },
    btnSignup:{
        width: 250,
        marginTop: 10,
        alignContent: 'center'
    },
    viewFlexColumn:{
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },
    viewFlexRow:{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    popoverAnchor:{
        opacity: 0
    },
    errorTooltip:{
        width: '80%',
        height: 100
    },
    labelLogin:{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    labelLoginIcon:{
        width: 30,
        height: 30
    }
  });