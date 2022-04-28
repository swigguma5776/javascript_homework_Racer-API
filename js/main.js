// create form variable 
const form = document.querySelector('#driverDataForm')

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let season = document.querySelector('#season')
    let round = document.querySelector('#round')

    console.log(season.value) 
    console.log(round.value)
    
    form.innerHTML =`<input type="text" name='season' id="season" placeholder="Place Season Here">        
    <input type="text" name='round' id="round" placeholder="Place Round Here">  
    <button class="btn btn-secondary" type="submit" id="submitButton" onClick="clearData()">Clear Standings!</button>` 

    form.addEventListener('submit', (event) => {
        window.location.reload()
    })
})




const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}


//c Create aconstant to hold DOM Elements
const DOM_Elements = {
    drivers: '.drivers-list'
}

// Create Ranger List HTML
const createDriver = (position, firstName, lastName, nationality, sponsor, points) => {
    const html = `<table class="table">
        <thead>
        <tr>
            <th scope="col">Position</th>
            <th scope="col">Name</th>
            <th scope="col">Nationality</th>
            <th scope="col">Sponsor</th>
            <th scope="col">Points</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">${position}</th>
            <td>${firstName} ${lastName}</td>
            <td>${nationality}</td>
            <td>${sponsor}</td>
            <td>${points}</td>
        </tr>
        </tbody>
    </table>`

    
    // Paste list item on document
    document.querySelector(DOM_Elements.drivers).insertAdjacentHTML('beforeend',html)
}

// Create function to loop over rangers and create each element 
const loadData = async () => {
    clearData()
    const driverList = await getData(season.value, round.value);

    driverList.forEach( driver => createDriver(driver.position, driver.Driver.givenName, 
        driver.Driver.familyName, driver.Driver.nationality, driver.Constructors[0].name, driver.points))

}

// Clear the data 
const clearData = () => {
    document.querySelector(DOM_Elements.drivers).innerHTML = ''; 
    
}
