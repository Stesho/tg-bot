import mongoose, { Schema } from 'mongoose';

const SubscriptionSchema = new Schema({
  chat_id: String,
  city: String,
  notificationTime: String,
});

const SubscriptionSchemaModel = mongoose.model(
  'Subscription',
  SubscriptionSchema,
);
export default SubscriptionSchemaModel;
