import { useState, useEffect } from 'react'
import './App.css'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

function App() {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL )
      .then(res => res.json())
      .then(data => {
        console.log("Backend Response:", data)
        setData(data.msg)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>Frontend Connected Test</h1>
      <h2>{data ? data : "Loading from backend..."}</h2>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}

export default App
