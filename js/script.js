//overview, where profile information will appear
const overview = document.querySelector(".overview");
//github username
const username = "K-Zimny";
// unordered repo list
const repoList = document.querySelector(".repo-list");
// repos section
const repoSection = document.querySelector(".repos");
//individual repo data
const individualRepoData = document.querySelector(".repo-data");
//back to repo gallery btn
const viewRepos = document.querySelector(".view-repos");
//input for filtering
const filterInput = document.querySelector(".filter-repos");

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
  //   console.log(data);
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
  filterInput.classList.remove("hide");
};

//-----------------------------------------------------------------------------------------//
// Click event for ul of repo list
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    // console.log(repoName);
    getIndividualRepo(repoName);
  }
});

//-----------------------------------------------------------------------------------------//
// Get specific repo info fetch

const getIndividualRepo = async function (repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const data = await res.json();
  console.log(data);
  const languageRes = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/languages`
  );
  const languageData = await languageRes.json();
  console.log(languageData);
  const languageArray = [];
  for (let key in languageData) {
    languageArray.push(key);
  }

  displaySpecificRepoInfo(data, languageArray);
};

//-----------------------------------------------------------------------------------------//
// Display specific repo information on page (more info)

const displaySpecificRepoInfo = function (repoInfo, languages) {
  individualRepoData.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
  individualRepoData.append(div);
  individualRepoData.classList.remove("hide");
  repoList.classList.add("hide");
  viewRepos.classList.remove("hide");
  filterInput.classList.add("hide");
};

//-----------------------------------------------------------------------------------------//
// Display specific repo information on page (more info)

viewRepos.addEventListener("click", function () {
  individualRepoData.classList.add("hide");
  repoList.classList.remove("hide");
  viewRepos.classList.add("hide");
  filterInput.classList.remove("hide");
});

//-----------------------------------------------------------------------------------------//
// Add Input event listener

// // Dynamic search
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchLowerText = searchText.toLowerCase();

  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLowerText)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
