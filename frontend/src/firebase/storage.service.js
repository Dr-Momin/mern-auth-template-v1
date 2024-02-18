import { firebaseConfig } from "./config.js";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

class StorageService {
  firebase = null;
  storage = null;

  constructor() {
    this.firebase = initializeApp(firebaseConfig);
    this.storage = getStorage(this.firebase);
  }

  async uploadFile(image) {
    let fileData = {
      progress: 0,
      imageError: false,
      imageURL: "",
    };

    // eslint-disable-next-line no-useless-catch
    try {
      const fileName = new Date().getTime() + "-" + image.name;
      const storageRef = ref(this.storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          fileData.progress = Math.round(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
          fileData.imageError = !!error;
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            fileData.imageURL = downloadURL;
            return fileData; // Return fileData when upload is complete
          } catch (error) {
            console.error("Error getting download URL:", error);
            throw error; // Throw error to be caught by caller
          }
        },
      );

      // Return a promise that resolves with fileData
      return new Promise((resolve, reject) => {
        uploadTask.on("state_changed", null, null, async () => {
          try {
            resolve(fileData);
          } catch (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      throw error;
    }
  }
}

const storageService = new StorageService();

export { storageService };
