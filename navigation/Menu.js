import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import * as Linking from 'expo-linking';
import { Block, Text, theme } from "galio-framework";

import Images from "../constants/Images";
import { argonTheme } from "../constants";
import { DrawerItem as DrawerCustomItem } from '../components';

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  const screens = [
    "Home", 
    "Profile",
    /*"Account",
    "Elements",
    "Articles",*/
  ];

  dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${4242}';
    }
    else {
      phoneNumber = 'telprompt:${4242}';
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>
                <TouchableOpacity onPress={dialCall}>
                    <Text color={argonTheme.COLORS.DEFAULT} style={{ marginTop: 16, marginLeft: 8 }}>APPELER</Text>
                </TouchableOpacity>
            </Block>
        {/*<DrawerCustomItem title="Getting Started" navigation={navigation} />*/}
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  },
  logo: {
    width: 40,
    height: 40
  }
});

export default CustomDrawerContent;
