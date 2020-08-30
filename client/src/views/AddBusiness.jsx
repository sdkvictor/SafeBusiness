import React, {useState, useEffect, useContext} from 'react';
import TopBarMenu from '../components/TopBar'
import {Plus} from 'react-bootstrap-icons';
import NestedGrid from '../components/blocks';
import colors from '../constants/colors'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {AuthContext} from '../context/AuthContext'
import {SERVER_URL} from '../config';

function AddBusiness(props) {

    

    const [businessName, setName] = useState("");
    const [spaceX, setSpaceX] = useState("");
    const [spaceY, setSpaceY] = useState("");
    const [numberOfTables, setNumberOfTables] = useState("");
    const [tableDiam, setTableDiam] = useState("");
    const [tableY, setTableY] = useState("");
    const [minSocDistance, setMinSocDistance] = useState("");
    const [maxCapAllowed, setMaxCapAllowed] = useState("");
    const [businessId, setBusinessId] = useState("");

    const {user} = useContext(AuthContext);

    
    const onBusinessNameChange = event => {
        setName(event.target.value);
    }
    const onSpaceXChange = event => {
        setSpaceX(event.target.value);
    }
    const onSpaceYChange = event => {
        setSpaceY(event.target.value);
    }
    const onChangeOfNumTab = event => {
        setNumberOfTables(event.target.value);
    }
    const onTableDiameterChange = event => {
        setTableDiam(event.target.value);
    }

    const onMinSocDistanceChange = event => {
        setMinSocDistance(event.target.value);
    }
    const onMaxCapAllowedChange = event => {
        setMaxCapAllowed(event.target.value);
    }

    const getBusinessId = () =>{
        let url = `${SERVER_URL}businesses/getBusinessByOwner/${user.id}`
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
            return responseJSON;
        })

    }

    const createAll = (e) => {
        e.preventDefault();
        createBusiness();
        createAreas();
    }
    
    const createBusiness = () => {
        
        let newBusiness = {
            name: businessName,
            areas: numberOfTables,
            width: spaceX,
            height: spaceY,
            owner: user.id
        }
        let url = `${SERVER_URL}businesses/create`
        let settings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newBusiness.name,
                areas: newBusiness.areas,
                width: newBusiness.width,
                height: newBusiness.height,
                owner: newBusiness.owner,
                safeDistance: minSocDistance,
                capacity: maxCapAllowed
            })
        }
        return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            setBusinessId(responseJSON.id)
            return {success: true}
        })
        
    }

    const createAreas = () => {

        let url = `${SERVER_URL}areas/create`
        let settings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amountPeople: 4,
                width: tableDiam,
                height: tableDiam,
                isReserved: false,
                isUsable: true,
                business: businessId,
            })
        }
        return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        })
        .then(responseJSON => {
            return {success: true}
        })
        
    }
    
    
    return (
        <div style={styles.background}>
            <TopBarMenu/>
        
            <MDBContainer>
            
  <MDBRow>
  <div style={styles.container}>
    <MDBCol md="6">
    
      <form onSubmit={createAll}>
        <p className="h3 text-center mb-4">Add Business</p>
        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
          Business's name
        </label>
        <input type="text" id="defaultFormRegisterNameEx" className="form-control" onChange={onBusinessNameChange}/>
        <br />
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Space's x dimension
        </label>
        <input type="number" id="defaultFormRegisterEmailEx" className="form-control" onChange={onSpaceXChange}/>
        <br />
        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          Space's y dimension
        </label>
        <input type="number" id="defaultFormRegisterConfirmEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Number of tables available
        </label>
        <input type="number" id="defaultFormRegisterPasswordEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          Table's diameter (meters)
        </label>
        <input type="number" id="defaultFormRegisterConfirmEx" className="form-control" />
        <br />
        
        <br />
        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          Minimum social distance (meters)
        </label>
        <input type="number" id="defaultFormRegisterConfirmEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          Maximum capacity allowed
        </label>
        <input type="number" id="defaultFormRegisterConfirmEx" className="form-control" />
        <div className="text-center mt-4">
          <MDBBtn style={styles.button} type="submit">
            Confirm
          </MDBBtn>
        </div>
      </form>
      
    </MDBCol>
    </div>
  </MDBRow>
  
</MDBContainer>

            
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
        justifyContent: "center",
        width: '100%',
        paddingTop: "5%"
    },
    textH3 :{
        color: colors.dark,
    },
    button: {
        color: "white",
        backgroundColor: colors.secondary
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

export default AddBusiness