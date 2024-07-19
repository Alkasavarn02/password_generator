import { useCallback, useEffect, useRef, useState } from 'react'
import "./App.css"

function App() {

  const [length,setLength] = useState(8)
  const [lowerAllowed,setLowerAllowed] = useState(false)
  const [numberAllowed,setAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')
  const [copy,setCopy] = useState("Copy")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=> {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    
    if (lowerAllowed) str += "abcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_{}|";

    for (let i = 0 ; i <= length ; i++) {

        let index = Math.floor(Math.random()*str.length + 1)

        pass = pass +  str.charAt(index)

    }

    setPassword(pass)

  },[length,lowerAllowed,numberAllowed,charAllowed,setPassword])

  const copiedToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopy("Copied");

    setTimeout(() => {
      setCopy("Copy");
    }, 1000)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,lowerAllowed,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className='body flex flex-column'>
          <h1>Password Generator</h1>
          <div className='main flex flex-column'>
            <div className='section1 flex'>
              <input type="text" value={password} placeholder=' Generate Password ' readOnly className='input' ref={passwordRef}/>
              <button
                className='btn'
                onClick={copiedToClip}
                style={{
                  backgroundColor: copy ==='Copy' ? 'white' : '#00004B',
                  color:copy ==='Copy' ? 'black' : 'white',
                }}
              >
                {copy}
              </button>
            </div>
            <div className='section2 flex'>
              <input type="range" min={8} max={16} value={length} onChange={(e)=>setLength(e.target.value)} className='range'/>
                <label>Length {length}</label>
              <input type="checkbox" id="lowerInput" defaultChecked = {lowerAllowed} onChange={()=>{setLowerAllowed((prev) => !prev)}}/>
                <label>LowerCase</label>
              <input type="checkbox" id="numInput" defaultChecked={numberAllowed} onChange={()=>{setAllowed((prev) => !prev)}}/>
                <label>Numbers</label>
              <input type="checkbox" id="charInput" defaultChecked={charAllowed} onChange={()=>setCharAllowed((prev) => !prev)}/>
                <label>SpecialCharacters</label> 
            </div>
          </div>
      </div>
    </>
  )
}

export default App
