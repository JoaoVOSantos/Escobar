import React from 'react'

const Filho = ({ texto, getCor }) => {
    return (
        <h1 style={{backgroundColor: getCor}}>{ texto }</h1>
        
    )
}

export default Filho