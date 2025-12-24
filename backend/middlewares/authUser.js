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

//abhishek singh rajawat kuldeep singh rajawat seema kanwar rudra pratap singh rajawat girdhar singhr ajawat jagdish kanwar yogendra singh satendra singh ayush singh tyrin lannister the most important thing is tht game of thrones is the best series in the world and it cannot be replaced by any series in the world ever created in the history of mankind is

export default authUser;