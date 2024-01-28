import mongoose from "mongoose";
export function connect(){
    mongoose.connect(process.env.MONGO_URL as string , {
        tls:true,
    })
    .then(() => console.log('database connected Successfully'))
    .catch((err) => console.log('connection err',err))
}