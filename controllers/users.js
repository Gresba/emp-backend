import User from "../models/User.js"

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

        if(user)
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

        if(user)
            return res.status(200).json(user)

        res.status(400).json({ error: "User not found!" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { Email, Full_Name, Username, Password } = req.body;

        if(!Email || !Full_Name|| !Username || !Password )
        {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = new User(req.body)

        await user.save();

        res.status(201).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json( { error: err.message });
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
        res.status(500).json( { error: err.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const params = req.params;

        const id = params.id;

        const deleted = await User.findByIdAndDelete(id)

        if(deleted)
            return res.status(200).send("User successfully deleted")
        
        throw new Error("Character Not Found")
    } catch (err) {
        console.log(err);
        res.status(500).json( { error: err.message });
    }
}
