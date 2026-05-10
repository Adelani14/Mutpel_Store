import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    password: String,

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    profileImage: {
        type: String,
        default: ""
    }

})

export default mongoose.model("User", userSchema)