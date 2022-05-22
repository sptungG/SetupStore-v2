const User = require("../user/model.user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email, phone, email_verified } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture, phone, emailVerified: email_verified },
    { new: true }
  );

  if (user) {
    // console.log("USER UPDATED", user);
    res.status(200).json(user);
  } else {
    const newUser = await new User({
      email,
      phone: phone,
      name: name ?? email.split("@")[0],
      picture: picture ?? "https://source.unsplash.com/random?setup",
      emailVerified: email_verified 
    }).save();
    // console.log("USER CREATED", newUser);
    res.status(200).json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  const foundUser = await User.findOne({ email: req.user.email }).exec();
  if (!foundUser) return res.status(404).json({ err: `${email} not found!` });
  if (["deleted", "inactive"].includes(foundUser.status)) return res.status(401).json({ err: `${email} is inactive user` });
  res.status(200).json(foundUser);
};
