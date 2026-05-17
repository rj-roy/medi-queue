require('dotenv').config();

const PORT = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const run = async ()=>{
    try{
        await client.connect();
        const db = await client.db(process.env.DB_NAME);
        const collection = await db.collection(process.env.DB_COLLECTION);
        
        app.get('/', async (req, res) =>{
            res.send('server is connected')
        });

    }finally{
        await client.close();
    }
};

run().catch(console.dir);
app.listen(PORT, (req, res)=>{
    console.log('running...!');
});