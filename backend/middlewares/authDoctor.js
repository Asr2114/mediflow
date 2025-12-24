import jwt from 'jsonwebtoken'

//userDoctor authh middleware
const authDoctor = async (req, res, next) =>{
    try{

        const dtoken = req.headers.dtoken;
        if(!dtoken){
            return res.json({success:false, message:"Not Authorized, Login Again"});
        }

        //verify token
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        
        if (!req.body) {
            req.body = {};
        }
        
        req.body.docId = token_decode.id; 

        next();

    }catch(error){
        console.log("Auth Error:", error)
        res.json({success:false, message:error.message})  
    }

}


export default authDoctor;