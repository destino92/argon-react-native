import * as firebase from 'firebase';

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

export default firebase;