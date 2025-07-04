import { MongoClient } from "mongodb";
let MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI enviroment variable inside .env'
    );
}


const client: MongoClient = await MongoClient.connect(MONGODB_URI);
const runCollection = client.db('sample_runnings').collection('run');
const shoeCollection = client.db('sample_runnings').collection('shoe');
const userCollection = client.db('sample_runnings').collection('user');

// export { moviesCollection };
export { runCollection, shoeCollection, userCollection };