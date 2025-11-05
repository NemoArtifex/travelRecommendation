//TODO  set constants
// Canonical map for known variations of destination searches
const canonicalMap={
    "beach":"beaches",
    "beaches":"beaches",
    "Beach":"beaches",
    "Beaches":"beaches",

    "temple":"temples",
    "temples":"temples",
    "Temple":"temples",
    "Temples":"temples",

    "country":"countries",
    "countries":"countries",
    "Country":"countries",
    "Countries":"countries"
};
//================FUNCTION to retrieve canonical form==========//
function getCanonicalForm(input){
    //convert input to lowercase for case-insensitivity, then check map
    return canonicalMap[input.LowerCase()]||input;//fallback to original if not found
}

//===================FUNCTION performSearch ======================================//
function performSearch() {
    const input=document.getElementById('searchInput').value.toLowerCase();
    const recommendationDiv=document.getElementById('travelRecommendation');
    recommendationDiv.innerHTML='';

// call canonical form function
    const finalInput=getCanonicalForm(input);

//Fetch JSON file simulating an API
    fetch('travel_recommendation_api.json')
      .then(response=>{
      if(!response.ok){
        //Check if the response was successful
        throw new Error('Network response was not ok');
      }
      return response.json();
      })

      .then(data => {
        let result;
        if (finalInput === 'countries') {
            // Handle countries as a special case since structure is different
            let htmlContent = '';
             data.countries.forEach(country => {
              country.cities.forEach(city => {
                htmlContent += `
                    <h2>${city.name}</h2>
                    <p>${city.description}</p>
                    <img src="${city.imageUrl}"/>
                `;
            });
        });
        recommendationDiv.innerHTML = htmlContent;
        } else if (finalInput === 'temples') {
            result = data.temples;
        } else if (finalInput === 'beaches') {
            result = data.beaches;
        } else {
            recommendationDiv.innerHTML = "Destination Not Found";
            return;
    }

    recommendationDiv.innerHTML = `
        <h2>${result.name}</h2>
        <p>${result.description}</p>
        <img src="${result.imageUrl}"/>
    `;
})

    .catch(error=>{
        console.error('Error:', error);
        recommendationDiv.innerHTML="An error occurred while fetching data.";
    });
}

//========= FUNCTION clearSearch ==================
function clearSearch(){
    document.getElementById('searchInput').value="";
}
//======= end function ============





