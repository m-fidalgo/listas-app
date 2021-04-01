import firebase from "@react-native-firebase/app";
import "@react-native-firebase/firestore";

const db = firebase.firestore();

export class DataStore {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  formatList(querySnapshot) {
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  async list() {
    const querySnapshot = await this.collection.get();
    return this.formatList(querySnapshot);
  }

  watch(callback) {
    return this.collection.onSnapshot((querySnapshot) => {
      callback(this.formatList(querySnapshot));
    });
  }

  async create(item) {
    const newItemRef = await this.collection.add({ body: item });
    const doc = await newItemRef.get();
    const newDoc = { ...doc.data(), id: doc.id };
    return newDoc;
  }

  async update(doc) {
    const { id } = doc;
    delete doc.id;
    await this.collection.doc(id).update(doc);
    return { id, ...doc };
  }

  async remove(id) {
    await this.collection.doc(id).delete();
    return id;
  }
}
