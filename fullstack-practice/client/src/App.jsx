import { useEffect } from 'react';
import './App.css'
import { useState } from 'react'
import axios from 'axios';

function App() {
  const [joke, setJoke] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:5000/api/joke")
    .then((res) => setJoke(res.data[0]))
    .catch((err) => console.error(err));
  }, []);

  return (
    <>
    <div>
      <h1>{joke ? joke.fact : "Loading"}</h1>
    </div>
    </>
  )
}

export default App
