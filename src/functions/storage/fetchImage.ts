import storage from '@react-native-firebase/storage';

export const fetchImage = url => {
  return storage()
    .ref(url)
    .getDownloadURL()
    .then()
    .catch(error => alert(error.message));
};
