import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';

const SomethingScreen = () => {
  const [input, setInput] = useState();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          color: '#5D7F39',
          fontWeight: 'bold',
        }}>
        Please Type what you want to be Displayed
      </Text>
      <TextInput
        style={{
          color: '#5D7F39',
          borderWidth: 2,
          marginTop: 20,
          padding: 10,
          borderColor: '#5D7F39',
          borderRadius: 10,
        }}
        placeholder="Type here"
        placeholderTextColor="#d9d9d9"
        value={input}
        onChangeText={text => setInput(text)}></TextInput>

      <Text
        style={{
          fontSize: 18,
          color: '#5D7F39',
          fontWeight: '900',
          marginTop: 50,
        }}>
        OUTPUT GOES HERE
      </Text>
      <View
        style={{
          marginTop: 20,
          borderWidth: 3,
          padding: 20,
          borderRadius: 20,
          borderColor: '#5D7F39',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontWeight: 'bold',
            color: '#5D7F39',
          }}>
          {input}
        </Text>
      </View>
    </View>
  );
};

export default SomethingScreen;
