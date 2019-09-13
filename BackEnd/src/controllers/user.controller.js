const User = require("../models/Users");

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
  let users = await User.find();
  res.json(users);
};

userCtrl.getUser = async (req, res) => {
  let id = req.params.id;
  let users = await User.findById(id);
  res.json(users);
};

userCtrl.createUser = async (req, res) => {
  let { username, password } = req.body;
  let newUser = new User({
    username: username,
    password: password
  });

  await newUser.save();
  res.json({
    message: "user created"
  });
};

userCtrl.updateUser = async (req, res) => {
  let { username, password } = req.body;
  let id = req.params.id;

  await User.findByIdAndUpdate(
    { _id: id },
    {
      username,
      password
    }
  );
  res.json({
    message: "user updated"
  });
};

userCtrl.deleteUser = async (req, res) => {
    let id = req.params.id;

    await User.findByIdAndRemove(id);

    res.json({
        message: "user deleted"
      });
};

module.exports = userCtrl;
