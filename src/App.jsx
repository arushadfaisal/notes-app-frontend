import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Note({ title, content }){
  return(
    <div className="flex flex-col bg-slate-700 p-6 shadow-sm min-h-30">
      <div className="p-2 min-h-10 text-start font-bold text-slate-200 text-lg">{title}</div>
      <div className="p-2 min-h-20 text-start text-slate-300 bg-slate-800/50">{content}</div>
    </div>
  );
}

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch ('http://127.0.0.1:8000/api/notes');
        const data = await response.json();
        if (Array.isArray(data)) {
          setList(data);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <section id="header">
        <div className="pb-6">
          <h1>Simple Notes App</h1>
          <h3>This is a simple notes app made for learning Laravel + React w/ Tailwind CSS</h3>
        </div>
      </section>

      <section id="body">
        <div className="addNote flex flex-row w-full h-auto mx-auto my-4 mb-10 max-w-9/10 md:max-w-8/10 
                    justify-center items-center bg-slate-700/10">
          <div className="flex flex-col w-full h-auto items-center gap-2 p-3">
            <label className='w-full flex justify-center'>
              <input 
                name="title" 
                defaultValue="Title" 
                className="w-full p-4 bg-slate-700/30"/>
            </label>
            <label className='w-full flex justify-center'>
              <textarea 
                name="content" 
                defaultValue="Content" 
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="w-full min-h-32 h-auto p-4 bg-slate-700/30 align-top resize-y"/>
            </label>
            <div id="addNoteButtons" className='flex w-full flex-row gap-4 justify-between'>
                <button className='px-3 py-1  bg-red-900 text-slate-300'>Reset</button>
                <button className='px-3 py-1 bg-sky-900 text-slate-300'>Add</button>
            </div>
          </div>
        </div>
      </section>

      <section id="notes">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-4">
                {Array.isArray(list) && list.map((note, index) => (
                  <Note key={note.id} title={note.title} content={note.content} />
                ))}
        </div>
      </section>



      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
