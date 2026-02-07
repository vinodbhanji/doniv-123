import { useEffect, useState } from 'react'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then(res => res.json())
      .then(data => {
        console.log("Backend Response:", data);
        setData(data.msg);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Doniv-123 Project</h1>
        <nav>
          <ul className="nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className="app-main">
        <section>
          <h2>{data ? data : "Loading from backend..."}</h2>
          <SignedOut>
            <SignInButton mode='model'/>
            <SignUpButton mode='model'/>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </section>
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Doniv-123. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
