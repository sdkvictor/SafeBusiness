import React, {useState, useEffect, useContext} from 'react';

import TopBarMenu from '../components/TopBar'
import {Plus} from 'react-bootstrap-icons';
import NestedGrid from '../components/blocks';
import colors from '../constants/colors'
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import {SERVER_URL} from '../config';

function HomeView(props) {
    

    const [businessFound, setBusinessFound] = useState(false);
    const [business, setBusiness] = useState([]);
    const [d1, setD1] = useState("");
    const [d2, setD2] = useState("");
    const [maxX, setMaxX] = useState("");
    const [maxY, setMaxY] = useState("");

    const {user} = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        getBusiness();
        console.log(business);
        if(business!=[] && business!=undefined){
            setBusinessFound(true);
            calculateValues();
            console.log(businessFound);
        }
    }, []);

    

    const getBusiness = () =>{
        let url = `${SERVER_URL}businesses/getByOwner/${user.id}`
        let settings = {
            method: "GET"
        }
        return fetch(url, settings)
        .then(response => {
            if (response.ok) {  
                return response.json();
            }

            throw new Error();
        })
        .then(responseJSON => {
            if(responseJSON.length != 0 && responseJSON != undefined)    {
                setBusiness(responseJSON);
            }
            console.log(responseJSON.length);
            return responseJSON;
        })
    }

    

    const handleClick = (e) => {
        history.push('/addBusiness');
    }

    return (
        <div style={styles.background}>
            <TopBarMenu/>
           {!businessFound
                ?
                <div> 
                <div style={styles.container}>
                
                <h3 style={styles.textH3}> No existen negocios, crea uno para empezar a configurar </h3>
                </div>
            
                <div className="fixed-bottom" style={styles.addButton}>
                    <span style={styles.dot} onClick={handleClick}><Plus/></span>
                </div>
                </div>
                :
                
                <div>
                    <image src=""/>
                    <p>The value of d1 is {d1}</p>
                    <p>The value of d2 is {d2}</p>
                    <p>The maximum number of tables on X is {maxX}</p>
                    <p>The maximum number of tables on Y is {maxY}</p>
                </div>
           }

           
        </div>
    )
}

const styles = {
    background: {
        position: "fixed",

		backgroundColor: colors.light,
        width: '100%',
        height: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10%'
    },
    textH3 :{
        color: colors.dark,
    },
    image :{
        width: '128px',
        height: '128px',
        display: 'block',
        marginleft: 'auto',
        marginright: 'auto'
    },
    addButton: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        fontSize: '40px',
        color: 'white',
        pointerEvents: 'none',
    },
    dot: {
        height: '90px',
        width: '90px',
        backgroundColor: colors.primary,
        borderRadius: '50%',
        display: 'inline-block',
        margin: '30px',
        boxSshadow: '0px 0px 10px #aaaaaa',
        pointerEvents: 'auto',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: 'pointer'
    },
}

export default HomeView