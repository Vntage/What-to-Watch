import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import './movie.css';
import * as streamingAvailability from "../index";

export default function App() {
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [filters, setFilters] = useState({
    years: [],
    genre: '',
    service: ''
  });

  const questions = [
    {
      id: 1,
      question: 'What Streaming Service?',
      answerOptions: ['netflix', 'hulu', 'hbo', 'disney'],
    },
    {
      id: 2,
      question: 'Movie or TV Show?',
      answerOptions: ['movie', 'series'],
    },
    {
      id: 3,
      question: 'What Movie Genre?',
      answerOptions: ['action', 'drama', 'horror', 'comedy', 'family', 'documentary']
    },
    {
      id: 4,
      question: 'How many Recommendations (max 6)',
      answerOptions: [1, 3, 6, 9, 12, 15],
    }
  ];

  const handleAnswerClick = (answerText) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = answerText; // Update the specific index
      return newAnswers;
    });

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (checked) {
        newFilters.years.push(name);
      } else {
        newFilters.years = newFilters.years.filter((year) => year !== name);
      }
      return newFilters;
    });
  };

  const handleGenreChange = (event) => {
    setFilters({ ...filters, genre: event.target.value });
  };

  const handleServiceChange = (event) => {
    setFilters({ ...filters, service: event.target.value });
  };

  useEffect(() => {
    console.log('Updated Answers:', answers); // Log updated answers
  }, [answers]);

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResults(false);
    setFilters({
      years: [],
      genre: '',
      service: ''
    });
  };

  return (
    <div className="fullScreen">
      <div className="filters">
        <h3>Filters</h3>
        <h5>Years:</h5>
        <label>
          <input
            type="checkbox"
            name="before1950"
            checked={filters.years.includes('before1950')}
            onChange={handleCheckboxChange} />
          Before 1950
        </label><br />

        <label>
          <input
            type="checkbox"
            name="1951-1970"
            checked={filters.years.includes('1951-1970')}
            onChange={handleCheckboxChange} />
          1951-1970
        </label><br />

        <label>
          <input
            type="checkbox"
            name="1971-1990"
            checked={filters.years.includes('1971-1990')}
            onChange={handleCheckboxChange} />
          1971-1990
        </label><br />

        <label>
          <input
            type="checkbox"
            name="1991-2005"
            checked={filters.years.includes('1991-2005')}
            onChange={handleCheckboxChange} />
          1991-2005
        </label><br />

        <label>
          <input
            type="checkbox"
            name="2006-2012"
            checked={filters.years.includes('2006-2012')}
            onChange={handleCheckboxChange} />
          2006-2012
        </label><br />

        <label>
          <input
            type="checkbox"
            name="2013-today"
            checked={filters.years.includes('2013-today')}
            onChange={handleCheckboxChange} />
          2013-today
        </label><br /><br />

        <label>
          <h5>Genre:</h5>
          <select name="genre" value={filters.genre} onChange={handleGenreChange}>
            <option value="none">None</option>
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
        </label><br /><br />

        <label>
          <h5>Streaming Service:</h5>
          <select name="service" value={filters.service} onChange={handleServiceChange}>
            <option value="none">None</option>
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
        </label><br /><br />

        <Button variant="primary" onClick={() => resetQuiz()}>
          Apply Filters
        </Button><br />
      </div>

      <div className="rightChunk">
        <div className='quiz'>
          <Container>
            <Row className="quiz">
              <Col md={6}>
                {showResults ? (
                  <div className="recommendation">
                    <h2>Top Picks Below</h2>
                    <p><br /><br /></p>
                    <p><br /><br /></p>
                    <Button variant="primary" onClick={resetQuiz}>
                      Retake The Quiz
                    </Button>
                  </div>
                ) : (
                  <div className="quiz">
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
          </Container>
        </div>
        <div className='threeShows'>
          <h2>Your Recommendations</h2>
          <div>
            <ol>
              {streamingAvailability.searchResult.shows.filter((show) => {
                const isShowTypeMatch = show.showType === answers[1];
                const isGenreMatch = filters.genre === '' || show.genres.includes(filters.genre);
                const isServiceMatch = filters.service === '' || show.streamingOptions.us.some(option => option.provider === filters.service);
                const isYearMatch = filters.years.length === 0 || filters.years.some(yearRange => show.releaseYear >= parseInt(yearRange.split('-')[0]) && show.releaseYear <= parseInt(yearRange.split('-')[1]));
                return isShowTypeMatch && isGenreMatch && isServiceMatch && isYearMatch;
              })
                .slice(0, answers[3]) // Limit the recommendations
                .map((show, index) => (
                  <li key={show.title}>
                    <img
                      src={show.imageSet.horizontalPoster.w1440 || 'https://via.placeholder.com/150'}
                      alt={`${show.title} poster`}
                      style={{
                        width: '500px',
                        height: 'auto',
                        marginBottom: '10px',
                      }} /><br />
                    {`Movie ${index + 1}: ${show.title}`}
                    <br />
                    <a href={show.streamingOptions.us[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}>
                    <Button variant="primary">
                        Watch Now
                    </Button>
                    </a>

                    <br />
                    {`Overview: ${show.overview}`}
                    <br />
                    {`Show Type: ${show.showType}`}
                    <br />
                    {`Directors: ${show.directors}`}
                    <br />
                    {`Release Year: ${show.releaseYear}`}
                    <br />
                    {`Genres: ${show.genres ? show.genres.map((genre) => genre.name).join(', ') : 'N/A'}`}
                    <br />
                    {`Cast: ${show.cast}`}
                    <br />
                    {`Rating: ${show.rating}`}
                    <br />
                    <Button variant="primary" onClick={() => window.location.reload()}>
                      Save to Watch Later
                    </Button> <br /><br /><br />
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
