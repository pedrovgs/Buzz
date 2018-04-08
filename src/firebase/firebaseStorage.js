import firebase from "firebase";
import moment from "moment";

export function uploadBase64Image(folderName, image) {
  const storageRef = firebase.storage().ref();
  const timestamp = moment().valueOf();
  const fileExtension = "jpg";
  const childRef = storageRef.child(
    `${folderName}/${timestamp}.${fileExtension}`
  );
  return childRef.putString(image, "data_url").then(() => {
    return childRef.getDownloadURL().then(resourceUrl => {
      const pictureUrl =
        resourceUrl.substring(
          0,
          resourceUrl.indexOf(fileExtension) + fileExtension.length
        ) + "?alt=media";
      addPictureToTheDatabase(folderName, pictureUrl);
      return pictureUrl;
    });
  });
}

export function getPicturesByFolder(folder) {
  return firebase
    .database()
    .ref(`${extractReferenceId(folder)}/pictures/`)
    .orderByChild("createdAt")
    .once("value")
    .then(result => {
      const firebaseObject = result.val();
      return Object.keys(firebaseObject)
        .map(key => {
          let storedObject = firebaseObject[key];
          storedObject.id = key;
          return storedObject;
        })
        .reverse();
    });
}

function addPictureToTheDatabase(folder, pictureUrl) {
  const childId = extractReferenceId(folder);
  const reference = firebase.database().ref(childId);
  const newKey = reference.child(childId).push().key;
  let updates = {};
  updates["/pictures/" + newKey] = {
    url: pictureUrl,
    createdAt: moment().valueOf()
  };
  return reference.update(updates);
}

function extractReferenceId(folder) {
  return folder.split(".").join("");
}
