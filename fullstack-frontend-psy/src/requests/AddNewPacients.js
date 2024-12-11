import React, { useState } from 'react';
import axios from 'axios';  // Importing axios

export const AddNewPacients = () => {
  const [pacient, setPacient] = useState({
    name: "",
    dependenteName: "",
    cpf: "",
    dependentCpf: "",
    adress: "",
    cep: "",
    phoneNumber: "",
    email: "",
    sessions: []
  });

  const onInputChange = (e) => {
    setPacient({ ...pacient, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    // Basic validation to ensure required fields are filled
    if (!pacient.name || !pacient.cpf || !pacient.dependenteName || !pacient.dependentCpf) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      axios.post("http://localhost:8080/newPacient", pacient)
        .then(response => {
          alert("Paciente adicionado com sucesso");
        })
        .catch(error => {
          console.error("Error adding patient: ", error);
          alert("Error adding patient");
        });
    } catch (error) {
      console.error("Error adding patient: ", error);
      alert("Error adding patient");
    }
  };

  return (
    <div className='container'>
      <div className='py-4'>
        {/* Patient Details */}
        <h2>Adicionar novo Paciente</h2>
        <table className="table table-bordered">
          <tbody style={{ textAlign: 'left' }}>
            <tr>
              <th>Nome</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome do Paciente"
                  name="name"
                  value={pacient.name}
                  onChange={(e) => onInputChange(e)}
                />
              </td>
            </tr>
            <tr>
              <th>CPF</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="CPF do Paciente"
                  name="cpf"
                  value={pacient.cpf}
                  onChange={(e) => onInputChange(e)}
                />
              </td>
            </tr>
            <tr>
              <th>Nome do dependente</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome do Dependente"  
                  name="dependenteName"
                  value={pacient.dependenteName}
                  onChange={(e) => onInputChange(e)}
                />
              </td>
            </tr>
            <tr>
              <th>CPF do dependente</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="CPF do Dependente"
                  name="dependentCpf"
                  value={pacient.dependentCpf}
                  onChange={(e) => onInputChange(e)}
                />
              </td>
            </tr>
            <tr>
              <th>Endereço</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Endereço do Paciente"
                  name="adress"
                  value={pacient.adress}
                  onChange={(e) => onInputChange(e)}
                />
              </td>
            </tr>
            <tr>
              <th>Cep</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="CEP do Paciente"
                  name="cep"
                  value={pacient.cep}
                  onChange={(e) => onInputChange(e)}
                />
              </td>
            </tr>
            <tr>
              <th>Celular</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Celular do Paciente"
                  name="phoneNumber"
                  value={pacient.phoneNumber}
                  onChange={(e) => onInputChange(e)}
                />
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email do Paciente"
                  name="email"
                  value={pacient.email}
                  onChange={(e) => onInputChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className='btn btn-outline-light btn-primary' onClick={handleApply}>Adicionar Paciente</button>
      </div>
    </div>
  );
};
