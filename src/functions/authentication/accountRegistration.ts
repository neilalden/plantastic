import auth from '@react-native-firebase/auth';

export const accountRegister = (email, password, username) => {
  if (!username) {
    alert('accountRegister needs username');
    return;
  }
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      alert('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      }
    });
};
