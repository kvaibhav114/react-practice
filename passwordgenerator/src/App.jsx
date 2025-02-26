import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numbers) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, charAllowed, setPassword]);

  const passwordRef = useRef(null);

  const copytoClip = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordRef.current?.value);
  };

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numbers, generatePassword]);

  return (
    <div className="container mx-auto bg-gray-700  h-screen py-10">
      <div className="w-full max-w-3xl mx-auto p-5 bg-gray-800 rounded-lg">
        <h1 className="text-4xl text-center text-white">Password Generator</h1>
        <div className="flex overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full p-2 mt-5 text-center bg-white rounded-lg"
            readOnly
            ref={passwordRef}
            placeholder="Password"
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 mt-5 mx-1 shrink-0 rounded-md hover:cursor-pointer"
            onClick={copytoClip}
          >
            Copy
          </button>
        </div>
        <div className="flex text-white">
          <div className="flex gap-2 mt-5 mx-2">
            <input
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex gap-2 mt-5 mx-2">
            <input
              type="checkbox"
              name="numberAllowed"
              value={numbers}
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
            />
            <label>Include Numbers</label>
          </div>
          <div className="flex gap-2 mt-5 mx-2">
            <input
              type="checkbox"
              name="charAllowed"
              value={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Include Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
