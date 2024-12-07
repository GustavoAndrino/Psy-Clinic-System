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
  const [pacientName, setPacientName] = useState("")
  const [loading, setLoading] = useState(true);
  const [formattedDate, setFormattedDate] = useState()
  const [owing, setOwing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState({})
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientResponse = await axios.get(`http://localhost:8080/pacient/${id}`);
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
    if (!loading) {
      const hasUnpaidSession = sessions.some(session => !session.paid);
      setOwing(hasUnpaidSession);
      console.log(owing)
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
          // Send a PUT or PATCH request to update the payment status of the session
          await axios.put(`http://localhost:8080/sessionPaymentStatus/${session.id}`, {
            paid: updatedStatus
          });
        }
      }
      alert('Payment status updated successfully!');
      setUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert('Failed to update payment status.');
    }
  };

  return (
    <div className='container'>
      <div className='py-4'>
        {/* Patient Details */}
        <h2 className={owing ? "red" : "green"}>{pacients.name}</h2>
        <table className="table table-bordered">
          <tbody style={{ textAlign: 'left' }}>
            <tr>
              <th>Nome</th>
              <td>{pacients.name}</td>
            </tr>
            <tr>
              <th>CPF</th>
              <td>{pacients.cpf}</td>
            </tr>
            <tr>
              <th>Nome do dependente</th>
              <td>{pacients.dependentName}</td>
            </tr>
            <tr>
              <th>Cpf do dependente</th>
              <td>{pacients.dependentCpf}</td>
            </tr>
            <tr>
              <th>Endereço</th>
              <td>{pacients.adress}</td>
            </tr>
            <tr>
              <th>Celular</th>
              <td>{pacients.phoneNumber}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{pacients.email}</td>
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
      </div>
    </div>
  )
}
