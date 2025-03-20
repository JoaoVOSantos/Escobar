import React from "react";

const Filho = ({ valor, cor, callback }) => {
    return (
        <div
            style={{
                backgroundColor: cor,
                borderRadius: "50px",
                width: "80px",
                height: "80px",
                fontSize: "50px",
                display: "flex",
                fontFamily: "arial",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                margin: "5px",
            }}
            onClick={() => callback(valor)}
        >
            {valor}
        </div>
    );
};

export default Filho;
