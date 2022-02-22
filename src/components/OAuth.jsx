import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { db } from "../firebase.config"
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // check in collection 'users' for uuid
      // if doesn't exist, create user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate('/')
    } catch (error) {
      toast.error('Could not authorize with Google')
    }
  }

  return (
    <div className="socialLogin">
      <p>Sign { location.pathname === '/sign-up' ? 'Up' : 'In' } with </p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  )
}

export default OAuth