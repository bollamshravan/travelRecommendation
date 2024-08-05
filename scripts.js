document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider img');
    let currentIndex = 0;

    function showNextImage() {
        images[currentIndex].classList.remove('visible');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('visible');
    }

    setInterval(showNextImage, 3000);

    const searchButton = document.getElementById('search-button');
    const resetButton = document.getElementById('reset-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value;
        alert('Searching for: ' + query);
        // Add your search functionality here
    });

    resetButton.addEventListener('click', function() {
        searchInput.value = '';
        alert('Search reset');
        // Add your reset functionality here
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('travel_recommendations_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to verify

            // Function to create and append elements
            const createRecommendationElement = (category, recommendations) => {
                const section = document.createElement('section');
                section.id = category;
                const title = document.createElement('h2');
                title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                section.appendChild(title);

                recommendations.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'recommendation';

                    const img = document.createElement('img');
                    img.src = item.imageUrl;
                    img.alt = item.name;

                    const name = document.createElement('h3');
                    name.textContent = item.name;

                    const description = document.createElement('p');
                    description.textContent = item.description;

                    div.appendChild(img);
                    div.appendChild(name);
                    div.appendChild(description);
                    section.appendChild(div);
                });

                document.body.appendChild(section);
            };

            // Display cities
            data.countries.forEach(country => {
                createRecommendationElement(country.name, country.cities);
            });

            // Display temples
            createRecommendationElement('Temples', data.temples);

            // Display beaches
            createRecommendationElement('Beaches', data.beaches);
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const recommendations = [
        { name: 'Paris', url: 'paris.html' },
        { name: 'New York', url: 'newyork.html' },
        { name: 'Tokyo', url: 'tokyo.html' },
        // Add more recommendations as needed
    ];

    const results = recommendations.filter(rec => rec.name.toLowerCase().includes(query));
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const link = document.createElement('a');
            link.href = result.url;
            link.textContent = result.name;
            resultsContainer.appendChild(link);
        });
    } else {
        const noResults = document.createElement('p');
        noResults.textContent = 'No recommendations found.';
        resultsContainer.appendChild(noResults);
    }
});

document.getElementById('reset-button').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
});

