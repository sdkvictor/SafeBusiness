import React from 'react';


function HomeView(props) {

    return (
        <div>
           <h3> No existen negocios, crea uno para empezar a configurar </h3>
           <button className="glyphicon glyphicon-plus" ></button>
        </div>
    )
}

const styles = {
    container: {
        width: '100%'
    }
}

export default HomeView