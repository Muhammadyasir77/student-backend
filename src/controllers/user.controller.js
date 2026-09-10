import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/FileUploads.js"
import ApiResponse from "../utils/apiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
    
    const {username, email, fullname,} = req.body
    console.log("email : ", email, "\nusername : ",username)

    if ( [username, email, fullname,password].some( (field) => field?.trim() ==="")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or : [{email}, {username}]
    })

    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.files?.avatar[0].path
    const coverImageLocalPath = req.files?.coverImage[0].path

    if (!avatarLocalPath){
        throw new ApiError(400,"avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar){
        throw new ApiError(400, "avatar file is required");
    }

   const user = await User.create({
        username : username.toLowerCase(), 
        fullname,
        email,
        avatar : avatar.url,
        coverImage : coverImage?.url,
        password
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, registerUser, "user registered successfully")
    )

})

export default registerUser