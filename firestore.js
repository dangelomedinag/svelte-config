// import dotenv from 'dotenv'
import admin from 'firebase-admin'
// const admin = require('firebase-admin')
// dotenv.config()

const adminsdkconfig = {
  "project_id": process.env.FIRESTORE_project_id ,
  "private_key": process.env.FIRESTORE_private_key.replace(/\\n/g, '\n'),
  "client_email": process.env.FIRESTORE_client_email ,
}

admin.initializeApp({
  credential: admin.credential.cert(adminsdkconfig)
});

// const db = admin.firestore()

// admin.firestore.FieldValue

export const db = admin.firestore();
export const util = admin.firestore;