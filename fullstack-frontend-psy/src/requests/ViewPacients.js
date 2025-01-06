import axios from 'axios'
import { format, formatISO, parse } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ViewPacient.css';
import { AlertCircleOutline, CheckmarkCircleOutline, CloseCircleOutline } from 'react-ionicons'
import { PacientTable } from '../Utilities/PacientTable';
import { SessionsTable } from '../Utilities/SessionsTable';

export const ViewPacients = () => {

  const { id } = useParams()

  const [sessions, setSessions] = useState([])
  const [pacients, setPacients] = useState(null)
  const [newSession, setNewSession] = useState(null)
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState({})
  const [updated, setUpdated] = useState(false);

  //update Pacient and sessons list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientResponse = await axios.get(`http://localhost:8080/pacientById/${id}`);
        const sessionResponse = await axios.get(`http://localhost:8080/pacientSessionsList/${id}?sortBy=date&direction=ASC`);
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pacients) {
    return <div>Error: Patient not found!</div>;
  }

  const handleNewSession = async () => {
    try {
      console.log(newSession)
      if (newSession) {
        // Validate new session
        if (!newSession.date || !newSession.value) {
          alert("Please fill out all fields for the new session.");
          return;
        }

        // Save new session to backend
        await axios.put(`http://localhost:8080/sessionToPacient/${id}`, newSession)
        // Add new session to sessions list
        setSessions([...sessions, newSession]);
        setNewSession(null);
        alert("New session added successfully!");
        setNewSession(null)
      }
    } catch (error) {
      console.error("Error creating new session" + error)
    }
  }

  const handlePaymentStatusUpdate = async () => {
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
  }

  const handlePatientUpdate = async () => {
    try {
      console.log(pacients)
      await axios.put(`http://localhost:8080/edit/pacient/${pacients.id}`, pacients);
      alert("Patient updated successfully!");
      setUpdated((prev) => !prev);
    } catch (error) {
      console.error("Error updating patient:", error);
      alert('Failed to update patient.');
    }
  }

  const handleApplyChanges = async () => {
    try {
      // Apply new session creation
      if (newSession) {
        await handleNewSession();
      }
  
      // Apply payment status updates
      await handlePaymentStatusUpdate();
  
      // Apply patient updates
      await handlePatientUpdate();
  
      alert("All changes applied successfully!");
    } catch (error) {
      console.error("Error applying changes:", error);
      alert("Failed to apply some or all changes. Please try again.");
    }
    
  };

  return (
    <div className='container'>
      <div className='py-4'>
      {pacients ? (
        <PacientTable pacients={pacients} onEdit={setPacients} updated={updated} />
      ) : (
        <div>Loading...</div>
      )}

      {sessions ? (
        <SessionsTable sessions={sessions} onEdit={setPaymentStatus} onEdit2={setNewSession} update={updated} paymentStatus={paymentStatus} />
      ) : (
      <div>Loading...</div>
      )}
        
        <button onClick={handleApplyChanges}>Apply</button>
      </div>
    </div>
  )
}
