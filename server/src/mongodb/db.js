import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery',true);
    //used in search query

    //databse connect 
    mongoose.connect(url)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error.message));
}

export default connectDB;