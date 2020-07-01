import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
	apiKey: 'AIzaSyCyPrlVCn20hEl-ZcCuoXl2U0SOp3kfHSY',
	authDomain: 'crown-db-e020d.firebaseapp.com',
	databaseURL: 'https://crown-db-e020d.firebaseio.com',
	projectId: 'crown-db-e020d',
	storageBucket: 'crown-db-e020d.appspot.com',
	messagingSenderId: '350806127928',
	appId: '1:350806127928:web:071e682a9d296b39b1fdcd',
}

firebase.initializeApp(config)

export const auth = firebase.auth()

export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return
	const userRef = firestore.doc(`users/${userAuth.uid}`)
	const snapShot = await userRef.get()
	if (!snapShot.exists) {
		const { displayName, email } = userAuth
		const createdAt = new Date()
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			})
		} catch (err) {
			console.log('Error creating user', err.message)
		}
	}
	return userRef
}

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey)
	const batch = firestore.batch()
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc()
		batch.set(newDocRef, obj)
	})
	return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data()
		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		}
	})
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection
		return accumulator
	}, {})
}
