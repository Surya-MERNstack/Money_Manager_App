const model = require("../models/model");
const bcrypt = require("bcrypt");

// Register
async function Register(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUser = await model.UserSchema.findOne({ email: email });
    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Email is already in use", status: 401 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new model.UserSchema({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ message: "Registered Successfully", status: 200 });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Registration failed, please try again later",
        status: 500,
      });
  }
}

//Login
async function Login(req, res) {
  const { email } = req.body;

  try {
    const user = await model.UserSchema.findOne({ email : email });
    if (!user) {
      return res.status(401).json({ message: "Email not found", status: 401 });
    }


   const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

   if(!isPasswordValid) return res.status(402).json({message : "Password is wrong", status : 402})

   await res.status(200).json({ message: "Login Successful", status: 200 });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Login failed, please try again later", status: 500 });
  }
}


// POST: https://moneymanager-acen.onrender.com/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: req.body.type,
    color: req.body.color,
  });

  try {
    await Create.save();
    res.status(200).json(Create);
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
}

// GET: https://moneymanager-acen.onrender.com/api/categories
async function get_Categories(req, res) {
  try {
    const data = await model.Categories.find({});
    const filter = data.map((v) => ({ type: v.type, color: v.color }));
    return res.json(filter);
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
}

// POST:https://moneymanager-acen.onrender.com/api/transaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  const { name, type, amount } = req.body;

  const create = new model.Transaction({
    name,
    type,
    amount,
    date: new Date(),
  });

  try {
    await create.save();
    res.status(200).json(create);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// GET: https://moneymanager-acen.onrender.com/api/transaction
async function get_Transaction(req, res) {
  try {
    const data = await model.Transaction.find({});
    return res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE: https://moneymanager-acen.onrender.com/api/transaction/:_id
const delete_Transaction = async (req, res) => {
  const _id = req.params._id;
  try {
    const deletedTransaction = await model.Transaction.findByIdAndDelete(_id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    return res.status(200).json({ _id: _id });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// GET:https://moneymanager-acen.onrender.com/api/labels
async function get_Labels(req, res) {
  try {
    const result = await model.Transaction.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          pipeline: [
            {
              $project: {
                _id: 0,
                color: 1,
              },
            },
          ],
          as: "categories_info",
        },
      },
    ]);

    const data = result.map((v) => ({
      _id: v._id,
      name: v.name,
      type: v.type,
      amount: v.amount,
      color: v.categories_info[0]?.color || "", // Access the 'color' field from the first element
    }));

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Lookup Collection Error", error });
  }
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transaction,
  get_Transaction,
  delete_Transaction,
  get_Labels,
  Register,
  Login,
};
