import axios from "axios";
import React, { useState, useEffect } from "react";
import RatingHomeWork from "./RatingHomeWork";
import SubmitWork from "./SubmitWork";

const LessonsDropDown = ({ module, id }) => {
  const [lesson, setLesson] = useState();
  const [lessonValue, setLessonValue] = useState();
  useEffect(() => {
    axios.get("/api/syllabus/lessons").then((response) => {
      setLesson(response.data);
    });
  }, []);

  return !lesson ? (
    <div>Loading</div>
  ) : (
    <div>
      <select
        style={{ backgroundColor: "gray", marginLeft: "15rem" }}
        onChange={(e) => setLessonValue(e.target.value)}
      >
        <option>Select A Lesson</option>
        {lesson.map((item, index) => {
          return (
            <option key={index}>
              {module}/{item.description}
            </option>
          );
        })}
      </select>
      <RatingHomeWork />
      <SubmitWork id={id} lessonValue={lessonValue} />
    </div>
  );
};

export default LessonsDropDown;
