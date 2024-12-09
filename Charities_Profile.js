

document.getElementById("volunteer-btn").addEventListener("click", function() {
    const formContainer = document.getElementById("form-container");

    // Check if the form is already created to prevent duplication
    if (!formContainer.hasChildNodes()) {
        // Create the form
        const form = document.createElement("form");

        // Create and append input fields
        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Name: ";
        nameLabel.setAttribute("for", "name");
        form.appendChild(nameLabel);

        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "name";
        nameInput.name = "name";
        nameInput.required = true;
        form.appendChild(nameInput);
        form.appendChild(document.createElement("br"));

        const emailLabel = document.createElement("label");
        emailLabel.textContent = "Email: ";
        emailLabel.setAttribute("for", "email");
        form.appendChild(emailLabel);

        const emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.id = "email";
        emailInput.name = "email";
        emailInput.required = true;
        form.appendChild(emailInput);
        form.appendChild(document.createElement("br"));

        const phoneLabel = document.createElement("label");
        phoneLabel.textContent = "Phone: ";
        phoneLabel.setAttribute("for", "phone");
        form.appendChild(phoneLabel);

        const phoneInput = document.createElement("input");
        phoneInput.type = "tel";
        phoneInput.id = "phone";
        phoneInput.name = "phone";
        form.appendChild(phoneInput);
        form.appendChild(document.createElement("br"));

        // Create and append a submit button
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Submit";
        form.appendChild(submitButton);

        // Append form to the container
        formContainer.appendChild(form);
    }

    // Show the form
    formContainer.style.display = "block";
});


const button = document.getElementById("volunteer-btn");
const infoBox = document.getElementById("info-box");

// Show the information box on hover
button.addEventListener("mouseover", function(event) {
    const buttonRect = button.getBoundingClientRect();

    // Position the info box near the button
    infoBox.style.left = `${buttonRect.left}px`;
    infoBox.style.top = `${buttonRect.top - infoBox.offsetHeight - 10}px`;

    // Display the info box
    infoBox.style.display = "block";
});

// Hide the information box when not hovering
button.addEventListener("mouseout", function() {
    infoBox.style.display = "none";
});


//API code for Every.org
const apiKey = 'pk_live_bc239c8584c3e6af413cda85a9c93243';
const baseUrl = 'https://partners.every.org/v0.2/nonprofits';

async function fetchNonprofits() {
    const container = document.getElementById('nonprofits-container');
    container.innerHTML = '<p>Loading nonprofits...</p>';

    try {
        const response = await fetch(`${baseUrl}?limit=5`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Clear the loading message
        container.innerHTML = '';

        // Render nonprofits
        data.nonprofits.forEach(nonprofit => {
            const nonprofitDiv = document.createElement('div');
            nonprofitDiv.className = 'nonprofit';

            nonprofitDiv.innerHTML = `
                <h2>${nonprofit.name}</h2>
                <p><strong>Mission:</strong> ${nonprofit.mission}</p>
                <a href="${nonprofit.profileUrl}" target="_blank">Learn More</a>
            `;

            container.appendChild(nonprofitDiv);
        });

    } catch (error) {
        console.error('Error fetching data from Every.org:', error);
        container.innerHTML = '<p>Failed to load nonprofits. Please try again later.</p>';
    }
}

// Fetch nonprofits when the page loads
fetchNonprofits();
