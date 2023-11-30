const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3000

// Middleware 

app.use(cors())
app.use(express.json())
const { ObjectId } = require('mongodb');


// Mongodb Code Start



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.odauuke.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const bioDataCollection = client.db('matrimoni-server').collection('bioData')


    // Bio Data Collection Start
    app.post('/bioData', async (req, res) => {
        const bioData = req.body;
        const result = await bioDataCollection.insertOne(bioData)
        res.send(result)
    })

    app.get('/bioData', async (req, res) => {
        const bioData = await bioDataCollection.find().toArray()
        res.send(bioData)
    })

    app.delete('/bioData/:id', async (req, res) => {
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await bioDataCollection.deleteOne(query)
        res.send(result)
    })

    app.get('/bioData/:id', async(req, res) => {
        const id = req.params.id
        const query = {_id: new ObjectId(id)}
        const result = await bioDataCollection.findOne(query)
        res.send(result)
    })
    // Bio Data Collection End

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// Mongodb Code End




app.get('/', (req, res) => {
    res.send('Matrimony is running')
})

app.listen(port, () => {
    console.log(`Matrimony is run on, ${port}`) 
})

