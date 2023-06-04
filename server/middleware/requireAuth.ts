import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.ts";

interface AuthenticatedRequest extends Request {
  user?: string;
}

const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const { _id } = jwt.verify(token, process.env.SECRET!) as {
      _id: string;
    };
    req.user = (await User.findOne({ _id }).select("_id"))?.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "You must be logged in" });
  }
};

export default requireAuth;
