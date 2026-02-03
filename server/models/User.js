import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique: true},
    password: {type:String, required:true},
},{timestamps: true});

// "Pre-save" hook: Hash the password before saving to DB
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.getSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model('User', userSchema);