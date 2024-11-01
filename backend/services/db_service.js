const { MongoClient } = require('mongodb');

const dbUrl = `mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

class DBService {
    constructor() {
        if (!DBService.instance) {
            DBService.instance = this;
        }
        this.connection = undefined;
    }

    async initConnection() {
        if (this.connection) {
            return true;
        }

        try {
            const client = new MongoClient(dbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            this.connection = await client.connect();
            console.log('Successfully connected to MongoDB');
            return true;
        } catch (err) {
            console.log('Error connecting to MongoDB:', err);
            return false;
        }
    }

    async closeConnection() {
        if (this.connection) {
            await this.connection.close();
            this.connection = undefined;
            console.log('Connection to MongoDB closed');
        }
    }
}

const instance = new DBService();
module.exports = instance;
