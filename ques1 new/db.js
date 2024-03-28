import mongoose from "mongoose";
export function mongoConnection() {
    const mongoURI = 'mongodb+srv://chani:ashdod123@cluster0.sc4n2vg.mongodb.net/ATIDA?retryWrites=true&w=majority&appName=Cluster0';
    mongoose.connect(mongoURI)
        .then((result) => console.log("connected to db"))
        .catch((err) => console.log(err));
}
