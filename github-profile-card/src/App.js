import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [repoCount, setRepoCount] = useState(0);
  const [languages, setLanguages] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

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
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
      }
    };

    fetchGitHubProfile();
  }, []);

  return (
    <div className="App">
      {userData && (
        <div className="profile-card">
          <img
            className="profile-pic"
            src={userData.avatar_url}
            alt="Profile Picture"
          />
          <h1 className="username">{userData.login}</h1>
          <h2 className="bio">{userData.bio}</h2>
          <h2 className="normal-text">Number of Repositories: {repoCount}</h2>
          <h2 className="normal-text">
            Languages Used: {languages.join(", ")}
          </h2>

          <div className="social-container">
            <div className="followers">
              <h1 className="bold-text">{followers}</h1>
              <h2 className="smaller-text">Followers</h2>
            </div>

            <div className="followers">
              <h1 className="bold-text">{following}</h1>
              <h2 className="smaller-text">Following</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
