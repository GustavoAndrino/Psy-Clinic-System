import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AlertCircleOutline, CheckmarkCircleOutline } from 'react-ionicons';

export default function Home() {
  const [pacients, setPacients] = useState([]); // Stores the full list
  const [filteredPacients, setFilteredPacients] = useState([]); // Stores the displayed list
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('ASC');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterAndSortPacients();
  }, [input, sortBy, sortDirection, pacients]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await axios.get('http://localhost:8080/api/auth/user-pacients');
      setPacients(result.data);
      setFilteredPacients(result.data); // Initialize filtered list with all pacients
    } catch (error) {
      console.error('Error loading pacients: ', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPacients = () => {
    let filtered = pacients.filter(pacient =>
      pacient.name.toLowerCase().startsWith(input.toLowerCase()) ||
      (pacient.dependentName && pacient.dependentName.toLowerCase().startsWith(input.toLowerCase()))
    );

    filtered.sort((a, b) => {
      let valueA = a[sortBy] ? a[sortBy].toLowerCase() : '';
      let valueB = b[sortBy] ? b[sortBy].toLowerCase() : '';

      if (sortDirection === 'ASC') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    setFilteredPacients(filtered);
  };

  const toggleSort = (field) => {
    setSortBy(field);
    setSortDirection(prev => (prev === 'ASC' ? 'DESC' : 'ASC'));
  };

  const deleteButton = async (id) => {
    if (window.confirm('Tem certeza de que quer deletar o paciente?')) {
      try {
        await axios.delete(`http://localhost:8080/pacient/delete/${id}`);
        setPacients(prev => prev.filter(pacient => pacient.id !== id));
      } catch (error) {
        console.error('Error deleting pacient:', error);
        alert('Error, pacient was not deleted');
      }
    }
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <h2>Todos Pacientes</h2>
        <input
          type="text"
          className='textalign: center}'
          placeholder='Pesquisar nome'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col" onClick={() => toggleSort('name')}>Nome</th>
              <th scope="col" onClick={() => toggleSort('dependentName')}>Nome do Dependente</th>
              <th scope="col">Valor devido</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPacients.map((pacient, index) => (
              <tr key={pacient.id}>
                <th scope="row">{index + 1}</th>
                <td>{pacient.name}</td>
                <td style={{ fontStyle: !pacient.dependentName ? 'italic' : 'normal' }}>
                  {pacient.dependentName || 'Sem dependente'}
                </td>
                <td>
                  {pacient.owedValue}&nbsp;&nbsp;&nbsp;
                  {pacient.owedValue > 0 ? (
                    <AlertCircleOutline color={'#fbb117'} title="owing" height="30px" width="30px" />
                  ) : (
                    <CheckmarkCircleOutline color={'#2ff924'} title="notOwing" height="30px" width="30px" />
                  )}
                </td>
                <td>
                  <Link className='btn btn-outline-light btn-primary' to={`/viewPacient/${pacient.id}`} state={{ pacient }}>
                    Detalhes
                  </Link>
                  <button className='btn btn-outline-light btn-danger' onClick={() => deleteButton(pacient.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
