//Class will handle all actions after username is input: retrieveng user data and repo data from the API to be used by handleUser
export default class userControl {

    constructor(username) {
        this.username = username;
        this.repoNumber = 0;
        this.repos = [];
        this.userId;
    }

    async getUserData() {
        this.toggleLoader();
        try {
            const response = await fetch(`https://api.github.com/users/${this.username}`, { method: 'GET'});
            const apiData = await response.json();
            this.repoNumber = apiData.public_repos;
            this.userId = apiData.id;
          } catch (err) {
            this.toggleLoader();
            const message = document.querySelector(".card .message");
            message.innerHTML = "<p class='error'>There was an error obtaining the data from the server. Please try again!<p>"
          }
    }

    async getUserRepos() {
        this.toggleLoader();
        try {
            const response = await fetch(`https://api.github.com/users/${this.username}/repos`, { method: 'GET'});
            const apiData = await response.json();
            this.repos = [...apiData];
          } catch (err) {
            this.toggleLoader();
            const message = document.querySelector(".card .message");
            message.innerHTML = "<p class='error'>There was an error obtaining the data from the server. Please try again!<p>"
          }
    }

    toggleLoader() {
        document.querySelector(".container i").classList.toggle("active");
        document.querySelector(".send").classList.toggle("inactive");
    }

    getRepoNumber() {
        return this.repoNumber;
    }

    getRepos() {
        return this.repos;
    }

    getUserName() {
        return this.username;
    }

    getUserId() {
        return this.userId;
    }    
}