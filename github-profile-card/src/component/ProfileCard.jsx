import React from "react";

function ProfileCard({
  userData,
  repoCount,
  languages,
  followers,
  following,
  randomQuote,
}) {
  return (
    <div className="profile-card">
      <img
        className="profile-pic"
        src={userData.avatar_url}
        alt="Profile Picture"
      />
      <h1 className="username">{userData.login}</h1>
      <h2 className="bio">{userData.bio}</h2>
      <h2 className="normal-text">Number of Repositories: {repoCount}</h2>
      <h2 className="normal-text">Languages Used: {languages.join(", ")}</h2>
      <h2 className="normal-text">Random Quote: {randomQuote}</h2>

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
  );
}

export default ProfileCard;
