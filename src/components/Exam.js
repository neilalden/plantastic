import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';

const exam = () => {
  const [input, setInput] = useState();
  return (
    <View>
      <Text>Please Type what you want to be Displayed</Text>
      <TextInput
        value={input}
        onChangeText={text => setInput(text)}></TextInput>
      <View>
        <Text>{input}</Text>
      </View>
    </View>
  );
};

export default exam;
