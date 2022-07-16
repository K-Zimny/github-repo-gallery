//overview, where profile information will appear
const overview = document.querySelector(".overview");
//github username
const username = "K-Zimny";
// unordered repo list
const repoList = document.querySelector(".repo-list");

//-----------------------------------------------------------------------------------------//
// fetch api

const getData = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  //   console.log(data);
  displayFetchedData(data);
};

getData();

//-----------------------------------------------------------------------------------------//
// display fetched user information

const displayFetchedData = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `<figure>
  <img alt="user avatar" src=${data.avatar_url} />
</figure>
<div>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Bio:</strong> ${data.bio}</p>
  <p><strong>Location:</strong> ${data.location}</p>
  <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
</div> `;
  overview.append(div);
};

//-----------------------------------------------------------------------------------------//
// get repo api fetch

const getRepo = async function () {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const data = await res.json();
  console.log(data);
  displayRepoInfo(data);
};

getRepo();

//-----------------------------------------------------------------------------------------//
// display info about each repo

const displayRepoInfo = function (repos) {
  for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};
