import jwt from 'jsonwebtoken'

//user authh middleware
const authUser = async (req, res, next) =>{
    try{

        const {token} = req.headers;
        if(!token){
            return res.json({success:false, message:"Not Authorized, Login Again"});
        }

        //verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = token_decode;

        next();

    }catch(error){
        console.log("Auth Error:", error)
        res.json({success:false, message:error.message})
    }

}

export default authUser;