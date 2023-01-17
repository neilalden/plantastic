import firestore from '@react-native-firebase/firestore';
export const setDatabaseDocument = async (
  collection,
  data,
  docID = undefined,
) => {
  if (!collection || !data) return 'error with params';
  try {
    if (docID) {
      const res = await firestore()
        .collection(collection)
        .doc(docID)
        .set(data)
        .then(() => 'Successful');
      return res;
    } else {
      const res = await firestore()
        .collection(collection)
        .add(data)
        .then(() => 'Successful');
      return res;
    }
  } catch (e) {
    console.error(e.message);
  }
};
