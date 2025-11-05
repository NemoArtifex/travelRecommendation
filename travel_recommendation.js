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
console.log("canonicalMap:", canonicalMap);
//================FUNCTION to retrieve canonical form==========//
function getCanonicalForm(input){
    //convert input to lowercase for case-insensitivity, then check map
    return canonicalMap[input.toLowerCase()]||input;//fallback to original if not found
}
//===================FUNCTION performSearch ======================================//
function performSearch() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();}
    const input=document.getElementById('searchInput').value.toLowerCase();
    const recommendationDiv=document.getElementById('travelRecommendation');
    recommendationDiv.innerHTML='';
    console.log("input:", input);


// call canonical form function
    const finalInput=getCanonicalForm(input);
    console.log("finalInput:", finalInput);
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
        console.log('JSON data successfully fetched and parsed:', data);
        if (finalInput === 'countries') {
            // Handle countries as a special case since structure is different
            let htmlContent = '';
             data.countries.forEach(country => {
              country.cities.forEach(city => {
                htmlContent += `
                    <div class="recommendation-card">
                    <h2>${city.name}</h2>
                    <p>${city.description}</p>
                    <img src="${city.imageUrl}" alt="${city.name}"/>
                    </div>
                `;
            });
        });
        recommendationDiv.innerHTML = htmlContent;
        } else if (finalInput === 'temples'&& data.temples) {
            recommendationDiv.innterHTML=`
            <div class="recommendation-card">
            <h2>${data.temples.name}</h2>
            <p>${data.temples.description}</p>
            <img src="${data.temples.imageUrl}" alt="${data.temples.name}"/>
            </div>
            `;
        } else if (finalInput === 'beaches' && data.beaches) {
            recommendationDiv.innterHTML=`
            <div class="recommendation-card">
            <h2>${data.beaches.name}</h2>
            <p>${data.beaches.description}</p>
            <img src="${data.beaches.imageUrl}" alt="${data.beaches.name}"/>
            </div>
            `;
        } else {
            recommendationDiv.innerHTML = "Destination Not Found";
        }
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





