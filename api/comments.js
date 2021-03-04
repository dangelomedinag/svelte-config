const { db } = require('../firestore.js')

module.exports = (req, res) => {
  let commentsarr = []
  const response = db.collection('comments').get().then(data => {
    data.forEach((doc) => {
      const obj = doc.data()
      commentsarr = [...commentsarr, {...obj}];
    });
    
    res.status(200).json(commentsarr).end();
  });
   
}