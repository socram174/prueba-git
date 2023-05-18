import { useState } from 'react'
import './App.css'
import DataTable from './table'

function App() {

  return (
    <>


      <form action='http://localhost:3001/api/auth/register/admin' method='POST'>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' />

        <button type='submit'>Submit</button>
      </form>

      <DataTable data={[{"name":"Marcos Silva","age":25},{"name":"Marcelo Alejandro","age":23}]} />
    </>
  )
}

export default App
