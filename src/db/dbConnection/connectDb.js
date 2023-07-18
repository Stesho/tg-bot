import mongoose from 'mongoose';

const connectDb = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    throw new Error('Database connection error');
  }
};

export default connectDb;
