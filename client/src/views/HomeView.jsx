import React, {useState, useEffect, useContext} from 'react';
import { Form, Button } from 'react-bootstrap';
import TopBarMenu from '../components/TopBar'
import {Plus} from 'react-bootstrap-icons';
import NestedGrid from '../components/blocks';
import colors from '../constants/colors'
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext'
import {SERVER_URL} from '../config';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

function HomeView(props) {
    

    const [businessFound, setBusinessFound] = useState(false);
    const [business, setBusiness] = useState([]);
    const [d1, setD1] = useState();
    const [d2, setD2] = useState("");
    const [maxX, setMaxX] = useState("");
    const [maxY, setMaxY] = useState("");
    const [maxTables, setMaxTables] = useState("");
    const [maxPeople, setMaxPeople] = useState("");
    const [capacity, setCapacity] = useState("");
    const [distance, setDistance] = useState("");

    const {user} = useContext(AuthContext);

    const history = useHistory();

    useEffect(() => {
        getBusiness();
    }, []);

    useEffect(() => {
        if(business!=[] && business!=undefined){
            setBusinessFound(true);
            //calculateValues();
            console.log(businessFound);
        }
    }, [business]);
    
    const onChangeDistance = event => {
        setDistance(event.target.value);
    }
    const onChangeCapacity = event => {
        setCapacity(event.target.value);
    }


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
            if(responseJSON.length > 0 && responseJSON != undefined && responseJSON != 'undefined')    {
                setBusiness(responseJSON);  
            }
            console.log(responseJSON.length);
            return responseJSON;
        })
    }

    const calculateValues = () => {
        console.log(business);
        if(business!=[] && business!=undefined){
            
        }
        
    }

    const handleClick = (e) => {
        history.push('/addBusiness');
    }

    const handleData = (e) => {
        e.preventDefault();
        setD1(business[0].tableDimension + business[0].safeDistance);
        setD2((1.7320508075/2)*(business[0].tableDimension/2 + business[0].safeDistance ));
        setMaxX(Math.floor((business[0].width-business[0].tableDimension)/business[0].safeDistance));
        setMaxY(Math.floor((business[0].height-business[0].tableDimension)/((1.7320508075/2)*(business[0].tableDimension/2 + business[0].safeDistance ))));
        //setMaxPeople(Math.min(Math.floor(business[0].areas*4*(business[0].capacity/100)), (((maxX*maxY)-Math.floor(maxY/2)))*4));
        setMaxPeople(Math.floor(business[0].areas*4*(business[0].capacity/100)));
    }

    const updateData = (e) => {
        e.preventDefault();
        setD1(business[0].tableDimension + distance);
        setD2((1.7320508075/2)*(business[0].tableDimension/2 + distance));
        setMaxX(Math.floor((business[0].width-business[0].tableDimension)/ distance));
        setMaxY(Math.floor((business[0].height-business[0].tableDimension)/((1.7320508075/2)*(business[0].tableDimension/2 + distance ))));
        //setMaxPeople(Math.min(Math.floor(business[0].areas*4*(capacity/100)), ((maxX*maxY)-Math.floor(maxY/2))*4));
        setMaxPeople(Math.floor(business[0].areas*4*(capacity/100)));

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
                
                <div style={styles.content}>
                    <div style={styles.fixed}>
                    <img src={require('../constants/susanabonito.png')} width="700" height="450" />
                    <p>The value of d1 is {d1}</p>
                    <p>The value of d2 is {d2}</p>
                    <p>The maximum number of tables on width (x) is {maxX}</p>
                    <p>The maximum number of tables on height (y) is {maxY}</p>
                    <p>The maximum number of people in the restaurant is {maxPeople}</p>
                    <MDBBtn style={styles.button} onClick={handleData}> Generate data </MDBBtn>
                    
                    <form onSubmit={updateData}>
                    <label>
                        Update required social distance (meters):
                        <input type="number" step="any" name="number2" onChange={onChangeDistance}/>
                    </label>
                    <br/>
                    <label>
                        Update maximum capacity (%):
                        <input type="number" step="any" name="number" onChange={onChangeCapacity}/>
                    </label>
                    <br/>
                    <input style={styles.button} type="submit" value="Generate new values" />
                    </form>

                    


                    </div>
                    
                </div>
           }

           
        </div>
    )
}

const styles = {
    content:{
       width: "100%",
    },
    fixed: {
        marginLeft: "30%",
        marginRight: "auto",

    },
    background: {
        position: "fixed",

		backgroundColor: colors.light,
        width: '100%',
        height: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10%',
        width: '100%',
		height: '100%',
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.light
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
    button: {
        color: "white",
        backgroundColor: colors.secondary,
        fontWeight:'bold'
    }
}

export default HomeView