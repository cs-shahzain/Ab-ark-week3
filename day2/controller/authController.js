import bcrypt from 'bcrypt'
// import generateToken from '../utils/generateToken';
import { prisma } from "../config/prisma";
import jwt from 'jsonwebtoken'

const register=async (req,res)=>{
    try{
const {name,email,password,role}=req.body;
const hashedPassword=await bcrypt.hash(password,10);

const user= await prisma.user.create({
   data:{
     name,
    email,
    password:hashedPassword,
    role,
   }
})
res.status(201).json({
  message: "User Created",
  user
});

    }
catch(error){
     res.status(500).json({ error: error.message });
}

}


//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const uniqueUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!uniqueUser) {
      return res.status(404).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(
      password,
      uniqueUser.password
    );

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
  { id: uniqueUser.id, role: uniqueUser.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
    return res.json({ token });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export {register,login}