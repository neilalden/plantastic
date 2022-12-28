import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {signUpFormValidation} from '../validation/signUpFormValidation';
import {accountSaveToFirestore} from './accountSaveToFirestore';

export const accountRegister = (
  userType,
  name,
  email,
  password,
  confirmPassword,
) => {
  if (!signUpFormValidation(name, email, password, confirmPassword)) return;
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      const user = result.user;
      if (user.metadata.creationTime) {
        const data = {
          userType,
          name,
          email,
          uid: user.uid,
          createdAt: new Date(user.metadata.creationTime),
        };
        accountSaveToFirestore(user.uid, data);
        return result.user.updateProfile({
          displayName: name,
        });
      }
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      } else {
        alert(error);
      }
    });
};
