const userNames = {
    github: "Hklug001",
    linkedin: "henrique-klug",
    twitter: "henrique-klug",
}

function getGitHubAPI() {
    const url = `https://api.github.com/users/${userNames.github}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            avatar.src = data.avatar_url
            name.textContent = data.name
            description.textContent = data.bio
        });
}

getGitHubAPI();