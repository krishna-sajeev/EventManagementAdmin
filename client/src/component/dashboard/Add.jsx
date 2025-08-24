import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Add = () => {
  const [form, setForm] = useState({
    eventName: '',
    organizerType: '',
    eventType: '',
    startDate: '',
    endDate: '',
    venue: '',
    speakerName: '',
    capacity: '',
    status: '',
    remarks: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  function valueFetch(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const sendData = () => {
    if (location.state != null) {
      axios
        .put(`http://localhost:8080/event/update/${location.state.event.id}`, form)
        .then(() => {
          alert('Data updated');
          navigate('/view');
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post('http://localhost:8080/add', form)
        .then(() => {
          alert('Data added');
          navigate('/view');
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    if (location.state != null) {
      setForm({
        eventName: location.state.event.eventName,
        organizerType: location.state.event.organizerType,
        eventType: location.state.event.eventType,
        startDate: location.state.event.startDate,
        endDate: location.state.event.endDate,
        venue: location.state.event.venue,
        speakerName: location.state.event.speakerName,
        capacity: location.state.event.capacity,
        status: location.state.event.status,
        remarks: location.state.event.remarks,
      });
    } else {
      setForm({
        eventName: '',
        organizerType: '',
        eventType: '',
        startDate: '',
        endDate: '',
        venue: '',
        speakerName: '',
        capacity: '',
        status: '',
        remarks: '',
      });
    }
  }, [location.state]);

  return (
    <>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            label="eventName"
            name="eventName"
            value={form.eventName}
            onChange={valueFetch}
          />
          <br />
          <TextField
          select
            required
            label="organizerType"
            name="organizerType"
            value={form.organizerType}
            onChange={valueFetch}
            >
     
 
                 <MenuItem value="ACADEMIC">ACADEMIC</MenuItem>
              <MenuItem value="CORPORATE">CORPORATE</MenuItem>
               <MenuItem value="NGO">NGO</MenuItem>
                <MenuItem value="GOVERNMENT">GOVERNMENT</MenuItem>
            </TextField>
       
          <br />
          <TextField
            required
            label="eventType"
            name="eventType"
            value={form.eventType}
            onChange={valueFetch}
            >
<MenuItem value="WORKSHOP">WORKSHOP</MenuItem>
              <MenuItem value="SEMINAR">SEMINAR</MenuItem>
               <MenuItem value="CONFERENCE">CONFERENCE</MenuItem>
                <MenuItem value="TRAINING">TRAINING</MenuItem>
            </TextField>
           
          <br />
          <TextField
            required
            label="startDate"
            name="startDate"
            value={form.startDate}
            onChange={valueFetch}
          />
          <br />
          <TextField
            required
            label="endDate"
            name="endDate"
            value={form.endDate}
            onChange={valueFetch}
          />
          <br />
          <TextField
            required
            label="Venue"
            name="venue"
            value={form.venue}
            onChange={valueFetch}
          />
          <br />
          <TextField
            required
            label="Speaker Name"
            name="speakerName"
            value={form.speakerName}
            onChange={valueFetch}
          />
          <br />
          <TextField
            required
            label="Capacity"
            name="capacity"
            value={form.capacity}
            onChange={valueFetch}
          />
          <br />
          <TextField
          select
            required
            label="Status"
            name="status"
            value={form.status}
            onChange={valueFetch}
            >
                 <MenuItem value="UPCOMING">UPCOMING</MenuItem>
              <MenuItem value="COMPLETED">COMPLETED</MenuItem>
               <MenuItem value="ONGOING">ONGOING</MenuItem>
                <MenuItem value="CANCELLED">CANCELLED</MenuItem>
            </TextField>

          <br />
          <TextField
            required
            label="Remarks"
            name="remarks"
            value={form.remarks}
            onChange={valueFetch}
          />
          <br />

          <Button variant="contained" color="success" onClick={sendData}>
            Submit
          </Button>
        </div>
      </Box>
    </>
  );
};

export default Add;
