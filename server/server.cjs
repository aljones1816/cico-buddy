// connect to mongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aljones1816:7hh5G47NQl5rKds8@cico-buddy.xsotysw.mongodb.net/?retryWrites=true&w=majority?directConnection=true";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// insert a new user into the users collection in the cico-buddy database
async function insertUser(user) {
    try {
        await client.connect();
        const database = client.db('cico-buddy');
        const users = database.collection('users');
        const result = await users.insertOne(user);
        console.log(`New user created with the following id: ${result.insertedId}`);
    } catch (err) {
        console.log(err);
    }
}

insertUser({id: '1', name: 'Al', email: 'al@mail', password: '1234'});