import React, { useState, useEffect } from 'react';
import { AlertCircleOutline, CheckmarkCircleOutline } from 'react-ionicons';
import InputMask from 'react-input-mask';

export const PacientTable = ({ pacients, onEdit, updated }) => {
    const [disabled, setDisabled] = useState(true);
    const [readOnly, setReadOnly] = useState(true);

    const owing = pacients?.owedValue > 0;

    const [style, setStyle] = useState({
        border: '0px solid gray',
        textAlign: 'justify',
        backgroundColor: 'rgb(255, 255, 255)',
    });

    useEffect(() => {
        setStyle({
            border: readOnly ? '0px solid gray' : '1px solid black',
            textAlign: 'justify',
            backgroundColor: 'rgb(255, 255, 255)',
        });
    }, [readOnly]);

    useEffect(() => {
        setReadOnly(true);
        setDisabled(true);
    }, [updated]);

    const editInfo = () => {
        setReadOnly(!readOnly);
        setDisabled(!disabled);
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        onEdit({ ...pacients, [name]: value });
    };

    const fields = [
        { label: 'Nome', name: 'name', placeholder: 'Nome do Paciente' },
        { label: 'CPF', name: 'cpf', placeholder: 'CPF', mask: '999.999.999-99' },
        { label: 'Nome do dependente', name: 'dependentName', placeholder: 'Nome do Dependente' },
        { label: 'CPF do dependente', name: 'dependentCpf', placeholder: 'CPF do Dependente', mask: '999.999.999-99' },
        { label: 'Endereço', name: 'adress', placeholder: 'Endereço' },
        { label: 'Celular', name: 'phoneNumber', placeholder: 'Celular', mask: '(99) 99999-9999' },
        { label: 'Email', name: 'email', placeholder: 'Email' },
    ];

    return (
        <div>
            <h2 className={owing ? 'red' : 'green'}>{pacients.name}</h2>
            <table className="table table-bordered">
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.name}>
                            <th>{field.label}</th>
                            <td>
                                {field.mask ? (
                                    // Use InputMask for fields with a mask
                                    <InputMask
                                        mask={field.mask}
                                        value={pacients[field.name] || ''}
                                        disabled={disabled}
                                        readOnly={readOnly}
                                        style={style}
                                        className="form-control"
                                        placeholder={field.placeholder}
                                        onChange={onInputChange}
                                        name={field.name}
                                    >
                                        {(inputProps) => <input {...inputProps} />}
                                    </InputMask>
                                ) : (
                                    // Use standard input for other fields
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={field.placeholder}
                                        name={field.name}
                                        value={pacients[field.name] || ''}
                                        readOnly={readOnly}
                                        style={style}
                                        onChange={onInputChange}
                                        disabled={disabled}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr className="owedvalue">
                        <th>Valor devido</th>
                        <td style={{ textAlign: 'left' }}>
                            {pacients.owedValue}&nbsp;&nbsp;&nbsp;
                            {owing ? (
                                <AlertCircleOutline color="#fbb117" title="owing" height="30px" width="30px" />
                            ) : (
                                <CheckmarkCircleOutline color="#2ff924" title="notOwing" height="30px" width="30px" />
                            )}
                        </td>
                    </tr>
                    <button className="btn btn-outline-light btn-primary" onClick={editInfo}>
                        Edit
                    </button>
                </tbody>
            </table>
        </div>
    );
};
