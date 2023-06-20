const model = require('../models/model');

// POST: http://localhost:4000/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: req.body.type,
    color: req.body.color
  });

  try {
    await Create.save();
    res.status(200).json(Create);
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
}

// GET: http://localhost:4000/api/categories
async function get_Categories(req, res) {
  try {
    const data = await model.Categories.find({});
    const filter = data.map(v => ({ type: v.type, color: v.color }));
    return res.json(filter);
  } catch (err) {
    res.status(400).json({ message: "Error", err });
  }
}

// POST: http://localhost:4000/api/transaction
async function create_Transaction(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP Data not Provided");
  const { name, type, amount } = req.body;

  const create = new model.Transaction({
    name,
    type,
    amount,
    date: new Date()
  });

  try {
    await create.save();
    res.status(200).json(create);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// GET: http://localhost:4000/api/transaction
async function get_Transaction(req, res) {
  try {
    const data = await model.Transaction.find({});
    return res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// DELETE: http://localhost:4000/api/transaction/:_id
const delete_Transaction = async (req, res) => {
  const _id = req.params._id;
  try {
    const deletedTransaction = await model.Transaction.findByIdAndDelete(_id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    return res.status(200).json({ _id: _id });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// GET: http://localhost:4000/api/labels
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
                color: 1
              }
            }
          ],
          as: "categories_info"
        }
      }
    ]);

    const data = result.map(v => ({
      _id: v._id,
      name: v.name,
      type: v.type,
      amount: v.amount,
      color: v.categories_info[0]?.color || "" // Access the 'color' field from the first element
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
  get_Labels
};
