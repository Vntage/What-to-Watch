import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {Container, Row, Col,Button} from "react-bootstrap";
import './movie.css';
import * as streamingAvailability from "../index";

export default function App() {
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [showResults, setShowResults] = useState(false); 

  const questions = [
    {
      id:1,
      question: 'What Streaming Service?',
      answerOptions: ['netflix','hulu','hbo','disney'],
    },
    {
      id: 2,
      question: 'Movie or TV Show?',
      answerOptions: ['movie','series'],
    },
    {
      id: 3,
      question: 'What Movie Genre?',
      answerOptions: ['action','drama','horror','comedy','family', 'documentary']
    },
    {
      id: 4,
      question: 'How many Recommendations (max 6)',
      answerOptions: [1, 2, 3, 4, 5, 6],
    }
  ];

  const handleAnswerClick = (answerText) => {
    // Update answers state
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerText; // Update the specific index
      return newAnswers;
    });
    // Move to the next question or show results
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems({ ...checkedItems, [name]: checked });
  };
  useEffect(() => {
    console.log('Updated Answers:', answers); // Log updated answers
  }, [answers]);

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
                        key={option}
                        className="m-2"
                        variant="outline-primary"
                        onClick={() => handleAnswerClick(option)}
                      >
                        {option}
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
              <div>
                <ol>
                {streamingAvailability.searchResult.shows.filter((show) => {
                  const isShowTypeMatch = show.showType === answers[1];
                  const isGenre = show.genres.some((genre) => genre.id === answers[2]);
                  return isShowTypeMatch && isGenre;
                 }) 
                  .slice(0,answers[3]).map((show,index) => (
                  <li key={show.title}>
                    <img
                    src={show.imageSet.horizontalPoster.w1440 || 'https://via.placeholder.com/150'} // Fallback placeholder
                    alt={`${show.title} poster`}
                    style={{
                    width: '500px', // Set image width
                    height: 'auto', // Maintain aspect ratio
                    marginBottom: '10px',
                    }}/> <br></br>
                    {`Movie ${index + 1}: ${show.title}`}
                    <br></br>
                    <a
                      href={show.streamingOptions.us[0].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none', // Removes underline from the link
                      }}
                    >
                    <Button variant="primary" onClick={() => show.streamingOptions.us.at(0).link}>
                      Watch Now
                    </Button> </a>
                    <br></br>
                    {`Overview: ${show.overview}`}
                    <br></br>
                    {`Overview: ${show.showType}`}
                    <br></br>
                    {`Directors: ${show.directors}`}
                    <br></br>
                    {`Release Year: ${show.releaseYear}`}
                    <br></br>
                    {`Genres: ${show.genres ? show.genres.map((genre) => genre.name).join(', ') : 'N/A'}`}
                    <br></br>
                    {`Cast: ${show.cast}`}
                    <br></br>
                    {`Rating: ${show.rating}`}
                    <br></br>
                    <Button variant="primary" onClick={() => window.location.reload()}>
                        Save to Watch Later
                    </Button> <br></br><br></br><br></br>
                  </li>
                  ))}
                </ol>
                {console.log(answers)};
            </div>
        </div> 
      </div>
    </div>
  );
}
