import UserControl from './UserControl'

//Function that takes care of handling the UserControl class and injects the results in the DOM
export default async function handleUser(username) {
    const results = document.querySelector(".results-holder");
    const message = document.querySelector(".card .message");
    const createUserControl = new UserControl(username);
    await createUserControl.getUserData();

    //Valid users have user ID, checking it first to search for repos
    if (createUserControl.getUserId()) {
        //Check public repo number, only show results if user has public repos.
        //Here the results list is created and injected
        if (createUserControl.getRepoNumber() > 0) {
            await createUserControl.getUserRepos();
            const repoList = createUserControl.getRepos();
            const div = document.createElement('div');
            const p = document.createElement('p');
            p.innerHTML = `User ${createUserControl.getUserName()} has ${createUserControl.getRepoNumber()} ${(createUserControl.getRepoNumber() > 1) ? 'repositories' : 'repository'}`;
            p.classList.add("description");
            div.classList.add("repo-grid");
            div.appendChild(p);
            for (const repo in repoList) {
                const a = document.createElement('a');
                a.href = repoList[repo].html_url;
                a.innerText = repoList[repo].name;
                div.appendChild(a);
            }
            results.innerHTML = "";
            results.appendChild(div);
            results.style.visibility = "visible";
        //If no public repos, show message
        } else {
            createUserControl.toggleLoader();
            message.innerHTML = `<p class='error'>User ${createUserControl.getUserName()} doesn't have any public repositories</p>`;
        }
    //If no ID found, user doesnt exist
    } else {
        createUserControl.toggleLoader();
        message.innerHTML = `<p class='error'>User ${createUserControl.getUserName()} was not found</p>`;
    }
    
}