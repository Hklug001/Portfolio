const userNames = {
    github: "Hklug001",
    linkedin: "henrique-klug"
}

function getGitHubProfile() {
    const url = `https://api.github.com/users/${userNames.github}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            avatar.src = data.avatar_url
            myName.textContent = data.name
            description.textContent = data.bio
            githubLink.href = data.html_url
        });
}

getGitHubProfile();