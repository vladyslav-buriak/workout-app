//@desc
//@roure POST /api/user/login
//@access Public


export const authUser = async (req,res) =>{
    req.json({message:'You are authenticated'})
}