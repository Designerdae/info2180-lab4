window.addEventListener('load', function(){
    let searchButton = document.getElementById('search');
    searchButton.addEventListener('click', loadPHP);
});


function displayHeroData(heroData, targetDiv){
    
    if(targetDiv.innerHTML !== ''){
        targetDiv.innerHTML = '';
    }
   
    if(typeof(heroData) !== 'string'){
        let nameHeader = document.createElement('h3');
        let name = document.createTextNode(heroData.alias.toUpperCase());
        nameHeader.appendChild(name);
        targetDiv.appendChild(nameHeader);
        let aliasHeader = document.createElement('h4');
        let alias = document.createTextNode(`A.K.A ${heroData.name}`.toUpperCase());
        aliasHeader.appendChild(alias);
        targetDiv.appendChild(aliasHeader);
        let biographyArea = document.createElement('p');
        let biography = document.createTextNode(heroData.biography);
        biographyArea.appendChild(biography);
        targetDiv.appendChild(biographyArea);
    }
}


function insertErrorClass(data, targetDiv){
    if(data.includes('Hero not found'.toLowerCase())){
        targetDiv.classList.add('error');
    }
}

function removeErrorClass(targetDiv){
    if (targetDiv.classList.contains('error')) {
        targetDiv.classList.remove('error');
    }
}

function displayHeroes(data){
    result = document.getElementById('result');
    
    removeErrorClass(result);
    if(typeof(data) === 'string'){
        
        insertErrorClass(data, result);
        result.innerHTML = data;
    }else{
        displayHeroData(data, result);
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
        const phpData = await fetchData(form.value);
        const processedData = await handleJSON(phpData);
        console.log(processedData);
        const heroes =  displayHeroes(processedData);
        }catch (error){
            console.log('There was an error: ' + error);
        }
    }   

function handleJSON(data){
    try{
        let parsedData = JSON.parse(data);
        return parsedData;
    }catch (error){
        return data;
    }
    
}