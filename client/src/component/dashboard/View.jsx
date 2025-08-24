import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await axios.get("http://localhost:8080/event/view");
      setRows(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${id}`);
      alert("Event deleted");
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const updateEvent = (event) => {
    navigate("/add", { state: { event } });
  };

  if (loading) {
    return <Typography align="center">Loading Event...</Typography>;
  }

  if (rows.length === 0) {
    return <Typography align="center">No event available.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="event table">
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="right">Organizer Type</TableCell>
            <TableCell align="right">Event Type</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Venue</TableCell>
            <TableCell align="right">Speaker Name</TableCell>
            <TableCell align="right">Capacity</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Remarks</TableCell>
            {token && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.eventName}</TableCell>
              <TableCell align="right">{row.organizerType}</TableCell>
              <TableCell align="right">{row.eventType}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
              <TableCell align="right">{row.venue}</TableCell>
              <TableCell align="right">{row.speakerName}</TableCell>
              <TableCell align="right">{row.capacity}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.remarks}</TableCell>
              {token && (
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => updateEvent(row)} 
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteEvent(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default View;
