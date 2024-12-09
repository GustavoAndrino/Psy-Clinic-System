import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { AlertCircleOutline, CheckmarkCircleOutline } from 'react-ionicons';

export const SessionsList = () => {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        loadSessions();
      }, [])

    const loadSessions = async () => {
        try{
            const session = await axios.get("http://localhost:8080/sessions")
            setSessions(session.data)
        }catch(error){
            console.log("Failed getting sessions" + sessions)
        }
    }

    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy HH:mm');
      }

  return (
    <div className='container'>
      <div className='py-4'>
      <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Data da sessão</th>
              <th scope="col">Valor da sessão</th>
              <th scope="col">Status do pagamento</th>
              <th scope="col">Detalhes do Paciente</th>
            </tr>
          </thead>
          <tbody>
            {
              sessions.map((session, index) => (
                <tr>
                  <th scope="row" Key={index}>{index + 1}</th>
                  <td>{formatDate(session.date)}</td>
                  <td>{session.value}</td>
                  <td>{session.paid ? "Paid" : "Not Paid"}&nbsp;&nbsp;&nbsp;{!session.paid ? (
                  <AlertCircleOutline
                    color={'#fbb117'}
                    title="owing"
                    height="30px"
                    width="30px"
                  />) : (<CheckmarkCircleOutline
                    color={'#2ff924'}
                    title="notOwing"
                    height="30px"
                    width="30px"
                  />)}</td>
                  <td><Link className='btn btn-outline-light btn-primary' to={`/viewPacient/${session.thisPacientId}`}>Detalhes</Link></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
