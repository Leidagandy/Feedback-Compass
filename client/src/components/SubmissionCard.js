import React, { useEffect, useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import "./StudentProfile.css";
import axios from "axios";
import StudentResponse from "./StudentResponse";

const SubmissionCard = ({ id }) => {
  const [cardData, setCardData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [mentorName, setMentorName] = useState();

  const splitLines = (str) => str.split(/\r?\n/);
  const handleDate = (date) => {
    return date.split("T")[0];
  };

  useEffect(() => {
    axios
      .get(`/api/get-submissions/${id}`)
      .then((response) => {
        setCardData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterCardData = (term) => {
    if (!term) {
      return cardData;
    } else {
      const foundTiles = cardData.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase())
      );
      return foundTiles;
    }
  };

  useEffect(() => {
    axios
      .get("/api/get-mentor-names")
      .then((response) => {
        setMentorName(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    return setSearchItem(e.target.value);
  };

  function isValidURL(str) {
    var a = document.createElement("a");
    a.href = str;
    return a.host && a.host != window.location.host;
  }

  return !cardData ? (
    <div>
      <input
        type="search"
        value={searchItem}
        placeholder="Search for submission title here"
        onChange={handleChange}
      />
      Loading...
    </div>
  ) : (
    <div>
      <div className="search-bar">
        <input
          id="search-bar"
          type="search"
          value={searchItem}
          placeholder="Search for submission title here"
          onChange={handleChange}
        />
      </div>
      {filterCardData(searchItem).map((card, index) => {
        return (
          <Accordion>
            <Card className="submission-card" key={index}>
              <Card.Title
                style={{ width: "80%", display: "flex" }}
                id="card-title"
              >
                <Accordion.Toggle
                  className="title-btn"
                  variant="light"
                  eventKey="0"
                >
                  {mentorName && card.body ? (
                    "Feedback from " +
                    mentorName.find((m) => m.id === card.mentor_id).name +
                    " " +
                    mentorName.find((m) => m.id === card.mentor_id).surname +
                    " On " +
                    card.title
                  ) : (
                    <p className="waiting-feedback">
                      Waiting for feedback on {card.title}
                    </p>
                  )}
                </Accordion.Toggle>
              </Card.Title>
              <Accordion.Collapse eventKey="0">
                <div className="card-color">
                  <div id="card-date">
                    Sent: {handleDate(card.submission_date)}
                  </div>
                  <div id="card-submitted">
                    <h5>Submitted Link:</h5>
                    <span>
                      {isValidURL(card.submission) ? (
                        <a
                          className="submission-link"
                          href={card.submission}
                          target="_blank"
                        >
                          {card.submission}
                        </a>
                      ) : (
                        <p>{card.submission}</p>
                      )}
                    </span>
                    <br />
                  </div>
                  <span>
                    <div id="card-feedback">
                      <h5>
                        {card.body && mentorName
                          ? mentorName.find((m) => m.id === card.mentor_id)
                              .name +
                            " " +
                            mentorName.find((m) => m.id === card.mentor_id)
                              .surname +
                            " : "
                          : ""}
                      </h5>
                      {card.body
                        ? splitLines(card.body).map((f, i) => (
                            <p key={i}>{f}</p>
                          ))
                        : ""}
                    </div>
                  </span>

                  <StudentResponse
                    id={card.id}
                    student_id={id}
                    responses={card.response}
                  />
                </div>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        );
      })}
    </div>
  );
};

export default SubmissionCard;
