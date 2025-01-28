import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { AlertCircleOutline, CheckmarkCircleOutline } from 'react-ionicons';
import { Button } from 'bootstrap';

export default function Home() {

  const [pacients, setPacient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("")
  const [update, setUpdated] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState("ASC")
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    loadUsers();
    console.log(pacients)
  }, [input, update, sortBy, sortDirection])

  const checkOwedValue = (value) => {
    if (value > 0) {
      return true
    } else {
      return false
    }
  }

  const loadUsers = async () => {
    setLoading(true); // Indicate loading
  
    try {
      const result = await axios.get('http://localhost:8080/api/auth/user-pacients', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setPacient(result.data); // Save the pacient list
    } catch (error) {
      console.error("Error loading pacients: ", error);
    } finally {
      setLoading(false); // Loading complete
    }
  };

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const deleteButton = (id) => {
    const confirmDelete = window.confirm("Tem certeza de que quer deletar o paciente ?");
    try{
      if(confirmDelete){
        axios.delete(`http://localhost:8080/pacient/delete/${id}`)
        alert("Pacient deleted successfully")
        setUpdated(!update)
      }

    }catch(error){
      console.error("Error deleting pacient:", error);
      alert("Error, pacient wasnt deleted")
    }
  }

  const dependentName = (dependentName) => {
    return dependentName == "" ? "Sem dependente" : dependentName
  }

  const sort1 = () => {
    if(sortBy == "name"){
      const string = sortDirection == "ASC" ? "DESC" : "ASC"
      setSortDirection(string)
    }
    setSortBy("name")
  }

  const sort2 = () => {
    if(sortBy == "dependentName"){
      const string = sortDirection == "ASC" ? "DESC" : "ASC"
      setSortDirection(string)
    }
    setSortBy("dependentName")
  }


  return (
    <div className='container'>
      <div className='py-4'>
        <h2>Todos Pacientes</h2>
      <input
        type={"text"}
        className='textalign: center}'
        placeholder='Pesquisar nome'
        name='input'
        value={input}
        onChange={(e) => onInputChange(e)}
      />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col" onClick={sort1}>Nome</th>
              <th scope="col" onClick={sort2}>Nome do dependente</th>
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
                  <td style={{ fontStyle: pacient.dependentName === "" || pacient.dependentName == null ? 'italic' : 'normal' }}>
                    {dependentName(pacient.dependentName)}</td>
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
                  <td>
                    <Link className='btn btn-outline-light btn-primary' to={`/viewPacient/${pacient.id}`}
                    state={{ pacient }}
                    >Detalhes
                    </Link>
                    <button className='btn btn-outline-light btn-danger' 
                    onClick={() => deleteButton(pacient.id)}>Deletar
                    </button>
                    </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
