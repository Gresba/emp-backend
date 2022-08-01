import User from "../models/user.js"
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Pull token from environment variable or set token if not set
let secret = process.env.JWT_SECRET || "123";

let generateToken = async (id) => {
    return await Jwt.sign({ id: id}, secret, {
        expiresIn: "7d",
    });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

export const getUserById = async (req, res) => {
  try {
    const params = req.params;

    const id = params.id;

    const user = await User.findById(id);

    if (user)
      return res.json(user)

    res.status(400).json({ message: "User not found!" })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

export const getUserByEmail = async (req, res) => {
  try {
    const params = req.params;

    const email = params.email;

    const user = await User.find({ email: email });

    if (user)
      return res.status(200).json(user)

    res.status(400).json({ error: "User not found!" })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

export const register = async (req, res) => {
  try {
    
    // Grab the user data passed in from the body of the request
    const { Email, Full_Name, Username, Password } = req.body;

    // If any of the data is missing, then throw and error
    if (!Email || !Full_Name || !Username || !Password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user exist
    const doesExist = await User.findOne({ Email: Email });
    if(doesExist) {
        return res.status(400).json({ error: "User already exist"});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(Password, salt);

    const user = await User.create({
        ...req.body,
        Password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
        id: user._id,
        name: user.Full_Name,
        email: user.Email,
        token: await generateToken(user._id),
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

export const login = async (req, res) =>
{
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ Email: email });

        if( user && ( await bcrypt.compare(password, user.Password))){
            res.json({
                _id: user._id,
                name: user.Full_Name,
                email: user.Email,
                token: await generateToken(user._id),
            });
        }else{
            res.status(403).json({
                error: "Invalid Credentials",
            });
        }
    } catch (err){
        res.status(500).json({error: err.message});
    }
}

export const profile = async (req, res) => {
    let requestHeaders = req.headers.authorization;

    if (requestHeaders && requestHeaders.startsWith("Bearer")){
        try {
            let token = requestHeaders.split(" ")[1];
            
            const decoded = Jwt.verify(token, secret);

            let userProfile = await User.findById(decoded.id).select("-Password");
            
            res.json(userProfile);
        } catch {
            res.status(401).json({ error: "Not Authorized / Incorrect Token"});
        }
    } else {
        res.status(400).json({ error: "Missing Token"});
    }
}

export const updateUser = async (req, res) => {
  try {
    const params = req.params;

    const id = params.id;

    const user = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json(user)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const params = req.params;

    const id = params.id;

    const deleted = await User.findByIdAndDelete(id)

    if (deleted)
      return res.status(200).send("User successfully deleted")

    throw new Error("Character Not Found")
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
