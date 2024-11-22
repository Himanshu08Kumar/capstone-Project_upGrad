import validator from "validator";
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
//API for adding doctor
const addDoctor = async (req, res) =>{
    try{
        const { name, email, password, speciality, degree, experience, about, fees, address }  = req.body;
        const imageFile = req.file;

        //checking for all data to add doctor
        if(!name || !email || !password || !speciality  || !degree || !experience || !about || !fees || !address){
            return res.status(400).json({success: false,message: "Please fill all the fields"})
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.status(400).json({success: false,message: "Invalid email format"})
        }

        //validating strong password
        if(password.length < 8){
            return res.status(400).json({success: false,message: "Password should be at least 8 digit"});
        }

        //hashing doctors password
        
        const hashedPassword = await bcrypt.hash(password, 10);

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl  = imageUpload.secure_url

        const doctorData = {
            name, 
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.status(201).json({sucess:true, message:"Doctor added"})

    }catch(error){
        console.log(error)
        res.json({sucess: false, message: error.messsage})
    }
}

export {addDoctor}
