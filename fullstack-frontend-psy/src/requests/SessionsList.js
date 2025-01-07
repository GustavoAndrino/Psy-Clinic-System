import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { AlertCircleOutline, CheckmarkCircleOutline } from 'react-ionicons';

export const SessionsList = () => {
    const [sessions, setSessions] = useState([])
    const [sortBy, setSortBy] = useState("name")
    const [sortDirection, setSortDirection] = useState("ASC")

    useEffect(() => {
        loadSessions();
      }, [sortBy, sortDirection])

    const loadSessions = async () => {
        try{
            const session = await axios.get
            (`http://localhost:8080/sessions?sortBy=${sortBy}&direction=${sortDirection}`)
            setSessions(session.data)
        }catch(error){
            console.log("Failed getting sessions" + sessions)
        }
    }
    

    const sort1 = () => {
      if(sortBy == "date"){
        const string = sortDirection == "ASC" ? "DESC" : "ASC"
        setSortDirection(string)
      }
      setSortBy("date")
    }
  
    const sort2 = () => {
      if(sortBy == "value"){
        const string = sortDirection == "ASC" ? "DESC" : "ASC"
        setSortDirection(string)
      }
      setSortBy("value")
    }

    const sort3 = () => {
      if(sortBy == "paid"){
        const string = sortDirection == "ASC" ? "DESC" : "ASC"
        setSortDirection(string)
      }
      setSortBy("paid")
    }

  return (
    <div className='container'>
      <div className='py-4'>
      <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col" onClick={sort1}>Data da sessão</th>
              <th scope="col" onClick={sort2}>Valor da sessão</th>
              <th scope="col" onClick={sort3}>Status do pagamento</th>
              <th scope="col">Detalhes do Paciente</th>
            </tr>
          </thead>
          <tbody>
            {
              sessions.map((session, index) => (
                <tr>
                  <th scope="row" Key={index}>{index + 1}</th>
                  <td>{session.date}</td>
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
