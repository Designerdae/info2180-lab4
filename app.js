window.addEventListener('load', function(){
    let searchButton = document.getElementById('search');
    searchButton.addEventListener('click', loadPHP);
});


function displayHeroData(heroData, targetDiv) {
    const name = `<h3> ${heroData.alias.toUpperCase()} </h3>`;
    const alias = `<h4> A.K.A ${heroData.name.toUpperCase()} </h4>`;
    const biography = `<p> ${heroData.biography} </p>`;
  
    targetDiv.innerHTML = `${name} ${alias} ${biography}`;
  }


function displayHeroes(data){
    targetDiv = document.querySelector("#result")
    if (targetDiv.classList.contains('error')) {
        targetDiv.classList.remove('error');
    }
    
    if(typeof(data) === 'string'){
        
        if(data.includes('Hero not found'.toLowerCase())){
            targetDiv.classList.add('error');
        }
        targetDiv.innerHTML = data;
    }else{
        displayHeroData(data, targetDiv);
    }
}

async function fetchData(formData){
    const response = await fetch(`superheroes.php?query=${formData}`);
    if(response.ok){
        return response.text();
    
    }else{
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }
}   

async function loadPHP(event){
    event.preventDefault();
    let form = document.getElementById('superhero');
    try{
        const phpData = await fetch(`superheroes.php?query=${form.value}`).then(
            (response) => {
              return response.text();
            }
          );

        const processedData = await processdata(phpData);
        console.log(processedData);
        const heroes =  displayHeroes(processedData);
        }catch (error){
            console.log('There was an error: ' + error);
        }
    }   

function processdata(data){
    try{
        let parsedData = JSON.parse(data);
        return parsedData;
    }catch (error){
        return data;
    }
    
}