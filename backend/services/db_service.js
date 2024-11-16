const { MongoClient } = require('mongodb');

const dbName = process.env.DB_NAME;
const dbUrl = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${dbName}`;

const usersCollection = 'users';
const listsCollection = 'lists';

class DBService {
    constructor() {
        if (!DBService.instance) {
            DBService.instance = this;
        }
        this.client = undefined;
        this.db = undefined;
    }

    async initConnection() {
        if (this.client) {
            return true;
        }

        try {
            const client = new MongoClient(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            this.client = await client.connect();
            this.db = this.client.db(dbName);
            console.log('Successfully connected to MongoDB');
            return true;
        } catch (err) {
            console.log('Error connecting to MongoDB:', err);
            return false;
        }
    }

    async closeConnection() {
        if (this.client) {
            await this.client.close();
            this.client = undefined;
            console.log('Connection to MongoDB closed');
        }
    }

    async addUser(user){
        try {
            const result = await this.db.collection(usersCollection).insertOne(user);
            return !!result.insertedId;
        }catch (err){
            console.error(`Add user error : ${err}`);
            return false;
        }
    }

    async getUser(email){
        try{
            const user = await this.db.collection(usersCollection).findOne({ email });
            return user || undefined;
        }catch (err){
            console.error(`Get user error : ${err}`);
            return undefined;
        }
    }

    async addList(list){
        try{
            const query = await this.db.collection(listsCollection).insertOne(list);
            return !!query.acknowledged;
        }catch (err){
            console.error(`Add list error : ${err}`);
            return false;
        }
    }



}

const instance = new DBService();
module.exports = instance;
