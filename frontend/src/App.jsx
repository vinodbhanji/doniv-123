

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useUser } from '@clerk/clerk-react';

function App() {
  const [data, setData] = useState(null);
  const { user } = useUser ? useUser() : { user: null };

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then(res => res.json())
      .then(data => {
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
            <SignInButton mode="modal">
              <button>Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button>Sign Up</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>Welcome, {user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress || 'User'}!</span>
              <UserButton afterSignOutUrl="/" />
            </div>
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
