import { model, Schema, Types } from "mongoose";




const historySchema = new Schema({
    userId:{ type: Types.ObjectId,
        ref: 'user',
        required: true,
    },
    

})