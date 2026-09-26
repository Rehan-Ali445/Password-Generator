import { useState, useEffect, useCallback } from "react";
import "./index.css";

function App() {
  let [length, setLength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "`!@#$%^&*(){}|?/<>";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [numAllowed, charAllowed, length]);
  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    alert("Password copied!");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="w-full min-h-screen bg-gray-900  flex justify-center items-center ">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl">
        <h1 className="text-3xl text-white text-center font-bold mb-10">
          Password Generator
        </h1>

        <div className="flex mb-5 bg-white rounded-2xl shadow-3">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="w-full px-4 py-3 rounded-l-lg outline-none"
          />

          <button
            onClick={copyPassword}
            className="bg-blue-600 text-white px-5 rounded-r-xl"
          >
            Copy
          </button>
        </div>

        <div className="text-white">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="6"
              max="30"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <span>Length: {length}</span>
          </div>

          <div className="flex gap-2 mt-4">
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed((prev)=>!prev)}
            />

            <label>Include Numbers</label>
          </div>

          <div className="flex gap-2 mt-3">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev)=>!prev)}
            />

            <label>Include Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
