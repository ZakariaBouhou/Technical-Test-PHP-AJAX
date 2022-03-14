const APP = {
    DATA: [],

    async init() {
        console.log('Application initialisée');

        APP.DATA = await APP.fetchDataFromBackEnd();
        console.log(APP.DATA);

        APP.cardContainer();
        
        APP.allCards();
    },

    // Fonction qui va récupérer les datas du fichier data.php et les retourner en json.
    // Async permet de faire de l'ajax sans utiliser then
    async fetchDataFromBackEnd() {
        const BACKEND_URL = window.location.pathname + 'public/php/data.php';

        // see : https://stackoverflow.com/questions/63007476/how-to-make-fetch-promise-resolve-without-using-then-syntax
        const RESPONSE = (await fetch(BACKEND_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })).json();

        return RESPONSE;
    },

    async cardContainer() {
        
        // On cible le container avec l'iD app pour lui attribuer une flexbox
        const CONTAINER = document.querySelector('#app');
        CONTAINER.classList.add('d-flex', 'flex-wrap');

    },

    // fonction pour créer l'ensemble des cards en bouclant sur le tableau et en les affichant dans le DOM

    async allCards () {
        
        // On cible l'url de chaque image
        const URLIMAGE = window.location.pathname + 'public/';
        //console.log(URLIMAGE);

        //On boucle sur le tableau de données en créant chaque card et en y intégrant les datas voulues
        // Pour le titre par exemple on va boucler et afficher chaque titre avec un innerHTML
        APP.DATA.forEach(element => {
            let app = document.querySelector('#app');
            let card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '24rem';
            app.appendChild(card);

            let cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.src = URLIMAGE + element.image;
            card.appendChild(cardImg);
            //console.log(card);

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            card.appendChild(cardBody);

            let title = document.createElement('h5');
            title.classList.add('card-title');
            title.innerHTML = element.titre;
            cardBody.appendChild(title);

            let text = document.createElement('p');
            text.classList.add('card-text');
            text.innerHTML = element.description;
            cardBody.appendChild(text);
            
            let link = document.createElement('a');
            link.href = '#';
            link.innerHTML = 'En savoir plus';
            link.classList.add('btn', 'btn-primary');
            cardBody.appendChild(link);
        });
    }
};

document.addEventListener("DOMContentLoaded", APP.init);


