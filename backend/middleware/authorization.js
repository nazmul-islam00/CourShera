import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authorization = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(403).json("Not Authorized");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);
        req.person = payload.person;
    } catch (error) {
        console.log(error.message);
        return res.status(403).json("Not Authorized");
    }

    next();
};

export default authorization;