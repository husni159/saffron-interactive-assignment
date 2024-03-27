import "./scss/index.scss";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Questions from "./components/Questions";
import Result from "./components/Result";

const data = require("./../questions.json"); //importing questions.json file provided

const App = () => {
  const [answer, setAnswer] = useState([]) //array to store user's answers
  const [isCompleted, setIsCompleted] = useState(false); //variable to controls the quiz status
  //renders the Question component if quiz is not completed
  if (!isCompleted) { 
    return (
      <Questions
        data={data}
        answer={answer}
        setAnswer={setAnswer}
        setIsCompleted={setIsCompleted}
      />
    );
  }
  //renders the Result component once the quiz is complted
  return ( 
    <Result
      answer={answer}
      setAnswer={setAnswer}
      setIsCompleted={setIsCompleted}
      passmark={data.passmark}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
