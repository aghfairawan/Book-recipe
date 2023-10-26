const {MongoClient} = require('mongodb')

const databaseMidleware = async (req, res, next)=>{
    const mongoClient = await new MongoClient(process.env.MONGO_URI).connect();
    db = mongoClient.db(process.env.MONGO_DB)
    req.db = db

    next()
};


// const databaseMidleware = async () => {
//     try {
//       const client = await new MongoClient(process.env.MONGO_URI).connect();
//       const db = client.db(process.env.MONGO_DB);
//       console.log( `<=================== CONNECT TO DB ==================`);
//       return db
//     } catch (error) {
//       console.log(error);
//     }
//   };

module.exports = databaseMidleware