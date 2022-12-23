import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {COLORS} from '../common/utils/colors';
import Screen from '../components/Screen';
import {SIZE} from '../common/utils/size';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const PlantSuggestionScreen = () => {
  const [plantDescription, setPlantDescription] = useState('');
  const [imageURI, setImageURI] = useState('');
  const [plantScientificName, setPlantScientificName] = useState('');
  const [plantCommonName, setPlantCommonName] = useState('');

  const submit = () => {
    if (
      !plantScientificName &&
      !plantCommonName &&
      !plantDescription &&
      !imageURI
    ) {
      Alert.alert('Please fill all missing fields');
    } else {
      alert.alert(`Thank You for`);
      navigation.navigate(ROUTES.SETTINGS_SCREEN);
    }
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: true,
    };
    launchCamera(options, response => {
      console.log('Response: ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button', response.customButton);
      } else {
        const source = {
          uri: response.assets[0].uri,
        };
        setImageURI(source);
      }
    });
  };
  console.log(imageURI);
  const openGallery = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
      saveToPhotos: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response: ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button', response.customButton);
      } else {
        const source = {
          uri: response.assets[0].uri,
        };
        setImageURI(source);
      }
    });
  };

  return (
    <Screen>
      <ScrollView style={styles.mainContainer}>
        <View>
          <Text style={styles.mainHeader}>PLANT IMAGE</Text>
          <Image style={styles.image} source={imageURI} />
        </View>

        <View style={styles.actionButtonsView}>
          <TouchableOpacity
            onPress={() => {
              openCamera();
            }}>
            <View style={styles.buttonStyle}>
              <Text style={styles.buttonText}>TAKE A PICTURE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              openGallery();
            }}>
            <View style={styles.buttonStyle}>
              <Text style={styles.buttonText}>UPLOAD AN IMAGE</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labels}> Enter Plant Scientific Name </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder={'Ipomea Batatas'}
            value={plantScientificName}
            onChangeText={input => setPlantScientificName(input)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labels}> Enter Plant Common Name </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder={'Kamote'}
            value={plantCommonName}
            onChangeText={input => setPlantCommonName(input)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labels}> Plant Description </Text>
          <TextInput
            style={[styles.inputStyle, styles.multiLineStyle]}
            placeholder={'Description'}
            value={plantDescription}
            onChangeText={input => setPlantDescription(input)}
            numberOfLines={5}
            multiline={true}
          />
        </View>

        <TouchableOpacity
          onPress={submit}
          style={[
            styles.buttonStyle,
            {
              backgroundColor: COLORS.GREEN500,
            },
          ]}>
          <Text style={styles.buttonText}> Suggest Plant to be Added </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

export default PlantSuggestionScreen;
const styles = StyleSheet.create({
  mainHeader: {
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
    fontSize: 20,
    color: COLORS.GREEN200,
    fontWeight: 'bold',
    paddingTop: 20,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: SIZE.x200,
    borderEndWidth: SIZE.x6,
    borderWidth: SIZE.x2,
    borderColor: COLORS.GREEN100,
    height: SIZE.x200,
    borderRadius: SIZE.x26,
  },
  actionButtonsView: {
    marginTop: SIZE.x20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  mainContainer: {
    height: '100%',
    paddingHorizontal: 30,
  },
  inputContainer: {
    marginTop: 10,
  },
  labels: {
    fontWeight: 'bold',
    color: COLORS.GREEN300,
    paddingBottom: SIZE.x6,
    lineHeight: 25,
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1.2},
    textShadowRadius: 2,
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: COLORS.GREEN100,
    paddingHorizontal: 15,
    paddingVertical: SIZE.x6,
    borderRadius: 2,
  },
  multiLineStyle: {
    paddingVertical: 4,
  },
  buttonStyle: {
    backgroundColor: COLORS.DARKGREEN,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: SIZE.x6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZE.x12,
  },
  buttonText: {
    color: COLORS.GREEN200,
    fontWeight: 'bold',
    textShadowColor: '#313131',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    padding: SIZE.x2,
  },
});
