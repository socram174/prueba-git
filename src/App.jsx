import { useState,useEffect } from 'react'
import './App.css'
import DataTable from './table'

function App() {

  const [data, setData] = useState([{"name":"Marcos Silva","age":25},{"name":"Marcelo Alejandro","age":23},{"name":"Juan Perez","age":78}])
  const [changer, setChanger] = useState(0);

  useEffect(() => {
    let newData = data;
    newData.push({"name":"xd","age":30});
    setData(newData);
  }, [changer]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    var num = Math.floor(Math.random() * 1000);
    setChanger(num);
    e.target.reset();
  };


  return (
    <>


      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' required/>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' required/>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' required/>

        <button type='submit'>Submit</button>
      </form>

      <DataTable data={data} />
    </>
  )
}

export default App
