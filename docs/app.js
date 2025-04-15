const gitHubForm = document.getElementById('gitHubForm');

gitHubForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('usernameInput');
    const repoInput = document.getElementById('repoInput');
    const userCommits = document.getElementById('userCommits');

    const gitHubUsername = usernameInput.value.trim();
    const repositoryName = repoInput.value.trim();

    userCommits.innerHTML = ''; // Limpar lista

    if (!gitHubUsername || !repositoryName) {
        alert("Preencha todos os campos!");
        return;
    }

    requestUserCommits(gitHubUsername, repositoryName)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'text-danger');
                li.innerHTML = `<strong>Repositório ou usuário não encontrado.</strong>`;
                userCommits.appendChild(li);
            } else {
                data.forEach(commit => {
                    const li = document.createElement('li');
                    li.classList.add('list-group-item');

                    const message = commit.commit.message;
                    const date = new Date(commit.commit.author.date).toLocaleString();

                    li.innerHTML = `
                        <p><strong>Mensagem:</strong> ${message}</p>
                        <p><strong>Data:</strong> ${date}</p>
                    `;
                    userCommits.appendChild(li);
                });
            }
        });
});

function requestUserCommits(username, repo) {
    return fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
}
