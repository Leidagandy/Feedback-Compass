import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./UpdateProfile.css";

function UpdateProfile({ studentDetails, setStudentDetails }) {
  const [value, setValue] = useState({
    name: "",
    surname: "",
    biography: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let id = studentDetails.id;

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue((previousValue) => {
      return { ...previousValue, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (value.name != "" && value.surname != "" && value.biography != "") {
      axios
        .put(`/api/students/${id}`, {
          name: value.name,
          surname: value.surname,
          biography: value.biography,
        })
        .then(function (response) {
          setStudentDetails(response.data);
          // setValue({
          //   name: "",
          //   surname: "",
          //   email: "",
          //   biography: "",
          // });
          alert("Your Profile Is Updated")

        })

        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    } else {
      alert("Please add your details")
    }


  };

  return (
    <div>
      <button
        onClick={handleShow}
      >Update Your Profile</button>
      <Modal show={show}

        onHide={handleClose}>
        <Modal.Body>
          <form className="Modals" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              onChange={handleChange}
            />

            <input
              type="text"
              name="biography"
              placeholder="Add a biography"
              onChange={handleChange}
            />
            <button type="submit" onClick={handleClose} >Save</button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateProfile;
