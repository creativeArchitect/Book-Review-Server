import mongoose from 'mongoose'

const connectDB = async ()=>{
    try{
        const { connection } = await mongoose.connect(process.env.DB_CONNECTION_URI);

        if(connection){
            console.log("database is connected to HOST: " + connection.host);
        }
    }catch(err){
        console.log("ERROR: " + err);
        process.exit(1);
    }
}


export default connectDB;

