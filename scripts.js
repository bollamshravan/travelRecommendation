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
                const link = document.createElement('a');
                link.href = result.url;
                link.textContent = result.name;
                resultsContainer.appendChild(link);
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