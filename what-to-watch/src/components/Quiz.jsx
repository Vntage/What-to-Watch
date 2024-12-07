import React, { useState } from 'react';
import './StreamingQuiz.css'

const StreamingQuiz = () => {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [budget, setBudget] = useState(5);
    const [watchPreference, setWatchPreference] = useState('both');
    const [preferredLanguages, setPreferredLanguages] = useState([]);
    const [adsPreference, setAdsPreference] = useState('noAds');
    const [recommendation, setRecommendation] = useState(null);

    const handleGenreChoice = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((item) => item !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    };

    const handleLanguageSelection = (language) => {
        if (preferredLanguages.includes(language)) {
            setPreferredLanguages(preferredLanguages.filter((lang) => lang !== language));
        } else {
            setPreferredLanguages([...preferredLanguages, language]);
        }
    };

    const recommendStreamingService = () => {
        const services = [
            {
                name: 'Netflix',
                genres: ['Comedy', 'Thriller', 'Drama'],
                budgetRange: [10, 20],
                languages: ['English', 'Spanish', 'French'],
                ads: false,
            },
            {
                name: 'Hulu',
                genres: ['Comedy', 'Horror', 'Drama'],
                budgetRange: [6, 15],
                languages: ['English'],
                ads: true,
            },
            {
                name: 'Disney+',
                genres: ['Comedy', 'Family', 'Adventure'],
                budgetRange: [8, 12],
                languages: ['English', 'French', 'Hindi'],
                ads: false,
            },
        ];
    
        const filteredServices = services.filter(
            (service) =>
                budget >= service.budgetRange[0] &&
                budget <= service.budgetRange[1] &&
                (adsPreference === 'yesAds' ? service.ads : !service.ads)
        );
    
        let bestMatch = null;
        let maxGenreMatches = 0;
    
        filteredServices.forEach((service) => {
            const matchedGenres = service.genres.filter((genre) =>
                selectedGenres.includes(genre.toLowerCase())
            );
            if (matchedGenres.length > maxGenreMatches) {
                maxGenreMatches = matchedGenres.length;
                bestMatch = {
                    name: service.name,
                    reason: `You selected ${matchedGenres.join(
                        ', '
                    )}, and ${service.name} fits your budget, ad preference, and offers these genres.`,
                };
            }
        });
    
        if (!bestMatch) {
            bestMatch = {
                name: filteredServices.length > 0 ? filteredServices[0].name : 'Netflix',
                reason: filteredServices.length > 0
                    ? `${filteredServices[0].name} fits your budget and ad preferences, offering a diverse library.`
                    : 'Netflix is a diverse option that fits many preferences.',
            };
        }
    
        setRecommendation(bestMatch);
    };
    
    
    
    return (
        <div className='quiz-content'>
            <h1>Streaming Platform Quiz</h1>

            <h3>Pick Your Favorite Genre(s)</h3>
            <div className="checkbox-container">
                {['Comedy', 'Horror', 'Thriller', 'Action', 'Romance', 'Sci-fi', 'Drama', 'Documentary', 'Animation', 'Family/Kids', 'Mystery', 'Fantasy'].map((currentGenre, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`genre${index}`}
                            value={currentGenre.toLowerCase()}
                            checked={selectedGenres.includes(currentGenre.toLowerCase())}
                            onChange={() => handleGenreChoice(currentGenre.toLowerCase())}
                        />
                        <label htmlFor={`genre${index}`}>{currentGenre}</label>
                    </div>
                ))}
            </div>

            <h3>Do you prefer watching movies, TV shows, or both?</h3>
            <div>
                <input
                    type="radio"
                    id="movies"
                    value="movies"
                    checked={watchPreference === 'movies'}
                    onChange={() => setWatchPreference('movies')}
                />
                <label htmlFor="movies">Movies</label>
            </div>

            <br />

            <div>
                <input
                    type="radio"
                    id="tvShows"
                    value="tvShows"
                    checked={watchPreference === 'tvShows'}
                    onChange={() => setWatchPreference('tvShows')}
                />
                <label htmlFor="tvShows">TV Shows</label>
            </div>

            <br />

            <div>
                <input
                    type="radio"
                    id="both"
                    value="both"
                    checked={watchPreference === 'both'}
                    onChange={() => setWatchPreference('both')}
                />
                <label htmlFor="both">Both</label>
            </div>

            <h3>Which languages do you prefer for your content?</h3>
            <div className="checkbox-container">
                {['English', 'Spanish', 'French', 'Korean', 'Hindi'].map((language) => (
                    <div key={language}>
                        <input
                            type="checkbox"
                            id={language}
                            value={language}
                            checked={preferredLanguages.includes(language)}
                            onChange={() => handleLanguageSelection(language)}
                        />
                        <label htmlFor={language}>{language}</label>
                    </div>
                ))}
            </div>

            <h3>Are you okay with advertisements in your streaming experience?</h3>
            <div>
                <input
                    type="radio"
                    id="yesAds"
                    value="yesAds"
                    checked={adsPreference === 'yesAds'}
                    onChange={() => setAdsPreference('yesAds')}
                />
                <label htmlFor="yesAds">Yes</label>
            </div>

            <br />

            <div>
                <input
                    type="radio"
                    id="noAds"
                    value="noAds"
                    checked={adsPreference === 'noAds'}
                    onChange={() => setAdsPreference('noAds')}
                />
                <label htmlFor="noAds">No, I prefer ad-free</label>
            </div>

            <br />

            <h3>Set Your Budget</h3>
            <div className="slider-container">
                <input
                    type="range"
                    min="0"
                    max="30"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="slider"
                />
                <p>Budget: ${budget}</p>
            </div>


            <div className="button-container">
                <button type="button" onClick={recommendStreamingService}>
                    Submit
                </button>
            </div>

            {recommendation && (
                <div>
                    <h2>Recommendation: {recommendation.name}</h2>
                    <p>Reason: {recommendation.reason}</p>
                </div>
            )}

        </div>
    )

}

export default StreamingQuiz;
