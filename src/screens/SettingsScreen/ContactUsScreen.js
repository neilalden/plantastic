import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {ROUTES} from '../../common/routes';
import {COLORS} from '../../common/utils/colors';
import Icon from '../../components/Icon';
import {SIZE} from '../../common/utils/size';
import Screen from '../../components/Screen';
import Header from '../../components/Header';

const Contact = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);

  const submit = () => {
    if (!name && !email && !phone && !message) {
      Alert.alert('Please fill all the fields');
    } else {
      Alert.alert(`Thank You ${name}`);
      navigation.navigate(ROUTES.SETTINGS_SCREEN);
    }
  };

  return (
    <Screen style={styles.mainContainer}>
      <Header />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: SIZE.x20,
          justifyContent: 'space-around',
        }}>
        <Text style={styles.mainHeader}>KEEP IN TOUCH </Text>
        <Icon size={SIZE.x80} />
      </View>

      <Text style={styles.description}>
        You can reach us anytime via plantasticMan@gmail.com
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your name </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={'Rei Nav'}
          value={name}
          onChangeText={userdata => setName(userdata)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your Email </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={'reiNav@gmail.com'}
          value={email}
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your mobile </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder={'+639 99 999 9999'}
          value={phone}
          onChangeText={phone => setPhone(phone)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> How can we help you? </Text>
        <TextInput
          style={[styles.inputStyle, styles.multiLineStyle]}
          placeholder={'State your Concern'}
          value={message}
          onChangeText={msg => setMessage(msg)}
          numberOfLines={5}
          multiline={true}
        />
      </View>

      {/* checkbox  */}

      <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.wrapper}>
        <CheckBox
          value={agree}
          style={styles.checkBox}
          onValueChange={() => setAgree(!agree)}
        />
        <Text style={styles.wrapperText} value={agree} disable={false}>
          I Agree with Terms of Use
        </Text>
      </TouchableOpacity>

      {/* submit button  */}

      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: agree ? COLORS.GREEN500 : 'rgba(217,217,217,0.5)',
          },
        ]}
        disabled={!agree}
        onPress={submit}>
        <Text style={agree ? styles.buttonActive : styles.buttonInactive}>
          {' '}
          Contact Us{' '}
        </Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  mainHeader: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 15,
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
  },
  description: {
    fontSize: 20,
    color: COLORS.GREEN300,
    paddingBottom: 20,
    lineHeight: 25,
  },

  inputContainer: {
    marginTop: 20,
  },
  labels: {
    fontWeight: 'bold',
    // fontSize: 15,
    color: COLORS.GREEN300,
    paddingBottom: 5,
    lineHeight: 25,
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: COLORS.GREEN100,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 2,
  },
  multiLineStyle: {
    paddingVertical: 4,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  buttonActive: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    padding: SIZE.x4,
  },
  buttonInactive: {
    color: '#D9D9D9',
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
    padding: SIZE.x4,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',

    marginTop: 20,
  },
  wrapperText: {
    marginLeft: 10,
    color: COLORS.GREEN300,
  },
});

export default Contact;
