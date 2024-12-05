import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Home() {

  const [pacients, setPacient] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/pacient")
    setPacient(result.data)
  }


  return (
    <div className='container'>
      <div className='py-4'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nome</th>
              <th scope="col">Nome do dependente</th>
              <th scope="col">Valor devido</th>
              <th scope="col">Ver mais</th>
            </tr>
          </thead>
          <tbody>
            {
              pacients.map((pacient, index) => (
                <tr>
                  <th scope="row" Key={index}>{index + 1}</th>
                  <td>{pacient.name}</td>
                  <td>{pacient.dependentName}</td>
                  <td>{pacient.owedValue}</td>
                </tr>
              ))
            }


          </tbody>
        </table>
      </div>
    </div>
  )
}
