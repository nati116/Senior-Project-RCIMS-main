import React, { useState } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./PatientPagesStyles/MessagePopup.css";
import "./PatientPagesStyles/Feedback.css";
import { TextField } from "@mui/material";

const FeedbackPage = () => {
    const [feedback, setFeedback] = useState(""); // Track feedback input
    const [submittedMessage, setSubmittedMessage] = useState(""); // Track submission message
    const [feedbackType, setFeedbackType] = useState("other"); // Track feedback type
    const [showPopup, setShowPopup] = useState(false); // New state for controlling popup visibility
    const [popupMessage, setPopupMessage] = useState(""); // New state for popup message
    const [showWarningPopup, setShowWarningPopup] = useState(false); // New state for controlling warning popup visibility

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim() === "") {
            setPopupMessage("Feedback cannot be empty");
            setShowWarningPopup(true);
            setTimeout(() => setShowWarningPopup(false), 3000);
            return;
        }
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            setPopupMessage("User not verified!");
            setShowWarningPopup(true);
            setTimeout(() => setShowWarningPopup(false), 3000);
            return;
        }

        axios
            .post("http://localhost:5000/api/feedback/add-feedback", {
                sender: user._id,
                message: feedback,
                type: feedbackType,
            })
            .then((response) => {
                setPopupMessage("Your feedback has been submitted. Thank you!");
                setShowPopup(true);
                setFeedback("");
                setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
            })
            .catch((error) => {
                console.error("Error submitting feedback:", error);
                setPopupMessage(
                    "There was an error submitting your feedback. Please try again."
                );
                setShowWarningPopup(true);
                setTimeout(() => setShowWarningPopup(false), 3000);
            });
    };

    // Handle input change for feedback text
    const handleInputChange = (e) => {
        setFeedback(e.target.value);
    };

    return (
        <div className="feedback-page">
            

    <Card sx={{borderRadius:"30px",maxWidth:"600px", padding:"30px", margin:"100px auto"}}>
     <CardContent sx={{paddingleft:"50px", paddingRight:"30px", paddingTop:"50px", }}>
        <Typography gutterBottom fontWeight="bold" variant="h5" component="div" sx={{marginBottom:"30px"}}>
        Send Your Feedback
        </Typography>
        <Typography gutterBottom fontWeight="semibold" variant="h6" component="div">
        Let us know your feedback
        </Typography>
        <Typography variant="body3" sx={{ color: 'text.secondary' }}>
       We Value your Feedback and strive to provide the best possible treatment and experience for you.
        </Typography>

        
      </CardContent>

      <CardContent>
               <form className ="bg-white shadow-none" onSubmit={handleSubmit}>
                <TextField
                    id="feedback"
                    name="feedback"
                    value={feedback}
                    onChange={handleInputChange}
                    placeholder="Please share your feedback here..."
                    multiline
                    rows="2"
                    cols="40"
                    required
                />
                <div className="feedback-type">
                    <div>
                        <input
                            type="radio"
                            id="complaint"
                            name="feedbackType"
                            value="complaint"
                            checked={feedbackType === "complaint"}
                            onChange={(e) => setFeedbackType(e.target.value)}
                            required
                        />
                        <label htmlFor="complaint">Complaint</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="suggestion"
                            name="feedbackType"
                            value="suggestion"
                            checked={feedbackType === "suggestion"}
                            onChange={(e) => setFeedbackType(e.target.value)}
                        />
                        <label htmlFor="suggestion">Suggestion</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="gratitude"
                            name="feedbackType"
                            value="gratitude"
                            checked={feedbackType === "gratitude"}
                            onChange={(e) => setFeedbackType(e.target.value)}
                        />
                        <label htmlFor="gratitude">Gratitude</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="other"
                            name="feedbackType"
                            value="other"
                            checked={feedbackType === "other"}
                            onChange={(e) => setFeedbackType(e.target.value)}
                        />
                        <label htmlFor="other">Other</label>
                    </div>
                </div>
                <br />
                <button type="submit">Submit Feedback</button>
            </form>
      </CardContent>
     
            {showPopup && (
                <div className="popup">
                    <p>{popupMessage}</p>
                </div>
            )}
            {showWarningPopup && (
                <div className="popupWarning">
                    <p>{popupMessage}</p>
                </div>
            )}
            </Card>
        </div>
    );
};

export default FeedbackPage;
