//seed.js
// Function to seed JSON data to the database
async function seedJsonDataToDB() {
    // Call the appropriate method from the repository instance to seed the data
    await repo.seedJsonDataToDB();
}

// Add an event listener to call the seedJsonDataToDB function when the file loads
window.addEventListener('DOMContentLoaded', seedJsonDataToDB);
