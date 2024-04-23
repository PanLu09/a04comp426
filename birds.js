
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    const regionCode = document.getElementById('regionCode').value;
    fetchNotableObservations(regionCode);
});

function fetchNotableObservations(regionCode) {
    const url = `https://api.ebird.org/v2/data/obs/${regionCode}/recent/notable?detail=full`;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-eBirdApiToken': 'ri4drcnd08a4' // Replace 'your-api-key' with your actual API key
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('results').innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    });
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>No notable observations found.</p>';
        return;
    }

    const list = document.createElement('ul');
    data.forEach(observation => {
        const item = document.createElement('li');
        item.textContent = `${observation.comName} (${observation.sciName}) observed at ${observation.locName} on ${observation.obsDt}`;
        list.appendChild(item);
    });
    resultsDiv.appendChild(list);
}
