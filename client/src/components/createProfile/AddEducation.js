import React, { useState, useEffect } from "react";
import "date-fns";
import "../../styles/Addeducation.css";
import { useParams, useLocation, Redirect } from "react-router-dom";
import Nav from "../Nav";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from 'axios';


function AddEducation() {

  const { id, educationId } = useParams();
  const location = useLocation();

  const initialState = {
    school: "",
    degree: "",
    description: "",
    fieldofstudy: "",
    from: "",
    to: "",
    checked: false
  };


  const [formData, setFormData] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [linkName, setLinkName] = useState('addeducation');
  useEffect(() => {

    getEducation();
    handleLocation();


  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckChangle = (e) => {
    setFormData({ ...formData, checked: e.target.checked });
  };
  const handleFromDateChange = (date) => {
    setFormData({
      ...formData,
      from: date
    });
  };
  const handleToDateChange = (date) => {
    setFormData({
      ...formData,
      to: date
    });
  };
  const handleLocation = () => {
    let splittedLocation = location.pathname.split('/');

    // console.log(splittedLocation[3]);

    setLinkName(splittedLocation[3])
  }


  const handleEducationSubmit = () => {
    postEducation();
  }
  const handleEducationUpdate = () => {
    editEducation();
  }

  const postEducation = async () => {
    try {
      const { data: { success } } = await axios.post(`/api/v1/profile/${id}/addeducation`, formData);
      setSuccess(success);
    } catch (error) {
      console.log(error);
    }

  }

  const getEducation = async () => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/profile/${id}/${educationId}`);
      setFormData({
        school: `${data.school}` === "undefined" ? "" : `${data.school}`,
        degree: `${data.degree}` === "undefined" ? "" : `${data.degree}`,
        description: `${data.description}` === "undefined" ? "" : `${data.description}`,
        fieldofstudy: `${data.fieldofstudy}` === "undefined" ? "" : `${data.fieldofstudy}`,
        from: `${data.from}` === "undefined" ? "" : `${data.from}`,
        to: `${data.to}` === "undefined" ? "" : `${data.to}`,
        checked: `${data.checked}`
      })

    } catch (error) {
      console.log(error)
    }

  }

  const editEducation = async () => {
    try {
      const { data: { success } } = await axios.put(`/api/v1/profile/${id}/${educationId}`, formData);
      setSuccess(success);
    } catch (error) {
      console.log(error);
    }

  }

  if (success) return <Redirect to={`/profile/${id}`} />


  return (
    <>
      <Nav prop="dashboard" />
      <div className="container add-education-container">
        {linkName === "editeducation" ? <h1 className="add-education-heading">Edit Experience</h1> : <h1 className="add-education-heading">Add Education to Your Profile</h1>}

        <TextField
          id="outlined-basic"
          label="School"
          value={formData.school}
          onChange={handleChange}
          name="school"
          className="inputText"
          variant="outlined"
        />

        <TextField
          id="outlined-basic"
          label="Degree"
          value={formData.degree}
          onChange={handleChange}
          name="degree"
          className="inputText"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Field of Study"
          value={formData.fieldofstudy}
          onChange={handleChange}
          name="fieldofstudy"
          className="inputText"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          name="description"
          className="inputText"
          variant="outlined"
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>

          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            name="to"
            className="inputText"
            value={formData.from}
            onChange={(date) => handleFromDateChange(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            name="to"
            className="inputText"
            value={formData.to}
            onChange={(date) => handleToDateChange(date)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControlLabel
          className="checkbox"
          control={
            <Checkbox
              checked={formData.checked}
              onChange={handleCheckChangle}
              name="checked"
              color="primary"
            />
          }
          label="Current"
        />

        <div className="add-education-button-group">
          {linkName === 'editeducation' ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEducationUpdate}
              className="submit-button"

            >
              Update
            </Button>
          ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEducationSubmit}
                className="submit-button"

              >
                Submit
              </Button>
            )}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setSuccess(true)}
            className="submit-button"
          >
            Cancle
      </Button>
        </div>
      </div>
    </>
  );
}
export default AddEducation