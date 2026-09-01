import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required, Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Email is required, Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required, Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;