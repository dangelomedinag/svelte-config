// const { db } = require('../firestore.js')

module.exports = (req, res) => {
  const {number} = req.body

  res.status(200).json({res: number * 2});
}