const { MongoClient } = require('mongodb')

class Connection {
    url = "mongodb://127.0.0.1:27017"
    client = new MongoClient(this.url)
    database = this.client.db('garbage-management-system')
    collection = this.database.collection('AdminDetails')
    
    adminSignUp = async function(params) {
        console.log(params)
        await this.collection.insertOne(params)
    }

}

exports.Connection=Connection