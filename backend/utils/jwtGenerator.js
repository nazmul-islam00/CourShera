import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtGenerator = (person_id) => {
    const payload = {
        person: person_id,
    };
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
};

export default jwtGenerator;