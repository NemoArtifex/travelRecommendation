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
//console.log("canonicalMap:", canonicalMap);
//================FUNCTION to retrieve canonical form==========//
function getCanonicalForm(input){
    //convert input to lowercase for case-insensitivity, then check map
    return canonicalMap[input.toLowerCase()]||input;//fallback to original if not found
}
//===================FUNCTION performSearch ======================================//
function performSearch() {
    const input=document.getElementById('searchInput').value.toLowerCase();
    const recommendationDiv=document.getElementById('travelRecommendation');
    recommendationDiv.innerHTML='';
//    console.log("input:", input);
    console.log('recommendationDiv:', recommendationDiv.innerHTML);
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
        let htmlContent = '';
         // Handle countries as a special case since structure is different
        if (finalInput === 'countries' && data.countries) {          
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
        } 
        //Handle "temples" (assuming it's an array for robustness)
        else if (finalInput === 'temples'&& data.temples) {
          data.temples.forEach(temple=>{
           htmlContent +=`
            <div class="recommendation-card">
            <h2>${temple.name}</h2>
            <p>${temple.description}</p>
            <img src="${temple.imageUrl}" alt="${temple.name}"/>
            </div>
            `;
        });
        }
        //Handle 'beaches' (assuming it's an array for robustness)
        else if (finalInput === 'beaches' && data.beaches) {
            data.beaches.forEach(beach=>{
            htmlContent +=`
            <div class="recommendation-card">
            <h2>${beach.name}</h2>
            <p>${beach.description}</p>
            <img src="${beach.imageUrl}" alt="${beach.name}"/>
            </div>
            `;
        });
        } 
        // recommended console.log =========
        console.log("Attempting to update div.");
        console.log("Found div:", recommendationDiv);
        console.log("HTML content:", htmlContent);
     //   recommendationDiv.innerHTML = htmlContent;
        recommendationDiv.innerHTML='test';
        console.log("Div content after update:", recommendationDiv.innerHTML);
        
        //===== end console.log =======
})

    .catch(error=>{
        console.error('Error fetching or parsing JSON:', error);
        recommendationDiv.innerHTML=`<p>"An error occurred while fetching data."</p>`;
    });
}
// =================== Add an event listener to trigger the search =============
// Assuming you have a button with the id 'searchButton'
document.getElementById('searchButton').addEventListener('click', performSearch);


//========= FUNCTION clearSearch ==================
function clearSearch(){
    document.getElementById('searchInput').value="";
}
//======= end function ============





