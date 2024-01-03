import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subsriber: {
      type: Schema.Types.ObjectId, /// One who is suscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, /// One who is suscribing to
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Subsription = model("Subscription", subscriptionSchema);

export default Subsription;
