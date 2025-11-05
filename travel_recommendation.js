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
//FUNCTION to retrieve canonical form
function getCanonicalForm(input){
    //convert input to lowercase for case-insensitivity, then check map
    return canonicalMap[input.LowerCase()]||input;//fallback to original if not found
}

//FUNCTION performSearch
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

    .then(data=>{
// TODO logic for specific site based on "countries","beaches" or "temples"
        let result=null;
// search within the "countries" data, which is an array of objects
    if (data.countries){
//Destination details for "countries"
     recommendationDiv.innerHTML=`
       <h2>${result.name}</h2>
       <p>${result.description}</p>
       <img src="${result.imageUrl}"/>
     `;

    } else if (data."temples" === finalInput){
// todo logic provide destination details for "temples"
   console.log("Key 'temples' does not exist.");
    } else if (data."beaches"=== finalInput){
// todo logic to provide destination details for "beaches"
    console.log("Key 'beaches' does not exist.")
    } else {
     recommendationDiv.innerHTML="Destination Not Found";
    }

    })
    .catch(error=>{
        console.error('Error:', error);
        recommendationDiv.innerHTML="An error occurred while fetching data.";
    });
}






