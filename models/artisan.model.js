import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const artisanSchema = Schema(
  {
    username: {
      type: String,
      // required: true,
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
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    artisanName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500, // Limit to 500 characters
    },
    service: {
      type: String,
      required: true,
    },
    rate: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "GHC",
      },
      per: {
        type: String,
        enum: ["hour", "day", "week", "month"],
        default: "day",
      },
    },
    workingDays: {
      type: [String], // Example: ["Monday", "Tuesday", "Friday"]
      required: true,
    },
    workingHours: {
      start: {
        type: String, // Example: "08:00 AM"
        required: true,
      },
      end: {
        type: String, // Example: "06:00 PM"
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"],
    },
    location: {
      city: { type: String, required: true },
      region: { type: String, required: true },
    },
    profilePicture: {
      type: String, // Store image URL or file path
      default: "",
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      reviews: [
        {
          userId: { type: Schema.Types.ObjectId, ref: "User" },
          rating: { type: Number, min: 1, max: 5 },
          comment: { type: String, maxlength: 300 },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  },
  { timestamps: true }
);

// Hash password before saving
artisanSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (error) {
    next(error);
  }
});

const Artisan = model("Artisan", artisanSchema);

export default Artisan;
