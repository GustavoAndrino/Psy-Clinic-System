import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { AlertCircleOutline, CheckmarkCircleOutline } from 'react-ionicons';

export default function Home() {

  const [pacients, setPacient] = useState([]);
  const [owing, setOwing] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, [])

  const checkOwedValue = (value) => {
    if (value > 0) {
      return true
    } else {
      return false
    }
  }

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/pacient")
      setPacient(result.data)
    } catch (error) {
      console.log("Error loading pacients" + error)
    } finally {
      setLoading(false)
    }
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
                  <td>
                    {pacient.owedValue}&nbsp;&nbsp;&nbsp;
                    {checkOwedValue(pacient.owedValue) ? (
                      <AlertCircleOutline
                        color={'#fbb117'}
                        title="owing"
                        height="30px"
                        width="30px"
                      />
                    ) : (
                      <CheckmarkCircleOutline
                        color={'#2ff924'}
                        title="notOwing"
                        height="30px"
                        width="30px"
                      />
                    )}
                  </td>
                  <td><Link className='btn btn-outline-light btn-primary' to={`/viewPacient/${pacient.id}`}>Detalhes</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
