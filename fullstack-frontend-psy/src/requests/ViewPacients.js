import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ViewPacient.css';
import { AlertCircleOutline, CheckmarkCircleOutline, CloseCircleOutline } from 'react-ionicons'

export const ViewPacients = () => {

  const { id } = useParams()

  const [sessions, setSessions] = useState([])
  const [pacients, setPacients] = useState(null)
  const [loading, setLoading] = useState(true);
  const [owing, setOwing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState({})
  const [updated, setUpdated] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [style, setStyle] = useState({})
  const [disabled, setDisabled] = useState(true)

  //update Pacient and sessons list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientResponse = await axios.get(`http://localhost:8080/pacientById/${id}`);
        const sessionResponse = await axios.get(`http://localhost:8080/pacientSessionsList/${id}`);
        setPacients(pacientResponse.data);
        setSessions(sessionResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Data fetching complete
      }
    };

    fetchData();
  }, [id, updated]);

  useEffect(() => {
    setStyle({
      border: readOnly ? '0px solid gray' : '1px solid black',
      textAlign: 'justify',
      backgroundColor:'rgb(255, 255, 255)'})
  }, [readOnly])

  useEffect(() => {
    if (!loading) {
      const hasUnpaidSession = sessions.some(session => !session.paid);
      setOwing(hasUnpaidSession);
    }
  }, [loading, sessions, updated]);

  useEffect(() => {
    if (sessions.length > 0) {
      setPaymentStatus(
        sessions.reduce((acc, session) => {
          acc[session.id] = session.paid ? "true" : "false";
          return acc;
        }, {})
      );
    }
  }, [sessions, updated]);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pacients) {
    return <div>Error: Patient not found!</div>;
  }

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm');
  }



  const handlePaymentChange = (sessionId, value) => {
    setPaymentStatus((prevStatus) => ({
      ...prevStatus,
      [sessionId]: value,
    }));
  };

  const handleApplyChanges = async () => {
    try {
      // Loop through all sessions and update their payment status
      for (const session of sessions) {
        const updatedStatus = paymentStatus[session.id] === "true";
        if (updatedStatus !== session.paid) {
          await axios.put(`http://localhost:8080/sessionPaymentStatus/${session.id}`, {
            paid: updatedStatus
          });
        }
      }
      alert('Payment status updated successfully!');
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert('Failed to update payment status.');
    }

    try{
      await axios.put(`http://localhost:8080/edit/pacient/${pacients.id}`, pacients);
      alert("Patient updated successfully!");
      setUpdated((prev) => !prev);
      setReadOnly(true)
    }catch(error){
      console.error("Error updating patient:", error);
      alert('Failed to update patient.');
    }
  };

  const editInfo = () => {
    setReadOnly(!readOnly)
    setDisabled(!disabled)
  }

  const onInputChange = (e) =>{
    setPacients({ ...pacients, [e.target.name]: e.target.value });
  }

  return (
    <div className='container'>
      <div className='py-4'>
        {/* Patient Details */}
        <h2 className={owing ? "red" : "green"}>{pacients.name}</h2>
        <table className="table table-bordered">
          <tbody style={{ textAlign: 'left' }}>
            <tr>
              <th>Nome</th>
              <td><input
                type={"text"}
                className='form-control'
                placeholder='Nome do Procedimento'
                name='name'
                value={pacients.name}
                readOnly={readOnly}
                style={style}
                onChange={(e) => onInputChange(e)}
                disabled={disabled}
              /></td>
            </tr>
            <tr>
              <th>CPF</th>
              <td><input
                type={"text"}
                className='form-control'
                placeholder='Nome do Procedimento'
                name='cpf'
                value={pacients.cpf}
                readOnly={readOnly}
                style={style}
                onChange={(e) => onInputChange(e)}
                disabled={disabled}
              /></td>
            </tr>
            <tr>
              <th>Nome do dependente</th>
              <td><input
                type={"text"}
                className='form-control'
                placeholder='Nome do Dependente'
                name='dependentName'
                value={pacients.dependentName}
                readOnly={readOnly}
                style={style}
                onChange={(e) => onInputChange(e)}
                disabled={disabled}
              /></td>
            </tr>
            <tr>
              <th>Cpf do dependente</th>
              <td><input
                type={"text"}
                className='form-control'
                placeholder='Nome do Procedimento'
                name='dependentCpf'
                value={pacients.dependentCpf}
                readOnly={readOnly}
                style={style}
                onChange={(e) => onInputChange(e)}
                disabled={disabled}
              /></td>
            </tr>
            <tr>
              <th>Endereço</th>
              <td><input
                type={"text"}
                className='form-control'
                placeholder='Nome do Procedimento'
                name='adress'
                value={pacients.adress}
                readOnly={readOnly}
                style={style}
                onChange={(e) => onInputChange(e)}
                disabled={disabled}
              /></td>
            </tr>
            <tr>
              <th>Celular</th>
              <td><input
                type={"text"}
                className='form-control'
                placeholder='Nome do Procedimento'
                name='phoneNumber'
                value={pacients.phoneNumber}
                readOnly={readOnly}
                style={style}
                onChange={(e) => onInputChange(e)}
                disabled={disabled}
              /></td>
            </tr>
            <tr>
              <th>Email</th>
              <td><input
                type={"text"}
                className='form-control'
                placeholder='Nome do Procedimento'
                name='email'
                value={pacients.email}
                readOnly={readOnly}
                style={style}
                onChange={(e) => onInputChange(e)}
                disabled={disabled}
              /></td>
            </tr>
            <tr className='owedvalue'>
              <th>Valor devido</th>
              <td style={{ textAlign: 'left' }}>
                {pacients.owedValue}&nbsp;&nbsp;&nbsp;{owing ? (
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
            </tr>
          </tbody>

        </table>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Data da sessão</th>
              <th scope="col">Valor da sessão</th>
              <th scope="col">Status do pagamento</th>
              <th scope="col">Pago/Não pago</th>
            </tr>
          </thead>
          <tbody>
            {
              sessions.map((session, index) => (
                <tr>
                  <th scope="row" Key={index}>{index + 1}</th>
                  <td>{formatDate(session.date)}</td>
                  <td>{session.value}</td>
                  <td>{session.paid ? "Paid" : "Not Paid"}</td>
                  <td>
                    <input
                      type="radio"
                      name={`payment-${session.id}`}
                      value="true"
                      checked={paymentStatus[session.id] === "true"}
                      onChange={() => handlePaymentChange(session.id, "true")}
                    />
                    Paid
                    <input
                      type="radio"
                      name={`payment-${session.id}`}
                      value="false"
                      checked={paymentStatus[session.id] === "false"}
                      onChange={() => handlePaymentChange(session.id, "false")}
                    />
                    Not Paid

                  </td>
                </tr>
              ))
            }


          </tbody>
        </table>
        <button onClick={handleApplyChanges}>Apply</button>
        <button onClick={editInfo}>Edit</button>
      </div>
    </div>
  )
}
