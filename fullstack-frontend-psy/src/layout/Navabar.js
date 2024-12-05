import React from 'react'

export const Navabar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">PsyApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='flex-box'>
          <button className='btn btn-outline-light'>Adicionar Paciente</button>
          <button className='btn btn-outline-light'>Adicionar sessão</button>
          <button className='btn btn-outline-light'>Lista de sessões</button>
        </div>
        
      </div>
    </nav>
  )
}
