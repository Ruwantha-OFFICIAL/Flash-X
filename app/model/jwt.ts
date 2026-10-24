import mongoose, {
  Schema,
  Model,
  Document
} from "mongoose";

export interface IJwt {
  user_name: string;
  token: string;
  createdAt?: any;
}

const token = new Schema<IJwt>({
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
    expires: 432000
  }
});

const tokens: Model<IJwt> = mongoose.models.jwt_tokens || mongoose.model("jwt_tokens", token);

export default tokens;
