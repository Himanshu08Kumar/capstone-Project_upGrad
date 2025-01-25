import validator from "validator";
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
//API for adding doctor
const addDoctor = async (req, res) => {
    try {
      const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
  
      // Check if all fields are provided
      if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
        return res.json({ success: false, message: "Please fill all the fields" });
      }
  
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Invalid email format" });
      }
  
      // Validate strong password (minimum 8 characters)
      if (password.length < 8) {
        return res.json({ success: false, message: "Password should be at least 8 characters" });
      }
  
      // Hash the doctor's password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // If image upload is necessary (uncomment if required)
      // const imageFile = req.file;
      // const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      // const imageUrl = imageUpload.secure_url;
  
      // Prepare the doctor data
      const doctorData = {
        name,
        email,
        // image: imageUrl,  // Uncomment if image upload is necessary
        password: hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address: JSON.parse(address),  // Assuming address is sent as a stringified JSON
        date: Date.now(),
      };
  
      console.log("doctorData:", doctorData);  // Log doctor data for debugging
  
      // Save the new doctor to the database
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
  
      res.json({ success: true, message: "Doctor added successfully" });
  
    } catch (error) {
      console.error(error);  // Log the error for debugging
      res.json({ success: false, message: error.message || "Something went wrong" });
    }
  };

// const addDoctor = async (req, res) =>{
//     try{
//         const { name, email, password, speciality, degree, experience, about, fees, address }  = req.body;
//         // const imageFile = req.file;

//         //checking for all data to add doctor
//         // if(!name || !email || !password || !speciality  || !degree || !experience || !about || !fees || !address){
//         //     return res.json({success: false,message: "Please fill all the fields"})
//         // }

//         //validating email format
//         if(!validator.isEmail(email)){
//             return res.json({success: false,message: "Invalid email format"})
//         }

//         //validating strong password
//         if(password.length < 8){
//             return res.json({success: false,message: "Password should be at least 8 digit"});
//         }

//         //hashing doctors password
        
//         const hashedPassword = await bcrypt.hash(password, 10);

//         //upload image to cloudinary
//         // const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
//         // const imageUrl  = imageUpload.secure_url

//         const doctorData = {
//             name, 
//             email,
//            // image:imageUrl,
//             password:hashedPassword,
//             speciality,
//             degree,
//             experience,
//             about,
//             fees,
//             address:JSON.parse(address),
//             date:Date.now()
//         }
//         const newDoctor = new doctorModel(doctorData)
//         await newDoctor.save()

//         res.json({success:true, message:"Doctor added"})

//     }catch(error){
//         console.log(error)
//         res.json({success: false, message: error.messsage})
//     }
// }

//api for admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})

        }else{
            return res.json({success: false,message: "Invalid email or password"})
        }
    }catch(error){
        console.log(error)
        res.json({success: false, message:error.message})
    }
}
//API to get all doctors list for admin panel

const allDoctors = async (req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

//API to get all appointments list
const appointmentsAdmin = async (req, res) =>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

//API for appointment cancellation
const appointmentCancel = async (req, res) =>{
    try {
      const { appointmentId} = req.body
      const appointmentData = await appointmentModel.findById(appointmentId)
      
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
  
      //releasing doctor slot
  
      const {docId, slotDate, slotTime} = appointmentData
      const doctorData = await doctorModel.findById(docId)
  
      let slots_booked = doctorData.slots_booked
  
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
  
      await doctorModel.findByIdAndUpdate(docId, {slots_booked})
  
      res.json({success: true, message:"Appointment Cancelled"})
      
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }

  //API to get dashboard data for admin panel

  const adminDashboard = async (req, res) =>{
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors : doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success: true, dashData})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
  }

export {addDoctor, adminLogin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}
