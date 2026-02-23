import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // ✅ Use same secret as in login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export default authMiddleware;