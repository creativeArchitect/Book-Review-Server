
import app from './src/app.js';
import connectDB from './src/config/database.js'


await connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log("server is running on port: " + process.env.PORT);   
    })
})
.catch(err => {
    console.log("Database is not connected!!");
})











