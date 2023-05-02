import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const addQuestion = (question) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((res) => res.json())
      .then((data) => setQuestions([...questions, data]));
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => setQuestions(questions.filter((q) => q.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} onAddQuestion={addQuestion} />
      {page === "Form" ? <QuestionForm onSubmit={addQuestion} /> : <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} />}
    </main>
  );
}

export default App;