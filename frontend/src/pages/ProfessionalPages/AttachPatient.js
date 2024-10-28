import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfessionalStyles/AttachPatient.css";

import { Snackbar,Paper,TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, OutlinedInput, Alert } from '@mui/material';

const AttachPatient = () => {
    const [currentDepartment, setCurrentDepartment] = useState("");
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [department, setDepartment] = useState("");
    const [message, setMessage] = useState("");

    // Fetch professionals and patients when the component mounts
    useEffect(() => {
        fetchPatients();
    }, []);

    let currentProfessional = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            // get professional with the currently logged in user id
            const response = await axios.get(
                `http://localhost:5000/api/professionals/get-professional-by-user-id/${user._id}`
            );
            setCurrentDepartment(response.data.professional[0].department);
            return response;
        } catch (error) {
            console.error("Error fetching current professional:", error);
            throw error;
        }
    };

    const fetchPatients = async () => {
        try {
            const professionalResponse = await currentProfessional();
            // console.log("Professional Response:", professionalResponse);

            if (professionalResponse && professionalResponse.data && professionalResponse.data.professional && professionalResponse.data.professional.length > 0) {
                const professional = professionalResponse.data.professional[0];
                // console.log("Professional ID:", professional._id);
                const response = await axios.get(
                    `http://localhost:5000/api/professionals/get-patients-of-professional/${professional._id}`
                );
                setPatients(response.data || []); // Use an empty array if undefined
            } else {
                console.error("No valid professional data available:", professionalResponse);
                setPatients([]); // Set to empty array if no professional data
            }
        } catch (error) {
            console.error("Error fetching patients:", error);
            setPatients([]); // Set to empty array on error
        }
    };

    // snackbar functions
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;
      const handleClose = () => {
        setState({ ...state, open: false });
      };
    const handleAttachPatient = async (e) => {
        e.preventDefault();
        setState({ ...state, open: true });
        try {
            const response = await axios.post(
                "http://localhost:5000/api/professionals/attach-patient",
                {
                    professionalId: null,
                    patientId: selectedPatient,
                    department: department,
                }
            );
            setMessage(response.data.message);
            // alert(response.data.message);
        //     <Snackbar
        //     anchorOrigin={{ vertical, horizontal }}
        //     open={open}
        //     onClose={handleClose}
        //     message={message}
        //     key={vertical + horizontal}
        //     autoHideDuration={1200}
        //   />
        } catch (error) {
            console.error("Error attaching patient:", error);
            setMessage("Failed to attach patient.");
        }
    };

    return (
        <div className="attach-detach-container"> 
         <h3 className="patient-name">Attach Patient to Professional</h3>
           

                
         <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
           
            autoHideDuration={1200}
          >
             <Alert
                 sx={{backgroundColor:"#3A9CED", width: "100%",}}
                 variant="filled"            >
                  {message} 
            </Alert>
        </Snackbar>



         
            <form className="bg-white" onSubmit={handleAttachPatient}>
            
             <Paper elevation={0} sx={{ paddingTop:"30px", minWidth:"400px", minHeight:"300px"}} >
             <label>Select Patient:</label> 

            <FormControl 
              sx={{marginBottom:"20px", marginTop: "10px"}}
              fullWidth  
              required
              variant="outlined"
              color="warming"
              label="patient"
                >
               <Select
                   name="patient"
                   id="patient"
                   value={selectedPatient}
                   onChange={(e) => setSelectedPatient(e.target.value)}
                   
                  >
                  <MenuItem value="" >Select a patient</MenuItem>
                  {patients.map((patient) => (
                            <MenuItem key={patient._id} value={patient._id}>
                                {patient.user.name}
                            </MenuItem>
                            ))}
                </Select>
               
            </FormControl>
            
                <label>Department:</label>

                <FormControl 
                variant="outlined"
                fullWidth  
                required
                sx={{marginBottom:"20px", marginTop: "10px"}}
                label="Department"
                >
                <Select
                   name="Department"
                   id="Department"
                   value={department}
                   onChange={(e) => setDepartment(e.target.value)}
                   
                  >
                  <MenuItem value="">Select a department</MenuItem>
                  <MenuItem value="MD" disabled={currentDepartment === "MD"}>MD</MenuItem>
                  <MenuItem value="Psychiatry" disabled={currentDepartment === "Psychiatry"}>Psychiatry</MenuItem>
                  <MenuItem value="Physical" disabled={currentDepartment === "Physical"}>Physical</MenuItem>
                  <MenuItem value="Addiction Counseling" disabled={currentDepartment === "Addiction Counseling"}>Addiction Counseling</MenuItem>

                </Select>
            </FormControl>

                {/* <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                >
                    <option value="">Select a department</option>
                    <option value="MD" disabled={currentDepartment === "MD"}>MD</option>
                    <option value="Psychiatry" disabled={currentDepartment === "Psychiatry"}>Psychiatry</option>
                    <option value="Physical" disabled={currentDepartment === "Physical"}>Physical</option>
                    <option value="Addiction Counseling" disabled={currentDepartment === "Addiction Counseling"}>Addiction Counseling</option>
                </select> */}
              </Paper>
                <button type="submit">Attach Patient</button>
            </form>
             
        </div>
        
    );
};

export default AttachPatient;
