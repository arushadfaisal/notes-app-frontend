import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="header">
        <div className="pb-6">
          <h1>Simple Notes App</h1>
          <h3>This is a simple notes app made for learning Laravel + React w/ Tailwind CSS</h3>
        </div>
      </section>

      <section id="body">
        <div class="addNote flex flex-row w-full h-auto mx-auto my-4 max-w-9/10 md:max-w-8/10 
                    justify-center items-center bg-slate-700/10">
          <div class="flex flex-col w-full h-auto items-center gap-2 p-3">
            <label className='w-full flex justify-center'>
              <input 
                name="title" 
                defaultValue="Title" 
                class="w-full p-4 bg-slate-800/30"/>
            </label>
            <label className='w-full flex justify-center'>
              <textarea 
                name="content" 
                defaultValue="Content" 
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                class="w-full min-h-32 h-auto p-4 bg-slate-800/30 align-top resize-y"/>
            </label>
            <div id="addNoteButtons" className='flex w-full flex-row gap-4 justify-between'>
                <button className='px-1'>Reset</button>
                <button className='px-1'>Add</button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">

        </div>
      </section>

        
        <div className="ticks"></div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

      <div className="ticks"></div>

      

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
