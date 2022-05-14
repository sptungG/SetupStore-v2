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
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      phone: phone,
      name: name ?? email.split("@")[0],
      picture: picture ?? "https://source.unsplash.com/random?setup",
      emailVerified: email_verified 
    }).save();
    // console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
