import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import './App.css'

function App() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  //Button Control
  const [addButton, setAddButton] = useState('Add');
  const [resetButton, setResetButton] = useState('Reset');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editId){

      if (title.trim() === '' || content.trim() === ''){
        return (console.error("Please enter all information"));
      }else{
        try{
          const response = await fetch (`http://127.0.0.1:8000/api/notes/${editId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content })
          });

          const updatedNote = await response.json();

          setList(previousList => 
            previousList.map(note =>
              note.id === editId ? updatedNote : note
            )
          );

        }catch (error){
          console.error("Error editing note: ", error);
        }
      }



      handleReset();
      return console.log("This worked");
    }else{
      if (title.trim() === '' || content.trim() === ''){
        return (console.error("Please enter all information"));
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title,content }),
        });

        const newNote = await response.json();

        setList([...list, newNote]);

        handleReset();
      }
      catch (error) {
        console.error("Error adding new note: ", error);
      }
    }
  }

  const handleReset = () => {
    setTitle('');
    setContent('');
    setAddButton('Add');
    setResetButton('Reset');
    setEditId(null);
  };

  const setEdit = (title, content) => {
    setAddButton('Confirm');
    setResetButton('Cancel');
    setTitle(title);
    setContent(content);
  }

  const handleDelete = async (id) => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      setList(list.filter(note => note.id !== id));
    }
    catch (error) {
      console.error("Error deleting note", error);
    }
  }

  function Note({ id, title, content, onDelete }){
    return(
      <div className="flex flex-col bg-slate-700 p-4 pt-2 shadow-sm min-h-30">
        <div className="flex flex-row width-max place-content-between">
          <div className="p-2 min-h-10 text-start font-bold text-slate-200 text-lg">{title}</div>
          <div className="flex flex-row gap-2">
            <button className="p-2 my-2 text-ls bg-blue-900/85 rounded text-slate-100" onClick={() => {setEditId(id); setEdit(title, content);}}>
                    <MdEdit />
            </button>
            <button className="p-2 my-2 text-ls bg-red-900/85 rounded text-slate-100" onClick={() => onDelete(id)}>
                    <MdDelete />
            </button>
          </div>
        </div>
        <div className="p-2 min-h-20 text-start text-slate-300 bg-slate-800/50">{content}</div>
      </div>
    );
  }

  return (
    <>
      <section id="header">
        <div className="pb-6">
          <h1>Simple Notes App</h1>
          <h3>This is a simple notes app made for learning Laravel + React w/ Tailwind CSS</h3>
        </div>
      </section>

      <section id="body">
        <form onSubmit={handleSubmit} onReset={handleReset}
        className="addNote flex flex-row w-full h-auto mx-auto my-4 mb-10 max-w-9/10 md:max-w-8/10 
                    justify-center items-center bg-slate-700/10">
          <div className="flex flex-col w-full h-auto items-center gap-2 p-3">
            <label className='w-full flex justify-center'>
              <input 
                value={title}
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="w-full p-4 bg-slate-700/30"
              />
            </label>
            <label className='w-full flex justify-center'>
              <textarea 
                value={content}
                placeholder="Details"
                onChange={(e) => {
                  setContent(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="w-full min-h-32 h-auto p-4 bg-slate-700/30 align-top resize-y"/>
            </label>
            <div id="addNoteButtons" className='flex w-full flex-row gap-4 justify-between'>
                <button className='px-3 py-1  bg-indigo-300/80 text-indigo-900' type="reset">{resetButton}</button>
                <button className='px-3 py-1 font-bold bg-indigo-900 text-indigo-200' type="submit">{addButton}</button>
            </div>
          </div>
        </form>
      </section>

      <section id="notes">
        <div className="grid grid-cols-1 gap-6 p-4">
                {Array.isArray(list) && list.map((note) => (
                  <Note key={note.id} id={note.id} title={note.title} content={note.content} onDelete={handleDelete} />
                ))}
        </div>
      </section>



      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )

}



export default App
