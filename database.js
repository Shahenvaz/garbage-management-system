const { MongoClient } = require('mongodb')

class Connection {
    url = "mongodb://10.244.0.150"
    client = new MongoClient(this.url)
    database = this.client.db('garbage-management-system')
    collection = this.database.collection('AdminDetails')
        
    adminSignUp = async function(params) {
        this.collection = this.database.collection('AdminDetails')
        await this.collection.insertOne(params)
    }
    adminLoginCheck = async function(params) {
        this.collection = this.database.collection('AdminDetails')
        let response = await this.collection.find(params).toArray()     
        return response
    }


}

exports.Connection=Connection