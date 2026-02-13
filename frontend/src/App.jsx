import {Route, Routes, Navigate} from 'react-router'
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';
import {Toaster} from 'react-hot-toast'
import About from '../pages/About';
import Home from '../pages/Home';
import Problems from '../pages/Problems';

function App() {

  const {isSignedIn} = useUser();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/problem'  element={isSignedIn ? <Problems/> : <Navigate to={'/'} /> }/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Toaster/>
    </>
  );
}
export default App;