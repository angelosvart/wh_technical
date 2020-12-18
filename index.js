import handleUser from './js/handleUser'

//Init function to set up slider and event listeners for the Git form
(() => {
    //Add control buttons depending on how many images are in the slider so only the picture tag has to be added in the HTML.
    const images = [...document.querySelectorAll(".slider picture")];
    const dotContainer = document.querySelector(".slider-control");
    
    for (const [index, image] of images.entries()) {
        const span = document.createElement('span');
        span.className = "dot";
        if (index === 0) {
            span.classList.add("active");
        }
        span.dataset.id = index+1
        image.dataset.id = index+1;
        dotContainer.appendChild(span);
    }

    //Create event listeners for the dot buttons to scroll to image when clicked
    const dots = document.querySelectorAll(".slider-control .dot");
    for (const [index, dot] of dots.entries()) {
        dot.addEventListener("click", () => {
            const targetImage = document.querySelector(`[data-id='${index+1}']`);
            targetImage.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            dots.forEach((dot) => dot.classList.remove("active"));
            dot.classList.add("active");
        })
    }

    //Create event listener for Git username form
    const form = document.querySelector(".input-holder");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = document.querySelector(".card .message");
        if(event.target.classList.contains("inactive")) {
            return;
        }
        const username = document.querySelector("#username").value;
        if (username) {
            message.innerHTML = "";
            handleUser(username);
        } else {
            message.innerHTML = "<p class='error'>Please enter a username</p>";
        }
    });
})();