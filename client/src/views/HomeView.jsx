import React from 'react';
//import TopBarMenu from './client/scr/components/TopBar'

function HomeView(props) {

    return (
        <div>
            <TopBarMenu/>
           <h3 style={styles.textH3}> No existen negocios, crea uno para empezar a configurar </h3>
           <button><img src = "./client/src/assets/mas.png" style={styles.image}/></button>
        </div>
    )
}

const styles = {
    container: {
        width: '100%'
    
    },
    textH3 :{
        textalign : 'center'
    },
    image :{
        width: '128px',
        height: '128px',
        display: 'block',
        marginleft: 'auto',
        marginright: 'auto'
    }
}

export default HomeView