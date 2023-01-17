const express = require("express")
const User = require("../models/User")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")

const router = express.Router()

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.CRYPTOJS_SECRET
        ).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {
                $set: req.body
            }, {new: true}
            );
            res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
       await User.findByIdAndDelete(req.params.id);
       res.status(200).json("User has been deleted...")
    }catch(err){
     res.status(500).json(err)
    }
})

//GET
router.get("/find/:id", verifyTokenAndAdmin, async(req,res)=>{
    try{
       const User = await User.findById(req.params.id);
       const {password, ...others} = User._doc;
       res.status(200).json(others)
    }catch(err){
     res.status(500).json(err)
    }
})

module.exports = router;
