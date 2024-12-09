import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as streamingAvailability from "streaming-availability";
import reportWebVitals from './reportWebVitals';

const RAPID_API_KEY = "0a1ff5a105mshb59e70356a0218ep1017a2jsnee7345c90489";

export const Client = new streamingAvailability.Client(new streamingAvailability.Configuration({
    apiKey: RAPID_API_KEY
}));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 



export let searchResult = await Client.showsApi.searchShowsByFilters(({
  country: "us"
}));

export const country = await Client.countriesApi.getCountries({});

searchResult.shows.forEach((show) => {
  console.log(show.title);
  console.log(show.overview);
  show.streamingOptions["us"].forEach((streamingOption) => {
      if(streamingOption.service.id === "netflix") {
          console.log(streamingOption.link);
      }
  });
});
