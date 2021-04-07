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

const { width, height } = Dimensions.get("screen");

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {internalValue: null};
        this.onChangeText = this.onChangeText.bind(this);
        this.goToApp = this.goToApp.bind(this);
    }

    onChangeText(val) {
         this.setState({internalValue: val});
    }

    goToApp(){
        this.props.navigation.navigate('App')
    }

  render() {
    const lengthInput = 6
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block safe flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color={argonTheme.COLORS.DEFAULT} size={36}>
                  Vérification
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
                    <Text style={styles.textStyle}>{"Saisissez le code envoyé par SMS"}</Text>
                    <Block width={width * 0.8}>
                      <Input
                        autoFocus
                        borderless
                        placeholder="067777777"
                        keyboardType="numeric"
                        value={this.state.internalValue}
                        maxLength={lengthInput}
                        onChangeText={this.onChangeText}
                        style={{width:0, height: 0}}
                        returnKeyType="done"
                      />
                      <View style={styles.contenairInput}>
                        {
                            Array(lengthInput).fill().map((data, index) => (
                                <View key={index} style={styles.cellView}>
                                    <Text style={styles.cellText} onPress={() => this.textInput.focus()}>
                                        {this.state.internalValue && this.state.internalValue.length > 0 ? this.state.internalValue[index] : ""}
                                    </Text>
                                </View>
                            ))
                        }
                      </View>
                    </Block>
                    
                    <Block middle style={styles.viewBottom}>
                      <TouchableOpacity onPress={this.goToApp}>
                          <View style={styles.createButton}>
                            <Text bold size={14} color={argonTheme.COLORS.WHITE} style={{ alignItems: 'center'}}>
                                Confirmer le code verification
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  cellView: {
      paddingVertical: 11,
      width: 40,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1.5,
      backgroundColor: 'white',
      borderRadius: 2
  },
  cellText: {
      textAlign: 'center',
      fontSize: 16
  }
});

export default Register;
