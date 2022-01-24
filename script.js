const userNames = {
    github: "Hklug001",
    linkedin: "henrique-klug",
    twitter: "KlugHenrique",
    email: 'henriqueklug@gmail.com',
}

const gitHubApi = {
    setUser() {
        const url = `https://api.github.com/users/${userNames.github}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                avatar.src = data.avatar_url
                myName.textContent = data.name
                description.textContent = data.bio
                myLocation.textContent = data.location
                gitHubUrl.href = data.html_url
            });
    },

    setRepos() {
        const url = `https://api.github.com/users/${userNames.github}/repos`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(repos => {
                    if (repos.private === false && repos.name != userNames.github) {
                        document.querySelector('#projects-display').innerHTML +=

                            `<section class="card project">
                                <a href="${repos.html_url}" target="_blank">
                                    <header class="project-title">
                                        <img src="assets/dark-theme/folder.svg" alt="">
                                        <h4>${repos.name}</h4>
                                    </header>
                                    <p class="project-description">${repos.description}</p>
                                    <div class="gitHub-assets">
                                        <div id="gitHub-stars-forks">
                                            <div id="gitHub-stars">
                                                <img src="assets/dark-theme/star.svg" alt="git star icon">
                                                <span>${repos.stargazers_count}</span>
                                            </div>
                                            <div id="gitHub-forks">
                                                <img src="assets/dark-theme/git-branch.svg" alt="git branch icon">
                                                <span>${repos.forks_count}</span>
                                            </div>
                                        </div>
                                        <div class="project-language">
                                            <img src="${repos.language == 'JavaScript' ? 'assets/js.svg' : `${repos.language == 'HTML' ? 'assets/html.svg' : `${repos.language == 'CSS' ? 'assets/css.svg' : `${repos.language == 'EJS' ? 'assets/ejs.svg' : ''}`}`}`}" alt="">
                                            <p class="language">${repos.language}</p>
                                        </div>
                                    </div>
                                
                            </section>`
                    }
                });
            });
    },
}


gitHubLogin.textContent = userNames.github;
linkedinLogin.textContent = userNames.linkedin;
twitterLogin.textContent = userNames.twitter;
mailLogin.textContent = userNames.email;

gitHubApi.setUser();
gitHubApi.setRepos();