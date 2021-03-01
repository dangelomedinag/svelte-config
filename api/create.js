const { db } = require('../firestore.js')

module.exports = (req, res) => {
  
	const {id} = req.body;
	
	let documentRef = db.doc(`productos/${id}`)

	documentRef.get().then(documentSnapshot => {
  let current = documentSnapshot.data().likes;

		documentSnapshot.ref.update({likes: current + 1}).then(result => {
			res.status(200).json({id, updated_at: response._writeTime._seconds})
		})
	}).catch(err=>{
		res.status(301).json(JSON.stringify({message: "no se pudo actualizar el documento", err}))
	})
	
}


