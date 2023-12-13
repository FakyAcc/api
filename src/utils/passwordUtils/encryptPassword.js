import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config({ path: '.env' });

const encrypt = async (password) => {
    const encrypted =  await bcrypt.hash(password, parseInt(process.env.HASHING_STRENGTH));
    return encrypted;
}

export default encrypt;