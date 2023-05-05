const { MongoClient } = require('mongodb')

class Connection {
    url = "mongodb://192.168.49.2:30001/"
    client = new MongoClient(this.url)
    database = this.client.db('garbage-management-system')
    collection = this.database.collection('AdminDetails')
    
    adminSignUp = async function(params) {
        console.log(params)
        await this.collection.insertOne(params)
    }

}

exports.Connection=Connection

//comment
