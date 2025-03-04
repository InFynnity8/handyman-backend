import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToDb = async () => {
    try {
        await connect(process.env.MONGO_URL);
        console.log('✅ Connected to database');
    } catch (error) {
        console.log(`⛔ Error connecting to database:\n${error}`);
        process.exit(1);
    }
};

export default connectToDb; 