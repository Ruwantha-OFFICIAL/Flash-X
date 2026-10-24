import mongoose, {
  Schema,
  Model,
  Document
} from "mongoose";

export interface IUser extends Document {
  user_name: string;
  email: string;
  password: string;
  group: number;
  api: {
    key: string;
    refresh_date?: any;
    usage: number;
  };
}

const user = new Schema<IUser>({
  user_name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  group: {
    type: Number,
    required: true
  },
  api: {
    key: {
      type: String,
      required: true,
      unique: true
    },
    refresh_date: {
      type: Date,
      required: true,
      default: Date.now()
    },
    usage: {
      type: Number,
      required: true
    }
  }
});

const users: Model<IUser> = mongoose.models.users || mongoose.model("users", user);

export default users;
