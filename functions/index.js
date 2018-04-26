const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.sharePictureByEmail = functions.database
  .ref("/{userUid}/pictures/{picture}")
  .onCreate((newPicture, context) => {
    console.log(
      `Event received: ${JSON.stringify(
        newPicture
      )} with context: ${JSON.stringify(context)}`
    );
    const user = context.auth.token;
    const pictureUrl = newPicture.val().url;
    console.log(`New picture taken by user: ${JSON.stringify(user)}`);
    console.log(`New picture to share: ${JSON.stringify(newPicture)}`);
    console.log("New picture added with url: ", pictureUrl);
    return sendEmail(user.email, pictureUrl);
  });

function sendEmail(toEmail, pictureUrl) {
  return new Promise(done => {
    const emailConfig = require("./.emailConfig.json");
    const send = require("gmail-send")({
      user: emailConfig.user,
      pass: emailConfig.pass,
      to: toEmail,
      subject: "New picture!! 📸",
      text: `You can download your new picture here: ${pictureUrl}`,
      html: `<a href="${pictureUrl}"><img src="${pictureUrl}"/></a>`
    });
    console.log(`Sending email to ${toEmail} from ${emailConfig.user}`);
    send({}, function(error, result) {
      if (error) {
        console.log(`Error sending email: ${error}`);
      } else {
        console.log(
          `Email sent properly with result: ${JSON.stringify(result)}`
        );
      }
      done();
    });
  });
}
