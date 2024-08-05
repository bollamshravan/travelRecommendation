document.addEventListener('DOMContentLoaded', () => {
    let recommendationsData = [];

    // Fetch the recommendations data
    fetch('travel_recommendations_api.json')
        .then(response => response.json())
        .then(data => {
            recommendationsData = data;
            console.log(recommendationsData); // Log the data to verify
        })
        .catch(error => console.error('Error fetching data:', error));

    document.getElementById('search-button').addEventListener('click', function() {
        const query = document.getElementById('search-input').value.toLowerCase();
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = '';

        // Filter recommendations based on the search query
        const filteredRecommendations = [];

        recommendationsData.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(query)) {
                    filteredRecommendations.push({ name: city.name, url: city.url });
                }
            });
        });

        recommendationsData.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(query)) {
                filteredRecommendations.push({ name: temple.name, url: temple.url });
            }
        });

        recommendationsData.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(query)) {
                filteredRecommendations.push({ name: beach.name, url: beach.url });
            }
        });

         // Display the filtered recommendations in the dropdown
         if (filteredRecommendations.length > 0) {
            filteredRecommendations.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

             /*   const link = document.createElement('a');
                link.href = '#'; // Update this to the actual URL if available
                link.textContent = result.name;*/

                const image = document.createElement('img');
                image.src = result.imageUrl;
                image.width = '256px';
                image.height = '256px';
                image.alt = result.name;

                const description = document.createElement('p');
                description.textContent = result.description;

               // resultItem.appendChild(link);
                resultItem.appendChild(image);
                resultItem.appendChild(description);

               /* const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <img src="${result.imageUrl}"  width="256" height="256" alt="${result.name}">
                    <p>${result.description}</p>
                `;*/

                resultsContainer.appendChild(resultItem);
            });
            resultsContainer.style.display = 'block';
        } else {
            const noResults = document.createElement('p');
            noResults.textContent = 'No recommendations found.';
            resultsContainer.appendChild(noResults);
            resultsContainer.style.display = 'block';
        }
    });

    document.getElementById('reset-button').addEventListener('click', function() {
        document.getElementById('search-input').value = '';
        document.getElementById('search-results').innerHTML = '';
        document.getElementById('search-results').style.display = 'none';
        alert('Search reset');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thanks for the details.');
    });
});

const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);