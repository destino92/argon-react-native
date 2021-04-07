import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import firebase from '../firebase'

import { Card, Button } from '../components';
import articles from '../constants/articles';
import { argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

import * as WebBrowser from 'expo-web-browser';

const { width, height } = Dimensions.get('screen');

const cardWidth = width - theme.SIZES.BASE * 2;

const image = { uri: "https://e2c.cg/sites/default/files/styles/large/public/2021-02/E2C%20ILLUSTRATION_0.jpg?itok=47eu55Tp" };

const factures = [
  {
    title: "185239",
    status: "Non payé",
    description:
      "JAN-FEV FEV-MARS 2021",
    image:
      "https://firebasestorage.googleapis.com/v0/b/e2cportal.appspot.com/o/0001.jpg?alt=media&token=49a9d900-be23-4acc-aa4f-4653cac124fe",
    price: "Fcfa 40.000"
  },
  {
    title: "185218",
    status: "payé",
    description:
      "NOV-DEV 2020 DEC-JAN 2021",
    image:
      "https://firebasestorage.googleapis.com/v0/b/e2cportal.appspot.com/o/MyDoc%2003_20_13%20(1)1024_1.jpg?alt=media&token=06c4bf00-f0d8-4640-9b81-6c16f2cd3050",
    price: "Fcfa 30.000"
  },
  {
    title: "385275",
    status: "payé",
    description:
      "SEP-OCT 2020 OCT-NOV 2021",
    image:
      "https://firebasestorage.googleapis.com/v0/b/e2cportal.appspot.com/o/MyDoc%2003_20_131024_1.jpg?alt=media&token=9e911316-e0ff-4add-ae22-70cf9cc03d33",
    price: "Fcfa 28.000"
  }
];

class Home extends React.Component {
  async showLivret(){
    const ref = firebase.storage().refFromURL('gs://e2cportal.appspot.com/LIVRET COMMERCIAL E2C by AXCOM.pdf');
    const url = await ref.getDownloadURL();

    await WebBrowser.openBrowserAsync(url);
  }

  async showE2C(){
      await WebBrowser.openBrowserAsync('https://e2c.cg/');
  }

  async showFB(){
      await WebBrowser.openBrowserAsync('https://www.facebook.com/E2CSA/');
  }

  async downloadBill(){
      const ref = firebase.storage().refFromURL('gs://e2cportal.appspot.com/0001.jpg');
    const url = await ref.getDownloadURL();

    await WebBrowser.openBrowserAsync(url);
  }

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        /*contentContainerStyle={styles.articles}*/>
        <Block flex>
            <ImageBackground
                source={image}
                style={styles.profileContainer}
                imageStyle={styles.profileBackground}
            >
                <Block flex style={styles.profileCard}>
                    <Block middle style={styles.nameInfo}>
                        <Text bold size={28} color="#32325D">
                        John Doe
                        </Text>
                        <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                        Brazzaville
                        </Text>
                    </Block>
                    <Block
                        middle
                        row
                        space="evenly"
                        style={{ marginTop: 20, paddingBottom: 24 }}
                    >
                        <Button
                        small
                        color="secondary"
                        shadowless
                        icon="menu-book"
                        iconFamily="Material"
                        iconColor="#40CDEF"
                        textStyle={{ color: "#5E72E4", fontSize: 12 }}
                        onPress={this.showLivret}
                        >
                        livret
                        </Button>
                        <Button
                        small
                        color="secondary"
                        shadowless
                        icon="facebook"
                        iconFamily="Material"
                        iconColor="#40CDEF"
                        textStyle={{ color: "#5E72E4", fontSize: 12 }}
                        onPress={this.showFB}
                        >
                        facebook
                        </Button>
                        <Button
                        small
                        color="secondary"
                        shadowless
                        icon="globe"
                        iconFamily="Feather"
                        iconColor="#40CDEF"
                        textStyle={{ color: "#5E72E4", fontSize: 12 }}
                        onPress={this.showE2C}
                        >
                        e2c.cg
                        </Button>
                        <Button
                        small
                        color="secondary"
                        shadowless
                        icon="credit-card"
                        iconFamily="Feather"
                        iconColor="#40CDEF"
                        textStyle={{ color: "#5E72E4", fontSize: 12 }}
                        >
                        Payer
                        </Button>
                    </Block>
                </Block>
            </ImageBackground>
            <Block flex center style={{ marginTop: -60 }}>
                <Button
                    disabled={false}
                    style={styles.downloadButton}
                    color="default"
                    onPress={this.downloadBill}
                >
                    Télécharger la facture en cours
                </Button>
            </Block>
            <Block flex center style={{ marginTop: theme.SIZES.BASE * 3 }}>
                <Text bold size={16} style={styles.titleFacture}>
                    Factures
                </Text>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
                    contentContainerStyle={{
                    paddingHorizontal: theme.SIZES.BASE / 2
                    }}
                >
                    {factures.map((item, index) =>
                        this.renderProduct(item, index)
                    )}
                </ScrollView>
            </Block>
        </Block>
      </ScrollView>
    )
  }

  renderProduct = (item, index) => {
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback
        style={{ zIndex: 3 }}
        key={`product-${item.title}`}
        /*onPress={() => navigation.navigate("Pro", { product: item })}*/
      >
        <Block center style={styles.productItem}>
          <Image
            resizeMode="cover"
            style={styles.productImage}
            source={{ uri: item.image }}
          />
          <Block center style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {item.title}
            </Text>
            <Text
              center
              size={16}
              color={item.status == 'payé' ? '#50CE88' : '#F3375B' }
              style={styles.productPrice}
            >
              {item.status}
            </Text>
            <Text center size={34}>
              {item.price}
            </Text>
            <Text
              center
              size={16}
              color={theme.COLORS.MUTED}
              style={styles.productDescription}
            >
              {item.description}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  
  home: {
    width: width,    
  },
  articles: {
    width: width,
    padding: theme.SIZES.BASE,
  },
  profileContainer: {
    width: width,
    height: height / 2,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 4
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    marginBottom: 60,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    height: Platform.OS === "android" ? 280 : 200
  },
  nameInfo: {
    marginTop: 35
  },
  downloadButton : {
      width: Platform.OS === "android" ? 280 : 334
  },
  titleFacture: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.2
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3
  },
  productPrice: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  productDescription: {
    paddingTop: theme.SIZES.BASE
    // paddingBottom: theme.SIZES.BASE * 2,
  }
});

export default Home;
