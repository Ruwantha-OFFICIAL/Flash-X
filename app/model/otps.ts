import mongoose,{
  Schema,
  Model,
  Document
} from "mongoose"

export interface IOtp extends Document {
  user_name: string;
  otp_code: string;
}

const otp = new Schema<IOtp>({
  user_name: {
    type: String,
    required: true
  }, 
  otp_code:{
    type: String,
    required: true
  },
  url:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 200
  }
});

const otps: Model<IOtp> = mongoose.models.otps || mongoose.model("otps",otp)

export default otps;