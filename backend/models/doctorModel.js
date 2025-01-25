import mongoose from "mongoose";

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  speciality: { type: String, required: true },
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  fees: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Date, default: Date.now },
},{dbName:"healthcare"});

const doctorModel = mongoose.model("Doctor", doctorSchema);
export default doctorModel;

// const doctorSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true},
//     // image: {type: String, required: true},
//     speciality: {type: String, required: true},
//     degree: {type: String, required: true},
//     experience: {type: String, required: true},
//     about: {type: String, required: true}, 
//     available: {type: Boolean, default:true},
//     fees: {type: Number, required: true},
//     address: {type: Object, required: true},
//     date: {type: Number, required: true},
//     slots_booked: {type: Object, default:{}},
// },{minimize: false},{dbName:"healthcare"})

// const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)

// export default doctorModel