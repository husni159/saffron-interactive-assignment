import React, { useState } from "react"; 
import "./../scss/Questions.scss"; //importing the scss file
import { VscChevronLeft } from "react-icons/vsc"; //importing the back button icon

const Questions = (props) => {
  const [questionNum, setQuestionNum] = useState(0);
  const { data, answer, setAnswer, setIsCompleted } = props; //destructuring the props object

  //css for progress bar according to the question number 
  const progressBarStyle = {
    width: `${((questionNum + 1) / data.questions.length) * 100}%`,
  };

  //options associated with each question as an array of buttons
  const optionsArray = data.questions[questionNum].options.map((option) => (
    <button
      onClick={navigateQuestion} //passed a function to each button to move to the next question onClick
      value={option.isCorrect}
      key={option.label}
    >
      {option.label}
    </button>
  ));

  //function to navigate to the previous question
  function goToPrevious() {
    if (questionNum !== 0) {
      setQuestionNum(questionNum - 1);
      setAnswer(() => {
        answer.pop();
        return answer;
      });
    }
  }

  //function used by the buttons to store the answer and move to the next question
  function navigateQuestion(e) {
    setAnswer(() => {
      answer.push(e.target.value); //function to push the current answer into the array and return it. setAnswer takes this new array
      //and assigns it to the old array
      return answer;
    });
    if (questionNum === data.questions.length - 1) {
      setIsCompleted(true); //the isCompleted variable is set to true when the final question is answered 
    } else {
      // move to the next question if final qn not reached
      setQuestionNum(questionNum + 1); 
    }
  }

  return (
    <div id="container">
      <section id="top">
        <header>
          <div id="icon">
            <VscChevronLeft className="back-button" onClick={goToPrevious} />
          </div>
          <div id="question-numbers">
            <span id="current-question">0{questionNum + 1}</span>
            <span id="total-questions">/0{data.questions.length}</span>
          </div>
        </header>
        <section id="outer-progress-bar">
          <div id="inner-progress-bar" style={progressBarStyle}></div>
        </section>
        <div id="question">
          <p>{data.questions[questionNum].question}</p>
        </div>
        <footer>History of Countries</footer>
      </section>
      <section id="bottom">{optionsArray}</section>
    </div>
  );
};

export default Questions;
