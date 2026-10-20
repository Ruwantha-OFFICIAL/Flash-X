import mongoose,{
  Schema,
  Model,
  Document
} from "mongoose";


export interface ITmpUser extends Document {
  user_name: string;
  email: string;
  password: string;
  group: number;
}

const tmpUser = new Schema<ITmpUser>({
  user_name: {
    type: String,
    unique: true,
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  }
});

const tempUsers: Model<ITmpUser> = mongoose.models.tmp_user || mongoose.model("tmp_user", tmpUser);

export default tempUsers;