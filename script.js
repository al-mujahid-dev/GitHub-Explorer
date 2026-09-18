let username = document.getElementById("username");
let profile = document.getElementById("profile");
let inputField = document.querySelector(".input-field");
let message = document.getElementById("message");
let searchBtn = document.getElementById("searchBtn");

// using event delegation
inputField.addEventListener("click", function(event) {
    // target the button
    if (event.target.id === "searchBtn") {
        let searchUsername = username.value.trim();

        if (!searchUsername) {
            message.textContent = "Please enter a username";

            // show the error message
            message.classList.add("show");

            return;
        }
        
        message.textContent = "";
        message.classList.remove("show");
        profile.innerHTML = "";
        // event.target.textContent = "Searching..."; // kind of loading effect

        event.target.textContent = "Searching...";
        
        
        let url = "https://api.github.com/users/" + searchUsername;
        // console.log(url);

        // process and show user properties
        fetch(url)
            .then(function(response) {
                // console.log("Response received");
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject("Username not found.");
                }
            })
            .then(function(data) {
                // console.log("Data received");
                // display information
                // console.log(data);

                username.value = "";

                // change the button back to Search
                event.target.textContent = "Search";
                message.classList.remove("show");

                let bioText; // handle missing bio and location data
                let locationText;
                let nameText;

                if (data.name) {
                    nameText = data.name;
                } else {
                    nameText = "Not available";
                }

                if (data.bio) {
                    bioText = data.bio;
                } else {
                    bioText = "No bio available";
                }

                if (data.location) {
                    locationText = data.location;
                } else {
                    locationText = "No location available";
                }

                profile.innerHTML = `
                <div class="profile-card">
                    <div class="profile-header">
                        <img src="${data.avatar_url}" alt="${data.login}" class="profile-image">

                        <div class="profile-content">
                            <div class="profile-info">
                                <h2>Name: ${nameText}</h2>
                                <p>Username: @${data.login}</p>
                            </div>
                            
                            <div class="profile-details">
                                <p>Bio: ${bioText}</p>
                                <p>Location: ${locationText}</p>
                            </div>
                        </div>
                    </div>

                    <div class="statistics">
                        <div class="stats-card">
                            <p>Followers: ${data.followers}</p>
                        </div>

                        <div class="stats-card">
                            <p>Following: ${data.following}</p>
                        </div>

                        <div class="stats-card">
                            <p>Public Repositories: ${data.public_repos}</p>
                        </div>

                        <div class="stats-card">
                            <p>Public Gists: ${data.public_gists}</p>
                        </div>
                    </div>

                    <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
                </div>
                `;
            })
            .catch(function(error) {
                event.target.textContent = "Search";
                message.textContent = error;
                message.classList.add("show");
            })
            
    }
})

// listen for keyboard press
username.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
})