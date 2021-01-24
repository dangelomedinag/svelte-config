const { db } = require('../firestore.js')

module.exports = (req, res) => {
  let productosarr = []
  const response = await db.collection('productos').get();
    response.forEach((doc) => {
      const obj = doc.data()
      productosarr = [...productosarr, {...obj}];
    });


  res.status(200).json(productosarr);
}