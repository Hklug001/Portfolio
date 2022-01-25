const userNames = {
    github: "Hklug001",
    linkedin: "henrique-klug",
    twitter: "KlugHenrique",
    email: 'henriqueklug@gmail.com',
}

const GitHubApi = {
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
                                <a href="${repos.homepage}" target="_blank">
                                    <header class="project-title">
                                        <img src="assets/dark-theme/folder.svg" alt="" class="img">
                                        <h4>${repos.name}</h4>
                                    </header>
                                    <p class="project-description">${repos.description}</p>
                                    <div class="gitHub-assets">
                                        <div id="gitHub-stars-forks">
                                            <div id="gitHub-stars">
                                                <img src="assets/dark-theme/star.svg" alt="git star icon" class="img">
                                                <span>${repos.stargazers_count}</span>
                                            </div>
                                            <div id="gitHub-forks">
                                                <img src="assets/dark-theme/git-branch.svg" alt="git branch icon" class="img">
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

const Theme = {
    lightTheme: `
        :root {
            --body-bg-color: #b0bec5;
            --text-color: black;
            --bg-cards: #dee4e7;
            --bg-techs: #14B5C0;
            --bt-bg-color: #302F3D;
         }`,

    darkTheme: `
        :root {
            --body-bg-color: #22212C;
            --text-color: #837E9F;
            --bg-cards: #302F3D;
            --bg-techs: #14B5C0;
            --bt-bg-color: #dee4e7;;
        }
    `,

    setLightTheme() {
        document.querySelectorAll('.img').forEach(img => {
            img.src = img.src.replace('dark', 'light');
        });
        style.innerHTML = Theme.lightTheme;
    },

    setDarkTheme() {
        document.querySelectorAll('.img').forEach(img => {
            img.src = img.src.replace('light', 'dark');
        });
        style.innerHTML = Theme.darkTheme;
    },

    storeTheme(theme) {
        localStorage.setItem('theme', theme);
    },

    toggleTheme() {
        if (localStorage.getItem('theme') === 'dark') {
            Theme.setLightTheme();
            Theme.storeTheme('light');
        } else {
            Theme.setDarkTheme();
            Theme.storeTheme('dark');
        }
    },

}

gitHubLogin.textContent = userNames.github;
linkedinLogin.textContent = userNames.linkedin;
twitterLogin.textContent = userNames.twitter;
mailLogin.textContent = userNames.email;

GitHubApi.setUser();
GitHubApi.setRepos();

(function () {
    if (localStorage.getItem('theme') === 'light') {
        Theme.setLightTheme();
    } else {
        Theme.setDarkTheme();
        Theme.storeTheme('dark');
    }
})();