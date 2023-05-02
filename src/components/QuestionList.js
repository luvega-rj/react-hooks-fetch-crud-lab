import React, { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  return (
    <section>
      <h1>Questions</h1>
      {questions.length === 0 ? (
        <p>No questions yet!</p>
      ) : (
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <h2>{question.prompt}</h2>
              <ul>
                {question.answers.map((answer, index) => (
                  <li key={index} style={{ fontWeight: index === question.correctIndex ? "bold" : "normal" }}>
                    {answer}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default QuestionList;