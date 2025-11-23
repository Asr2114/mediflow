import jwt from 'jsonwebtoken'

//admin authh middleware
const authAdmin = async (req, res, next) =>{
    try{

        const {atoken} = req.headers;
        if(!atoken){
            return res.json({success:false, message:"Not Authorized, Login Again"});
        }

        //verify token
        const token_decod = jwt.verify(atoken, process.env.JWT_SECRET);
        
        console.log("Token Decoded:", token_decod);
        console.log("Admin Email:", process.env.ADMIN_EMAIL);
        
        if(token_decod.email !== process.env.ADMIN_EMAIL){
            return res.json({success:false, message:"Not Authorized, Login Again"});
        }

        next();

    }catch(error){
        console.log("Auth Error:", error)
        res.json({success:false, message:error.message})
    }

}

export default authAdmin;