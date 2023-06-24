import { User } from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
const createToken = (_id) => {
    return jsonwebtoken.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};
// login user
const loginUser = async (req, res) => {
    const [email, password] = [req.body.email, req.body.password];
    try {
        const user = await User.login(email, password);
        // get additional fields from the document
        const { name, age, calorie_goal, protein_goal } = user;
        // create a token
        const token = createToken(user._id);
        res
            .status(200)
            .json({ email, token, name, age, calorie_goal, protein_goal });
    }
    catch (err) {
        res.status(400).json({ error: `${err}` });
    }
};
// signup user
const signupUser = async (req, res) => {
    const [email, password] = [req.body.email, req.body.password];
    try {
        const user = await User.signup(email, password);
        const { name, age, calorie_goal, protein_goal } = user;
        // create a token
        const token = createToken(user._id);
        res
            .status(200)
            .json({ email, token, name, age, calorie_goal, protein_goal });
    }
    catch (err) {
        res.status(400).json({ error: `${err}` });
    }
};
// update user
const updateUserByID = async (req, res) => {
    const user_id = req.user;
    try {
        await User.findByIdAndUpdate(user_id, {
            ...req.body,
        });
        const user = (await User.findById(user_id));
        if (!user) {
            return res.status(404).send("User not found");
        }
        const { email, name, age, calorie_goal, protein_goal } = user;
        const token = createToken(user._id);
        res
            .status(200)
            .json({ email, token, name, age, calorie_goal, protein_goal });
    }
    catch (err) {
        res.status(400).json({ error: `${err}` });
    }
};
//export default controller;
export { signupUser, loginUser, updateUserByID };
