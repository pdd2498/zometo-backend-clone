const role = (role)=>(req,res,next)=>{
    const user = req.user;
    console.log(user);
    if(role !== user.role){
       return res.status(401).json({
            msg: "role not match"
        });
    };
    next();
}
module.exports = role;