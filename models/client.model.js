import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const clientSchema = Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (error) {
    next(error);
  }
});


const Client = model("Client", clientSchema);

export default Client;
