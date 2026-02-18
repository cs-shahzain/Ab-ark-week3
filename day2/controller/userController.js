import { prisma } from "../config/prisma";
// POST /users
const createUser = async (req, res) => {
  try {
    const { name, email,role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email required" });
    }

    const user = await prisma.user.create({
      data: { name, email,role }
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET /users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//updateuser

const findUser=async (req,res)=>{
  try{
    const id=parseInt(req.params.id);
    const user=await prisma.user.findUnique({where:{id}})
   if(user){
    res.json(user)
   }
   else{
    res.status(404).json({message:"No user found"})
   }
   


  }catch(error){
  res.status(500).json({error:error.message})
  }
}

const deleteUser=async (req,res)=>{
  try{
     const id = parseInt(req.params.id);
    await prisma.user.delete({where:{id}})
    res.json({message:"User deleted successfully"})

  }catch(error){
    res.status(500).json({error:error.message})

  }
}

export { createUser, getUsers,deleteUser,findUser };