import firestore from '@react-native-firebase/firestore';

export const deleteFromDatabase = async (collection, docID) => {
  if (!collection || !docID) return 'error with params';
  try {
    const res = await firestore()
      .collection(collection)
      .doc(docID)
      .delete()
      .then(() => 'User deleted!');
    return res;
  } catch (e) {
    console.error(e.message);
  }
};
