import { prisma } from "../config/prisma";
// POST /users

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



const deleteUser=async (req,res)=>{
  try{
     const id = parseInt(req.params.id);
    await prisma.user.delete({where:{id}})
    res.json({message:"User deleted successfully"})

  }catch(error){
    res.status(500).json({error:error.message})

  }
}

export {getUsers,deleteUser };