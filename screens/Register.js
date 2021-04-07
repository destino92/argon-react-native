import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';

const { width, height } = Dimensions.get("screen");

const firebaseConfig = {
  apiKey: 'AIzaSyCxGSpLhFUk00ZuP9GGtIz1Z5Gsnl_cO3g',
  authDomain: 'e2cportal.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'e2cportal',
  storageBucket: 'e2cportal.appspot.com',
  messagingSenderId: '147998621287',
  appId: '1:147998621287:web:f81c023cd42ceaa4cd9ec2',
  measurementId: 'G-MBVYDM1D4G',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '', 
            verificationID: '',
            verifyError: '',
            verifyInProgress: false,

        };
        this.recaptchaVerifier = React.createRef();
        this.onChangePhone = this.onChangePhone.bind(this);
        this.getCode = this.getCode.bind(this);
    }

    onChangePhone(text) {
        this.setState({phone: text});
    }

    async getCode(){
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        this.props.navigation.navigate('RegisterOTP')
        try {
            this.setState({
                verifyError: undefined,
                verifyInProgress: true,
                verificationId: '',
            });
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phone,
                // @ts-ignore
                recaptchaVerifier.current
            );
            this.setState({
                verifyError: undefined,
                verifyInProgress: false,
                verificationId: verificationId,
            });
            this.props.navigation.navigate('RegisterOTP')
        } catch (err) {
            this.setState({
                verifyError: err,
                verifyInProgress: false
            });
        }
    }
  render() {
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
                ref={this.recaptchaVerifier}
                firebaseConfig={firebaseConfig}
              />
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color={argonTheme.COLORS.DEFAULT} size={36}>
                  Se Connecter
                </Text>
              </Block>
              <Block flex>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1, alignItems: "center" }}
                    keyboardVerticalOffset={50}
                    behavior="padding"
                    enabled
                  >
                    <Text style={styles.textStyle}>{"Veuillez saisir votre numéro de téléphone"}</Text>
                    <Block width={width * 0.8} style={styles.contenairInput}>
                      <Input
                        borderless
                        placeholder="+242067777777"
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        autoCompleteType="tel"
                        value={this.state.phone}
                        onChangeText={this.onChangePhone}
                        style={styles.phoneInputStyle}
                        secureTextEntry={false}
                      />
                    </Block>
                    
                    <Block middle style={styles.viewBottom}>
                      <TouchableOpacity onPress={this.getCode}>
                          <View style={styles.createButton}>
                            <Text bold size={14} color={argonTheme.COLORS.WHITE} style={{ alignItems: 'center'}}>
                                Envoyez moi le code de verification
                            </Text>
                          </View>
                      </TouchableOpacity>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  viewBottom: {
    flex: 1,
    marginBottom: 20
  },
  createButton: {
    backgroundColor: argonTheme.COLORS.DEFAULT,
    width: 288,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 15
  },
  contenairInput: {
    backgroundColor: 'white', 
    height: 50, 
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50
  }
});

export default Register;
