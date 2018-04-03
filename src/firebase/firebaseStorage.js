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
      return pictureUrl;
    });
  });
}
