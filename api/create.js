// const { db } = require('../firestore.js')

module.exports = async (req, res) => {
  const {number} = req.body

  res.status(200).json({res: number * 2});
}

router.put('/editar', async(req, res, next) => {
  const {id} = req.body;

  let documentRef = db.doc(`productos/${id}`)
  
  documentRef.update({likes: 100}).then(response => {
    res.status(200).json({id, updated_at: response._writeTime._seconds})
  }).catch(err=>{
    console.log(err)
    res.status(301).end(JSON.stringify({message: "no se pudo actualizar el documento", err}))
  })
})