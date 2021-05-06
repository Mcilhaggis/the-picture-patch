const AWS = require("aws-sdk");
const fs = require('fs');

//  aws-sdk to create the interface with DynamoDB
AWS.config.update({
  region: "us-east-2",
});
// Documentclient() class offers a level of abstraction that enables us to use JavaScript objects as arguments and return native JavaScript types
const dynamodb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

console.log("Importing thoughts into DynamoDB. Please wait.");
// Using file system package to read the users.json file
const allUsers = JSON.parse(fs.readFileSync('./server/seed/users.json', 'utf8'));
// loop over the allUsers array and create the params object with the elements in the array
allUsers.forEach(user => {
  const params = {
    TableName: "Submission",
    Item: {
      "username": user.username,
      "createdAt": user.createdAt,
      "submission": user.submission
    }
  };
// adding to table with put method
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
});