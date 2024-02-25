import mongoose from "mongoose";

uri ="mongodb+srv://nimmo:lyHLDfYzADbWpqVv@cluster0.ufw3nnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = () =>{
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};//Su9gsaMSTFmDmQat

export {connectDB};
//mongodb+srv://<username>:<password>@cluster0.ufw3nnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

//mongodb+srv://<username>:<password>@cluster0.ufw3nnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0