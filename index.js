const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const port = process.env.PORT || 3000

// Middleware 

app.use(cors('*'))
app.use(express.json())
const {
    ObjectId
} = require('mongodb');


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
        // await client.connect();

        const bioDataCollection = client.db('matrimoni-server').collection('bioData')
        const requestCollection = client.db('matrimoni-server').collection('request')
        const usersCollection = client.db('matrimoni-server').collection('users')
        const contactCollection = client.db('matrimoni-server').collection('contact')


        // Contact CRUD START 
        app.post('/contact', async(req, res) => {
            const contacts = req.body
            const result = await contactCollection.insertOne(contacts)
            res.send(result)
        })

        app.get('/contact', async(req, res) => {
            const result = await contactCollection.find().toArray()
            res.send(result)
        })
        // Contact CRUD End

        // Users CRUD Start 
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result)
        })

        app.post('/users', async (req, res) => {
            const users = req.body
            const result = await usersCollection.insertOne(users)
            res.send(result)
        })


        app.get('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const result = await usersCollection.findOne(query)
            res.send(result)
        })


        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const result = await usersCollection.deleteOne(query)
            res.send(result)
        })

        // Make As Admin 
        app.patch('/users/admin/:id', async (req, res) => {
            const id = req.params.id
            const filter = {
                _id: new ObjectId(id)
            }
            const updateDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await usersCollection.updateOne(filter, updateDoc)
            res.send(result)
        })


        // Users CRUD End 




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
            const query = {
                _id: new ObjectId(id)
            }
            const result = await bioDataCollection.deleteOne(query)
            res.send(result)
        })

        app.get('/bioData/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const result = await bioDataCollection.findOne(query)
            res.send(result)
        })
        // Bio Data Collection End

        // Request Form Start 
        app.post('/request', async (req, res) => {
            const request = req.body
            const result = await requestCollection.insertOne(request)
            res.send(result)
        })

        app.get('/request', async (req, res) => {
            const request = req.body
            const result = await requestCollection.find(request).toArray()
            res.send(result)
        })

        app.get('/request/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const result = await requestCollection.findOne(query)
            res.send(result)
        })

        app.delete('/request/:id', async (req, res) => {
            const id = req.params.id
            const query = {
                _id: new ObjectId(id)
            }
            const deleteRequest = await requestCollection.deleteOne(query)
            res.send(deleteRequest)
        })

        // Approve Request
        app.patch('/request/approved/:id', async (req, res) => {
            const id = req.params.id
            const filter = {
                _id: new ObjectId(id)
            }
            const updateDoc = {
                $set: {
                    isApproved: true
                }
            }
            const result = await requestCollection.updateOne(filter, updateDoc)
            res.send(result)
        })

        // Request Form End 

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
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