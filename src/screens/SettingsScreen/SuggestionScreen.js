import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SIZE} from '../../common/utils/size';
import {COLORS} from '../../common/utils/colors';
import Icon from '../../components/Icon';
import Screen from '../../components/Screen';

const SuggestionScreen = ({}) => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  return (
    <Screen style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: SIZE.x20,
          justifyContent: 'space-around',
        }}>
        <Text style={styles.mainHeader}>SUGGEST A CHANGE </Text>
        <Icon size={SIZE.x80} />
      </View>

      <Text style={styles.description}>
        Great! How can we improve our application?
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your name </Text>
        <TextInput
          placeholderTextColor={'#000'}
          style={styles.inputStyle}
          placeholder={'Mike Reyes'}
          onChangeText={userdata => setName(userdata)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your Email </Text>
        <TextInput
          placeholderTextColor={'#000'}
          style={styles.inputStyle}
          placeholder={'mikereyes123@gmail.com'}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> Enter your mobile </Text>
        <TextInput
          placeholderTextColor={'#000'}
          style={styles.inputStyle}
          placeholder={'+639 99 999 9999'}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.labels}> What changes can we do for you? </Text>
        <TextInput
          placeholderTextColor={'#000'}
          style={[styles.inputStyle, styles.multilineStyle]}
          placeholder={'Changes Description'}
          value={message}
          onChangeText={msg => setMessage(msg)}
          numberOfLines={5}
          multiline={true}
        />
      </View>
      {/* checkbox  */}

      {/* submit button  */}

      <TouchableOpacity
        style={[
          styles.buttonStyle,
          {
            backgroundColor: COLORS.GREEN500,
          },
        ]}>
        <Text style={styles.buttonText}> Request Changes </Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default SuggestionScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingHorizontal: 30,
  },
  mainHeader: {
    textShadowColor: COLORS.WHITE,
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 20,
    alignItems: 'center',
    paddingBottom: 10,
  },
  description: {
    fontSize: 20,
    color: COLORS.DARKERGREEN,
    paddingBottom: 20,
    lineHeight: 25,
    textShadowColor: COLORS.BLACK,
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
  },

  inputContainer: {
    marginTop: 20,
  },
  labels: {
    fontWeight: 'bold',
    // fontSize: 15,
    color: COLORS.BLACK,
    paddingBottom: 5,
    lineHeight: 25,
    textShadowColor: COLORS.WHITE,
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: COLORS.DARKERGREEN,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 2,
    color: 'black',
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: COLORS.BLACK,
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    padding: SIZE.x2,
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
