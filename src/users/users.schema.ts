// import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class Users extends Document {
//     @Prop()
//     name: string;

//     @Prop()
//     age: number;
// }

// export const UserSchema = SchemaFactory.createForClass(Users);

import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
    description: String,
})