import React,{useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Container, Row, Col,Button} from "react-bootstrap";
import './movie.css';

export default function App() {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [showResults, setShowResults] = useState(false); 
  const [score, setScore] = useState(0); 

  const questions = [
    {
      id:1,
      question: 'What Streaming Service?',
      answerOptions: [
        {answerText: 'Netflix',isCorrect: true },
        {answerText: 'Hulu',isCorrect: true },
        {answerText: 'HBOMax',isCorrect: true },
        {answerText: 'Disney+',isCorrect: true }],
    },
    {
      id: 2,
      question: 'Movie or TV Show?',
      answerOptions: [
        {answerText: 'Movie', isCorrect: true },
        {answerText: 'TV Show', isCorrect: false },
      ],
    },
    {
      id: 3,
      question: 'What Movie Genre?',
      answerOptions: [
        {answerText: 'Action',isCorrect: true },
        {answerText: 'Drama',isCorrect: true },
        {answerText: 'SciFi',isCorrect: true },
        {answerText: 'Horror',isCorrect: true },
        {answerText: 'Comedy',isCorrect: true },
        {answerText: 'Family',isCorrect: true }
      ],
    }
  ];

  const handleAnswerClick = (isCorrect, answerText) => {
    // Update answers state
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answerText,
    }));

    // Update score if the answer is correct
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question or show results
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendation = () => {
    const streamingService = answers[1];
    const genre = answers[3] || answers[4]; // Movie or TV genre based on the answer

    // example until API works
    if (streamingService === 'Netflix' && genre === 'Action') {
      return 'Check out "Extraction" on Netflix.';
    } else if (streamingService === 'Disney+' && genre === 'Family') {
      return 'You might enjoy "Encanto" on Disney+.';
    }
    return 'No recommendation found, please try again with different filters.';
  };

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };

  return (
    <div className="fullScreen">
      <div className="filters">
        <h3>Filters</h3>
      <h5>Years:</h5>
      <label>
        <input
          type="checkbox"
          name="item1"
          checked={checkedItems.item1 || false}
          onChange={handleCheckboxChange}/>
        Before 1950
      </label> <br></br>

      <label>
        <input
          type="checkbox"
          name="item2"
          checked={checkedItems.item2 || false}
          onChange={handleCheckboxChange}/>
        1951-1970
      </label><br></br>

      <label>
        <input
          type="checkbox"
          name="item3"
          checked={checkedItems.item2 || false}
          onChange={handleCheckboxChange}/>
        1971-1990
      </label><br></br>

      <label>
        <input
          type="checkbox"
          name="item4"
          checked={checkedItems.item2 || false}
          onChange={handleCheckboxChange}/>
        1991-2005
      </label><br></br>

      <label>
        <input
          type="checkbox"
          name="item5"
          checked={checkedItems.item2 || false}
          onChange={handleCheckboxChange}/>
        2006-2012
      </label><br></br>

      <label>
        <input
          type="checkbox"
          name="item3"
          checked={checkedItems.item2 || false}
          onChange={handleCheckboxChange}/>
        2013-today
      </label><br></br><br></br>

      <label>
      <h5>Genre Masterlist:</h5>
      <select name="genre">
        <option value="none"></option>
        <option value="action">Action</option>
        <option value="adventure">Adventure</option>
        <option value="animation">Animation</option>
        <option value="comedy">Comedy</option>
        <option value="crime">Crime</option>
        <option value="documentary">Documentary</option>
        <option value="drama">Drama</option>
        <option value="family">Family</option>
        <option value="fantasy">Fantasy</option>
        <option value="history">History</option>
        <option value="horror">Horror</option>
        <option value="music">Music</option>
        <option value="mystery">Mystery</option>
        <option value="news">News</option>
        <option value="reality">Reality</option>
        <option value="romance">Romance</option>
        <option value="scifi">Science Fiction</option>
        <option value="talk">Talk Show</option>
        <option value="thriller">Thriller</option>
        <option value="war">War</option>
        <option value="western">Western</option>
      </select>
    </label> <br></br> <br></br>

    <label>
    <h5>All Available Services: </h5>
      <select name="service">
        <option value="none"></option>
        <option value="netflix">Netflix</option>
        <option value="prime">Prime Video</option>
        <option value="disney">Disney+</option>
        <option value="hbo">Max</option>
        <option value="hulu">Hulu</option>
        <option value="apple">Apple TV</option>
        <option value="peacock">Peacock</option>
        <option value="paramount">Paramount+</option>
        <option value="starz">Starz</option>
        <option value="mubi">Mubi</option>
        <option value="britbox">BritBox</option>
        <option value="curiosity">Curiosity Stream</option>
        <option value="discovery">Discovery+</option>
        <option value="plutotv">Pluto TV</option>
        <option value="tubi">Tubi</option>
        <option value="zee5">Zee5</option>
      </select>
    </label>
    <p><br></br></p>
    <Button variant="primary" onClick={() => window.location.reload()}>
      Add filters
    </Button>
    <p><br></br></p>
    <Button variant="primary" onClick={() => window.location.reload()}>
      Surprise Me!
    </Button>
    </div>

      <div className="rightChunk">
        
        <div className='quiz'>
        <Container>
          <Row className="quiz">
            <Col md={6}>
              {showResults ? (
                <div className="recommendation">
                  <h2>Top 3 Picks Below</h2>
                  <p><br></br><br></br></p>
                  <Button variant="primary" onClick={() => window.location.reload()}>
                    Refresh Recommendations
                  </Button> 
                  <p><br></br><br></br></p>
                  <Button variant="primary" onClick={() => window.location.reload()}>
                    Retake The Quiz
                  </Button>
                </div>
              ) : (
                <div className ="quiz">
                  <h2>{questions[currentQuestion].question}</h2>
                  <div className="answer-options">
                    {questions[currentQuestion].answerOptions.map((option) => (
                      <Button
                        key={option.answerText}
                        className="m-2"
                        variant="outline-primary"
                        onClick={() => handleAnswerClick(option.isCorrect, option.answerText)}
                      >
                        {option.answerText}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container> </div>
        <div className='threeShows'>
          <h2>Your Recommendations</h2>
            <div className='show1'>
              <h1>Movie 1</h1><br></br>
              <Button variant="primary" onClick={() => window.location.reload()}>
                  Watch Now
              </Button> 
              <p>Recommendation: {getRecommendation()}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                  Save to Watch Later
              </Button>
            </div> 
            
            <div className='show2'>
            <h1>Movie 2</h1><br></br>
              <h6>2</h6>
            </div> 
            <div className='show3'>
            <h1>Movie 3</h1><br></br>
              <h6>3</h6>
            </div> 
        </div>
      </div>
    </div>
  );
}
