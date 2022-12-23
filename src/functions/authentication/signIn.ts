import auth from '@react-native-firebase/auth';
export const signIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch(error => {
      alert(error.message);
    });
};
