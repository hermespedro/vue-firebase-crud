import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
    apiKey: "AIzaSyBaCpN7xQCPfxRAjLyyB9MXCcN2GIgkMNk",
    authDomain: "vue-firebase-77d87.firebaseapp.com",
    projectId: "vue-firebase-77d87",
    storageBucket: "vue-firebase-77d87.appspot.com",
    messagingSenderId: "960500056691",
    appId: "1:960500056691:web:8417a0ad8d553df9f5e006"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}