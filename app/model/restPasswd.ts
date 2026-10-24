import mongoose, {
  Model,
  Schema,
  Document
} from "mongoose";

export interface IRest extends Document {
  user_name: string;
  token: string;
}

const rest = new Schema<IRest>({
  user_name: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 500
  }
});

const restLinks = mongoose.models.rest_link || mongoose.model("rest_link", rest);

export default restLinks;
