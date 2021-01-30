const { db } = require('../firestore.js')

module.exports = (req, res) => {
  let productosarr = []
  const response = db.collection('productos').get().then(data => {
    data.forEach((doc) => {
      const obj = doc.data()
      productosarr = [...productosarr, {...obj}];
    });
    setTimeout(()=> res.status(200).json(productosarr), 3000) 
  });
    // response.forEach((doc) => {
    //   const obj = doc.data()
    //   productosarr = [...productosarr, {...obj}];
    // });


}
