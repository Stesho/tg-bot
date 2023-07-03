import mongoose from 'mongoose';

const connectToDb = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    throw new error();
  }
};

export default connectToDb;
