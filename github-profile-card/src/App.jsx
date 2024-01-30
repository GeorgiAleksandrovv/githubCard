import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./component/ProfileCard";
import "./component/ProfileCard.css";
import Spinner from "./component/Spinner";
import "./component/Spinner.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repoCount, setRepoCount] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [randomQuote, setRandomQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);

      const repoResponse = await axios.get(response.data.repos_url);
      setRepoCount(repoResponse.data.length);

      const languagesSet = new Set();
      repoResponse.data.forEach((repo) => {
        if (repo.language) {
          languagesSet.add(repo.language);
        }
      });
      setLanguages(Array.from(languagesSet));

      const followersResponse = await axios.get(response.data.followers_url);
      setFollowers(followersResponse.data.length);

      const followingResponse = await axios.get(
        response.data.following_url.split("{")[0]
      );
      setFollowing(followingResponse.data.length);

      const quoteResponse = await axios.get("https://api.quotable.io/random");
      setRandomQuote(quoteResponse.data.content);
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <Spinner />
      ) : (
        userData && (
          <div className="background">
            <ProfileCard
              userData={userData}
              repoCount={repoCount}
              languages={languages}
              followers={followers}
              following={following}
              randomQuote={randomQuote}
            />
          </div>
        )
      )}
    </div>
  );
}

export default App;

