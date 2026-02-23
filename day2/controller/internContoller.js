import { prisma } from "../config/prisma.js";

const createIntern = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const name = req.body.name;
    const image = req.file?.path;

    const intern = await prisma.intern.create({
      data: {
        name,
        image,
        user: {
          connect: { id: req.user.id }
        }
      }
    });

    res.status(201).json(intern);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export default createIntern;