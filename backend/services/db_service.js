const { MongoClient, ObjectId} = require('mongodb');

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

    async deleteList(listID) {
        try {
            const result = await this.db.collection(listsCollection).deleteOne({
                _id: new ObjectId(listID)
            });

            return result.deletedCount > 0;
        } catch (err) {
            console.error(`Delete list error: ${err}`);
            return false;
        }
    }

    async archiveList(listID) {
        try {
            const list = await this.db.collection(listsCollection).findOne(
                { _id: new ObjectId(listID) },
                { projection: { archived: 1 } }
            );

            if (!list) {
                console.error(`List with ID ${listID} not found.`);
                return false;
            }

            const updatedArchived = !list.archived;
            const result = await this.db.collection(listsCollection).updateOne(
                { _id: new ObjectId(listID) },
                { $set: { archived: updatedArchived } }
            );

            if (result.modifiedCount === 1) {
                console.log(`List with ID ${listID} successfully updated to archived: ${updatedArchived}`);
                return true;
            } else {
                console.error(`Failed to update archived status for list with ID: ${listID}`);
                return false;
            }
        } catch (err) {
            console.error(`Archive list error: ${err}`);
            return false;
        }
    }



    async getList(listID){
        try{
            const list = await this.db.collection(listsCollection).findOne({ _id: new ObjectId(listID) });
            return list || undefined;
        }catch (e) {
            console.error("Loading list details error : ",e);
            return undefined;
        }
    }


    async  getOwnerLists(id){
        try{
            const query = await this.db.collection(listsCollection).find({ ownerID: id  }).toArray();
            return query || undefined;
        }catch (err){
            console.error(`Get owner list error : ${err}`);
            return undefined;
        }
    }

    async getParticipatingLists(id) {
        try {
            const lists = await this.db.collection(listsCollection).find({ participants: id }).toArray();

            if (!lists || lists.length === 0) return undefined;
            const ownerIDs = [...new Set(lists.map(list => list.ownerID))];
            const owners = await this.db.collection(usersCollection)
                .find({ _id: { $in: ownerIDs.map(ownerID => new this.ObjectId(ownerID)) } })
                .toArray();

            const ownerMap = owners.reduce((acc, user) => {
                acc[user._id.toString()] = { id: user._id, username: user.username };
                return acc;
            }, {});
            const updatedLists = lists.map(list => ({
                ...list,
                owner: ownerMap[list.ownerID] || { id: list.ownerID, username: 'Unknown' }
            }));

            return updatedLists;
        } catch (err) {
            console.error(`Get participating lists error: ${err}`);
            return undefined;
        }
    }


    async checkItem(listID, itemID) {
        try {
            const list = await this.db.collection(listsCollection).findOne(
                {
                    _id: new ObjectId(listID),
                    'items.id': itemID,
                }
            );
            if (!list) {
                console.error(`List with ID ${listID} not found.`);
                return undefined;
            }
            const item = list.items.find(item => item.id === itemID);
            if (!item) {
                console.error(`Item with ID ${itemID} not found.`);
                return undefined;
            }

            const updatedChecked = !item.checked;

            const result = await this.db.collection(listsCollection).updateOne({
                    _id: new ObjectId(listID),
                    'items.id': itemID,
                }, {
                    $set: {
                        'items.$.checked': updatedChecked
                    }
                }
            );

            if (result.modifiedCount === 1) {
                const updatedList = await this.db.collection(listsCollection).findOne(
                    { _id: new ObjectId(listID) },
                    { projection: { items: { $elemMatch: { id: itemID } } } }
                );

                const res = updatedList.items.find(item => item.id === itemID);
                console.log(res);
                return res;
            } else {
                return undefined;
            }

        } catch (e) {
            console.error(`Error checking item with ID : ${listID}, item ID : ${itemID}`, e);
            return undefined;
        }
    }

    async addListItem(listID, item) {
        try{
            const result = await this.db.collection(listsCollection).updateOne(
                {_id: new ObjectId(listID)},
                {$push: {items: item}},
            );
            return result.modifiedCount > 0;
        }catch (err) {
            console.error(`Add list item error : ${err}`);
            return false;
        }

    }

    async deleteListItem(listID, itemID) {
        try {
            const result = await this.db.collection(listsCollection).updateOne(
                { _id: new ObjectId(listID) },
                { $pull: { items: { id: itemID } } }
            );
            return result.modifiedCount > 0;
        } catch (err) {
            console.error(`Delete list item error: ${err}`);
            return false;
        }
    }






}

const instance = new DBService();
module.exports = instance;
