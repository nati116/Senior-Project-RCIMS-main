import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfessionalStyles/showhistory.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Paper,
  Card,
} from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PatientHistoryPage = ({ patientId, onGoBack }) => {
  const [patient, setPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedHistory, setExpandedHistory] = useState(null); // To track which history is expanded

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/get-patients`);
        const foundPatient = response.data.find((p) => p._id === patientId); // Find the patient by ID
        setPatient(foundPatient);
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError("Error fetching patient details.");
        console.error(error);
        setLoading(false); // Stop loading in case of error
      }
    };

    if (patientId) {
      fetchPatientDetails();
    }
  }, [patientId]);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patient-history/get-patient-history/${patientId}`
        );
        if (response.data.patientHistory.length > 0) {
          setPatientHistory(response.data.patientHistory);
        } else {
          setError("No history available for this patient.");
        }
      } catch (error) {
        setError("Failed to fetch patient history.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientHistory();
  }, [patientId]);

  const toggleHistoryDetails = (index) => {
    if (expandedHistory === index) {
      setExpandedHistory(null); // Collapse if already open
    } else {
      setExpandedHistory(index); // Expand the clicked one
    }
  };

  return (
    <div className=" bg-white-100">
  
        <div class="header">
            <ArrowBackIcon className=".back-button" onClick={onGoBack}/>
            <h3 className="patient-name"> Patient's History</h3>
        </div>
      {loading && <p>Loading history...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && patientHistory.length > 0 && (
  
        <div className="history-list">
          <Paper elevation={1} sx={{padding: "50px"}}>
          {patientHistory.map((historyItem, index) => (

          <Paper sx={{background:"#f8fafc",marginBottom:"20px", maxWidth:"800px", padding:"20px"}}>
            <div key={index} className="history-card">
              {/* <p className="history-number">{index + 1}</p> */}
              <div className="flex justify-end">
                <p><strong>Date:</strong> {new Date(historyItem.createdAt).toLocaleDateString()}</p>
              </div>
              
              <p><strong>History Overview:</strong> {historyItem.historyData.slice(0, 50)}...</p>
              <div className="button-container">
                <button
                  onClick={() => toggleHistoryDetails(index)}
                >
                  {expandedHistory === index ? "Hide Details" : "View Details"}
                </button>
              </div>

              {expandedHistory === index && (
                <div className="expanded-details">
                  <Card sx={{minHeight:"450px"}}>
                    <CardContent>
                    <Typography gutterBottom fontWeight= "bold" variant="h6" component="div">
                      Full Details
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                       {historyItem.historyData}
                      </Typography>
                    </CardContent>
                 
                                  
                  </Card>
                  
                </div>
              )}
            </div>
            </Paper>
          ))}
          </Paper>      

        </div>
      )}
    </div>
  );
};

export default PatientHistoryPage;
