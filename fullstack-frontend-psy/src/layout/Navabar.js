import React from 'react'
import { Link } from 'react-router-dom'

export const Navabar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">PsyApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='flex-box'>
          <Link className='btn btn-outline-light' to="/">Home</Link>
          <Link className='btn btn-outline-light' to={"/AddNewPacients"}>Adicionar Paciente</Link>
          <Link className='btn btn-outline-light btn-primary' to={"/sessionsList"}>Lista de sessões</Link>
        </div>
        
      </div>
    </nav>
  )
}
