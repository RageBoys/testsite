//vars

const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
const pageText = document.querySelector('.pageNum');
const pageTextBottom = document.querySelector('.pageNumBottom');
let hpCharacters = [];
var pageNum;
pageNum = 1;
var minVal = 0;



//get pages function
function pageUp() {
    if(charactersList.hasChildNodes()) {
        pageNum++;

        loadCharacters();

        pageText.innerHTML = 'Page ' + pageNum;
        pageTextBottom.innerHTML = 'Page ' + pageNum;
    }   else {
        loadCharacters();

        pageText.innerHTML = 'Page ' + pageNum;
        pageTextBottom.innerHTML = 'Page ' + pageNum;
    }
}

function pageDown() {
    pageNum--;

    if(pageNum == minVal) {
        pageNum = 1;
    }

    loadCharacters();

    pageText.innerHTML = 'Page ' + pageNum;
    pageTextBottom.innerHTML = 'Page ' + pageNum;
}



//search feature
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

//gets api info
const loadCharacters = async () => {
    try {
        const res = await fetch('https://api.github.com/orgs/freeCodeCamp/repos?page=' + pageNum);
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

//displays api info

const displayCharacters = (characters) => {
    const htmlString = characters.map((character) => {


            //change null descs into string
            if(character.description === null) {
              character.description = 'No Description Porvided...';
            }

            let download_url = character.html_url + '/zipball/master/';

            //displays
            var x = window.matchMedia("(max-width: 700px)")
            if (x.matches) {

            return `
            <li class="character">
                <p><a href="#" class="name">${character.name}<i class="fa fa-download" aria-hidden="true"></i></a> <a href="#" class="by"> by ${character.owner.login}</a></p>
                <p class="desc">${character.description}</p>
            </li>
            <style>
                .no-content {
                    display: none;
                }

                .page-select-bottom {
                    display: flex;
                }
            </style>
        `;
    } 
        
        else {

            return `
            <li class="character">
                <p><a href="${download_url}" class="name">${character.name}<i class="fa fa-download" aria-hidden="true"></i></a> <a href="#" class="by"> by ${character.owner.login}</a></p>
                <p class="desc">${character.description}</p>
            </li>
            <style>
                .no-content {
                    display: none;
                }

                .page-select-bottom {
                    display: flex;
                }
            </style>
        `

        }
        })
    
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();