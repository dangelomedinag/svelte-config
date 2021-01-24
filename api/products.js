const { db } = require('../firestore.js')

module.exports = (req, res) => {
  let productosarr = []
  const response = db.collection('productos').get().then(data => {
    data.forEach((doc) => {
      const obj = doc.data()
      productosarr = [...productosarr, {...obj}];
    });
    res.status(200).json(productosarr);
  });
    // response.forEach((doc) => {
    //   const obj = doc.data()
    //   productosarr = [...productosarr, {...obj}];
    // });


}