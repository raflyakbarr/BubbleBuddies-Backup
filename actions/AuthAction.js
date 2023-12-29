import { Alert } from "react-native";
import FIREBASE from "../config/FIREBASE";
import { clearStorage, getData, storeData } from "../utils/localStorage";

export const registerUser = async (data, password) => {
  try {
    const success = await FIREBASE.auth().createUserWithEmailAndPassword(data.email, password);

    const dataBaru = {
      ...data,
      uid: success.user.uid,
    };

    await FIREBASE.database()
      .ref("users/" + success.user.uid)
      .set(dataBaru);
    //Local storage(Async Storage)
    storeData("user", dataBaru);
    return dataBaru;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const success = await FIREBASE.auth().signInWithEmailAndPassword(email, password);
    const resDB = await FIREBASE.database()
      .ref("/users/" + success.user.uid)
      .once("value");

    if (resDB.val()) {
      // Local storage (Async Storage)
      await storeData("user", resDB.val());
      return resDB.val();
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  FIREBASE.auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      clearStorage();
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

export const addOrder = async (data) => {
  try {
    // Ambil data yg sudah login dari fungsi 'getData'
    const userData = await getData("user");

    if (userData) {
      // Tambah note sesuai uid
      const dataBaru = {
        ...data,
        uid: userData.uid,
      };

      await FIREBASE.database()
        .ref("orders/" + userData.uid)
        .push(dataBaru);

      console.log("Order added successfully");
    } else {
      Alert.alert("Error", "Login Terlebih Dahulu");
    }
  } catch (error) {
    throw error;
  }
};

export const getImage = async (imageName) => {
  try {
    const storageRef = FIREBASE.storage().ref();
    const imageRef = storageRef.child(`images/${imageName}`);

    const imageUrl = await imageRef.getDownloadURL();
    console.log('File available at', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('Error getting image:', error);
    throw error;
  }
};

export const uploadImage = async (imageUri) => {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const metadata = {
      contentType: 'image/jpeg'
    };

    // Dapatkan nama file dari URI gambar
    const filename = imageUri.split('/').pop();
    const storageRef = FIREBASE.storage().ref();
    const imageRef = storageRef.child(`images/${filename}`);

    const uploadTaskSnapshot = await imageRef.put(blob, metadata);
    const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getOrder = async () => {
  const userData = await getData("user");
  const orderRef = FIREBASE.database().ref("orders/" + userData.uid);

  return orderRef
    .once("value")
    .then((snapshot) => {
      const orderData = snapshot.val();
      if (orderData) {
        const orderArray = Object.entries(orderData).map(([orderId, orderData]) => ({
          orderId,
          ...orderData,
        }));
        return orderArray;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error fetching user Order:", error);
      return [];
    });
};

export const editOrder = async (orderId, updatedData) => {
  try {
    // Ambil data pengguna yang sudah login dari fungsi 'getData'
    const userData = await getData("user");

    if (userData) {
      // Perbarui catatan berdasarkan noteId
      const noteRef = FIREBASE.database().ref(`orders/${userData.uid}/${orderId}`);
      const snapshot = await noteRef.once("value");
      const existingOrder = snapshot.val();

      if (existingOrder) {
        const updatedOrder = {
          ...existingOrder,
          ...updatedData,
        };

        await noteRef.update(updatedOrder);
        console.log("Order updated successfully");
      } else {
        console.log("Order not found");
      }
    } else {
      Alert.alert("Error", "Login Terlebih Dahulu");
    }
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const userData = await getData("user");

    if (!userData) {
      Alert.alert("Error", "Login Terlebih Dahulu");
      return;
    }

    const noteRef = FIREBASE.database().ref(`notes/${userData.uid}/${noteId}`);
    const snapshot = await noteRef.once("value");
    const existingNote = snapshot.val();

    if (!existingNote) {
      console.log("Note not found");
      return;
    }

    // Hapus catatan dari database
    await noteRef.remove();
    console.log("Note deleted successfully");
  } catch (error) {
    throw error;
  }
};
