let AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();
let rekog = new AWS.Rekognition();

exports.handler = function (event, context, callback) {
    //console.log(JSON.stringify(event, null, 2));

    let s3 = event.Records[0].s3;
    rekog.detectLabels({
        Image: {
            S3Object: {
                Bucket: s3.bucket.name,
                Name: s3.object.key
            }
        },
        MaxLabels: 1
    }).promise()
        .then(data => {
            console.log(data);
            {
                ddb.put({
  TableName: 'gayani',
  Item: {
    'name': name,
    'label': label
  }
}).promise()
                    .then((data) => {
                        callback(null, data);
                    })
                    .catch((err) => {
                        callback(err);
                    });

            }
            let label = data.Labels[0].Name;


            /* drag-n-drop DDB table */
        })
        .catch(err => callback(err));
}