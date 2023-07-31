import {User} from "../models/userModel.js";
import {generateToken} from "../config/jwtToken.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({role: "buyer"});
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({error: err.message});
  }
};

export const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const findUser = await User.findOne({email});

    if (findUser) {
      res.status(400).json({message: "Buyer already exists"});
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    const accessToken = await generateToken(newUser._id);
    // const refreshtoken = await generateToken(newUser._id);
    return res.status(201).json({
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: accessToken,
    });
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    // check if user exists or not
    const findUser = await User.findOne({email});

    if (findUser?.isBlocked) {
      res.status(403).json({error: "Your account has been blocked!"});
      return;
    }

    if (findUser) {
      const passwordMatch = await bcrypt.compare(password, findUser.password);

      if (!passwordMatch) {
        res.status(400).json({error: "Password doesn't match"});
        return;
      }

      const accessToken = await generateToken(findUser._id);
      // Refresh tokens are random strings generated by the authentication server.
      // They are generated after successful authentication
      const refreshToken = await generateToken(findUser._id);
      const updateUser = await User.findByIdAndUpdate(
        findUser?._id,
        {refreshToken: refreshToken},
        {new: true}
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });

      // return token
      res.status(200).json({
        _id: findUser?._id,
        name: findUser?.name,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: accessToken,
      });
    } else {
      res.status(404).json({error: "Buyer doesn't exist"});
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const logoutUser = async (req, res) => {
  try {
    // delete all cookie
    // if (req.params.role !== "buyer") {
    //   res.status(403).json({error: "You are not authorized to logout!"});
    //   return;
    // }

    const cookie = req.cookies;
    if (!cookie.refreshToken) {
      res.status(400).json({message: "No refresh token in cookie"});
      return;
    }

    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken: refreshToken});
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return;
    } else {
      await User.findByIdAndUpdate(user._id, {refreshToken: null});
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
    }

    res.status(200).json({message: "Logout successfully!"});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const deleteUser = async (req, res) => {
  console.log(req.user._id);
  try {
    const id = req.query.id;
    if (id !== req.user._id) {
      res.status(403).json({error: "You are not authorized to delete!"});
      return;
    }
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(200).json({message: "Delete user successfully!"}, user);
      return;
    }
  } catch (err) {
    res.status(400).json({error: err.message});
    console.log(err);
  }
};

export const blockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      {isBlocked: true},
      {new: true}
    );

    if (!user) {
      res.status(404).json({message: "User not found!"});
      return;
    }

    await user.save();
    res.status(200).json({message: "Block user successfully!", user});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};

export const unblockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      {isBlocked: false},
      {new: true}
    );

    if (!user) {
      res.status(404).json({message: "User not found!"});
      return;
    }

    await user.save();
    res.status(200).json({message: "Unblock user successfully!", user});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
};