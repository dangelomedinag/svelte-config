const { db } = require('../firestore.js')

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}



const handler = (req, res) => {
  
	const {id} = req.body;
	
	let documentRef = db.doc(`productos/${id}`)

	documentRef.get().then(documentSnapshot => {
  let current = documentSnapshot.data().likes;

		documentSnapshot.ref.update({likes: current + 1}).then(result => {
			res.status(200).json({id, likes: current + 1, updated_at: result._writeTime._seconds})
		})
	}).catch(err=> {
		res.status(301).json(JSON.stringify({message: "no se pudo actualizar el documento", err}))
	})
	 
}

module.exports = allowCors(handler)


