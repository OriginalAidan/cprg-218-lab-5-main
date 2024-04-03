document.addEventListener("DOMContentLoaded", function() {
  populateDropdown();
  document.getElementById('submit-button').addEventListener('click', submitHandler);
});
// Function to fetch API from website
async function fetchData(type = '') {
  let url = 'https://www.boredapi.com/api/activity?';
  if (type) url += `type=${type}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`An error occurred: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}
// This populates the dropdown menu with different activities that the user can select from
function populateDropdown() {
  const dropdown = document.getElementById('dropdown');
  const options = ['education', 'recreational', 'social', 'diy', 'charity', 'cooking', 'relaxation', 'music', 'busywork'];
  options.forEach(option => {
    let opt = document.createElement('option');
    opt.value = option;
    opt.innerHTML = option.charAt(0).toUpperCase() + option.slice(1);
    dropdown.appendChild(opt);
  });
}
// Listens for when someone hits submit
async function submitHandler() {
  const type = document.getElementById('dropdown').value;
  const data = await fetchData(type);
  if (data) {
    displayCards(data);
  } else {
    document.getElementById('results').innerHTML = '<li class="card">No activity found. Try changing the criteria.</li>';
  }
}
//Displays a card with the API data
function displayCards(data) {
  const container = document.getElementById('results');
  container.innerHTML = ''; // Clears the previous results
  const item = document.createElement('li');
  item.className = 'card';
  item.innerHTML = `<h3>${data.activity}</h3><p>Type: ${data.type}</p><p>Participants: ${data.participants}</p>`;
  container.appendChild(item);
  item.innerHTML = `<h3><i class="fas fa-user-friends"></i> ${data.activity}</h3><p><i class="fas fa-tags"></i> Type: ${data.type}</p><p><i class="fas fa-users"></i> Participants: ${data.participants}</p>`;
}






