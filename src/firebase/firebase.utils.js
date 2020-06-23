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
