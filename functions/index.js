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
    const mailgunConfig = require("./.mailgun.json");
    const fromEmail = `Buzz 😃 <buzz@${mailgunConfig.domain}>`;
    const mailgun = require("mailgun-js")({
      apiKey: mailgunConfig.privateApiKey,
      domain: mailgunConfig.domain
    });
    const data = {
      from: fromEmail,
      to: toEmail,
      subject: "New picture!! 📸",
      text: `You can download your new picture here: ${pictureUrl}`,
      html: `<a href="${pictureUrl}"><img src="${pictureUrl}"/></a>`
    };
    console.log(
      `Sending email to ${toEmail} from ${fromEmail} with data: ${JSON.stringify(
        data
      )}`
    );
    mailgun.messages().send(data, function(error, body) {
      if (error) {
        console.log(`Error sending email: ${error}`);
      } else {
        console.log(`Email sent properly with body: ${JSON.stringify(body)}`);
      }
      done();
    });
  });
}
