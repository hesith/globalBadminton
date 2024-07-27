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
    },    
    labelLoginIcon2:{
        width: 20,
        height: 20
    },
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    },
    logoLogin: {
        marginBottom: 40,
        marginTop: 10,
        width: 200,
        height: 200
      },
    settingIconLogin: {
        width: 50,
        height: 50,
    },
    btnSettingLogin: {
        alignSelf:'flex-end',
        marginTop: 40,
        marginRight: 10,
        borderRadius: 50,
        width: 50,
        height: 50,
        opacity: 0.4,
    },
    selectLanguageLogin: {
        alignSelf:'flex-end',
        opacity: 0,
        width: 120
    },
    spinnerLoading: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 30,
        borderStyle: 'dotted'
    }
  });