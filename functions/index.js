const functions = require('firebase-functions');

const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')();
const vision = require('@google-cloud/vision')();
const exec = require('child-process-promise').exec;
const LOCAL_TMP_FOLDER = '/tmp/';
const firebase = require('firebase');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// var visionClient = vision({
//   projectId: 'grape-spaceship-123',
//   keyFilename: '/path/to/keyfile.json'
// });

firebase.initializeApp({
  serviceAccount: {
    "project_id": "appforthaipeople",
    "private_key": "AIzaSyCuaC56vGOLjrNxKQlE1u5mxBHKrcVudng",
    "client_email": "napon.meka@gmail.com"
  },
  databaseURL: "https://appforthaipeople.firebaseio.com"
});

exports.detectLotto = functions.storage.object().onChange(event => {
    console.log('storage change');
  const object = event.data;  
  const file = gcs.bucket(object.bucket).file(object.name);
  let img_name = object['name']
  img_name = img_name.slice(0,img_name.indexOf('.'));
  console.log('img_name: ', img_name);
  console.log(object);
  console.log(file);
  // Exit if this is a move or deletion event.
  if (object.resourceState === 'not_exists') {
    return console.log('This is a deletion event.');
  }

//   Check the image content using the Cloud Vision API.
    var types = [
        'face',
        'label',
        'text'
        ];
        return vision.detect(file, types, (err, detections, apiResponse)=>{
            if (err){
                console.log('error:', err);
            }
            if (detections) {
                let numb = [];
                let predictResult;
                if (detections['text']) {
                    for(let i = 0 ;i < detections['text'].length; i++){
                        numb = numb.concat(detections['text'][i].match(/\d/g));
                    }
                    numb = numb.join("");
                }
                console.log('numb: ', numb);
                console.log('detections:', detections);
                if (numb.length >3) {
                    predictResult = numb.slice(0,3);
                } else {
                    predictResult = ''+Math.floor( Math.random() * 10)+''+Math.floor( Math.random() * 10)+''+Math.floor( Math.random() * 10);
                }
                // let img_key ='1234';
                firebase.database().ref('img/' + img_name).set({
                    predictResult: predictResult,
                });
            }
            if (apiResponse) {
                console.log('api response:', apiResponse);
            }
        });
//   return vision.detect(file).then(data => {
//       console.log('result:');
//       console.log(data);
//       return 'hello';
    // const safeSearch = data[0];
    // console.log('SafeSearch results on image', safeSearch);

    // if (safeSearch.adult || safeSearch.violence) {
    //   console.log('unsafe');
    //   return 'hello';
    // //   return blurImage(object.name, object.bucket, object.metadata);
    // }
//   });
});