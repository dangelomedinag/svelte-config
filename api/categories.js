const { db } = require('../firestore.js')

module.exports = (req, res) => {
  let categoriesarr = []
  const response = db.collection('categorias').get().then(data => {
    data.forEach((doc) => {
      const obj = doc.data()
      categoriesarr = [...categoriesarr, {...obj}];
    });
    
    res.status(200).json(categoriesarr);
  });
    // response.forEach((doc) => {
    //   const obj = doc.data()
    //   categoriesarr = [...categoriesarr, {...obj}];
    // });


}