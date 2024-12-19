import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import './sessionsTable.css';

export const SessionsTable = ({ sessions, onEdit, onEdit2, updated, paymentStatus }) => {
  const [newSession, setNewSession] = useState(null);

  useEffect(() => {
    if (sessions.length > 0) {
      const newPaymentStatus = sessions.reduce((acc, session) => {
        acc[session.id] = session.paid ? "true" : "false";
        return acc;
      }, {});
      onEdit(newPaymentStatus);
    }
    setNewSession(null)
  }, [sessions, updated]);

  const handlePaymentChange = (sessionId, value) => {
    onEdit((prevStatus) => ({
      ...prevStatus,
      [sessionId]: value,
    }));
  };

  const isNewSessionValid = () => {
    return newSession?.date && newSession?.value && !isNaN(newSession.value);
  };

  const handleNewSessionChange = (field, value) => {
    setNewSession((prev) => ({ ...prev, [field]: value }));
    onEdit2((prev) => ({ ...prev, [field]: value }));
  };

  const setNewSessionEmpty = () => {
    setNewSession({ date: "", value: "", paid: false })
    onEdit2({ date: "", value: "", paid: false })
  }

  return (
    <div className="tableDiv">
  <button onClick={setNewSessionEmpty}>Add New Session</button>
  {newSession && (
    <button onClick={() => setNewSession(null)}>Cancel</button>
  )}
  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Data da Sessão</th>
          <th scope="col">Valor da Sessão</th>
          <th scope="col">Status do Pagamento</th>
          <th scope="col">Pago/Não Pago</th>
        </tr>
      </thead>
      <tbody>
        {newSession && (
          <tr>
            <th scope="row">New</th>
            <td>
              <InputMask
                mask="99/99/9999 99:99"
                value={newSession.date}
                onChange={(e) =>
                  handleNewSessionChange("date", e.target.value)
                }
                className="form-control"
                placeholder="Date (dd/MM/yyyy HH:mm)"
                name="date"
              >
                {(inputProps) => <input {...inputProps} />}
              </InputMask>
            </td>
            <td>
              <input
                type="number"
                placeholder="Value"
                value={newSession.value}
                onChange={(e) =>
                  handleNewSessionChange("value", e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={newSession.paid}
                onChange={(e) =>
                  handleNewSessionChange("paid", e.target.checked)
                }
              />
            </td>
          </tr>
        )}
        {sessions.map((session, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{session.date}</td>
            <td>{session.value}</td>
            <td>{session.paid ? "Paid" : "Not Paid"}</td>
            <td>
              <input
                key={`paid-true-${session.id}`}
                type="radio"
                name={`payment-${session.id}`}
                value="true"
                checked={paymentStatus[session.id] === "true"}
                onChange={() => handlePaymentChange(session.id, "true")}
              />
              Paid
              <input
                key={`paid-false-${session.id}`}
                type="radio"
                name={`payment-${session.id}`}
                value="false"
                checked={paymentStatus[session.id] === "false"}
                onChange={() => handlePaymentChange(session.id, "false")}
              />
              Not Paid
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};
