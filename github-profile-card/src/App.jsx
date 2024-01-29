import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./component/ProfileCard";
import "./component/ProfileCard.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [repoCount, setRepoCount] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [randomQuote, setRandomQuote] = useState("");

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/users/GeorgiAleksandrovv"
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
        const quoteResponse = await axios.get(
          "https://zenquotes.io/api/random"
        );
        setRandomQuote(quoteResponse.data[0].q);
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    };

    fetchGitHubProfile();
  }, []);

  return (
    <div className="App">
      {userData && (
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
      )}
    </div>
  );
}

export default App;
