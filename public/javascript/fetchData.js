const url = "http://127.0.0.1:3000/api/v1";


const accueilContainer= document.querySelector("#featured_books")
const linkBest = document.querySelectorAll(".best");
const linkTop = document.querySelectorAll(".top");
const accueil = document.querySelector("#accueil");
const classement= document.querySelector("#classement");
const classementContainer = document.querySelector("#classementContainer");
const recherche= document.querySelector("#recherche");

const searchForm=document.querySelector(".search")
const searchField=document.querySelector(".search__field");
const radioButtons = document.querySelectorAll(".target");

/*
    Les images des étoiles sont en SVG, c'est plus simple de les passer via JS
    Même si du coup ça fait un code bizarre
*/

const fullStar=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg>`
const halfStar=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>`
const emptyStar=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>`

/*
    Fonction utilitaire
*/

function fetchThenjson(link) {
    return fetch(link).then(response => response.json())
}

const hide = function(){
    classement.style.display="none";
    accueil.style.display="none";
    recherche.style.display="none";

}

const getStars = function(rating){
    let i=1;
    let output=""
    while (i<=5) {
        
        if (i<=rating) output+=fullStar
        else if (i-0.5<=rating) output+=halfStar
        else output+=emptyStar
        i+=1;
    }
    return output
}

const previousIcon= document.querySelectorAll(".previous");
previousIcon.forEach(icon=> {
    icon.addEventListener("click", (event) => {
        event.preventDefault();
        hide();
        accueil.style.display="block";
    })
});


/*
    Affichage de l'accueil
*/

const fetchAccueil= async function(){
    const data = await fetchThenjson(`${url}/books?page=1&limit=21&fields=author,title,img,isbn,rating,totalratings`);
    accueilDisplay(data);
}

const accueilDisplay = (data) => {
    data.books.forEach(book=>{
        let html=`
        <div>
            <h2>${book.title}</h2>
            <img src="${book.img}" class="acceuil_illustration">
            <h3>${book.author.split(",")[0]}</h3>
            <span>${getStars(book.rating)}${book.rating} (${book.totalratings})</span>
        </div>
        `
        accueilContainer.insertAdjacentHTML("beforeend", html)
    })
} 
fetchAccueil();


/*
    Partie dédiée aux pages classements : 
*/

const displayClassement = function(data) {
    if (data) {
        
        classement.style.display="block";
        document.querySelector('#titre-classement').innerText=`${type}-100 catégorie ${tag}`
        classementContainer.innerHTML="";
        data.books.forEach( (book, i)=>{
            const tags= book.genre.split(",")
            let html=`
            <div>
                <h1 class='number'>#${i+1}</h1>
                <img src="${book.img}" class="classement_illustration">
                <h2>${book.title}</h2>
                <h3>By - ${book.author.split(",")[0]}</h3>
                <span>${getStars(book.rating)}${book.rating} (${book.totalratings})</span>
                <ul class="tagList">
                    <li class="tags ${tags[0]}">${tags[0]}</li>
                    <li class="tags ${tags[1]}">${tags[1]}</li>
                    <li class="tags ${tags[2]}">${tags[2]}</li>
                </ul>
            </div>
            `
            
            classementContainer.insertAdjacentHTML("beforeend", html);
        })       
    }

}

const fetchClassement= async function(type,tag) {
    
    const data = await fetchThenjson(`${url}/books/${type}-100/${tag}`);
    hide();
    displayClassement(data);
}



const linkController = function(event) {
    event.preventDefault();
    fetchClassement(event.target.classList[0], event.target.dataset.tag)
}

linkBest.forEach(link=> link.addEventListener("click", linkController) );
linkTop.forEach(link=> link.addEventListener("click", linkController) );




/*
    Partie dédiée au résultat d'une recherche de livre
*/


const displayRecherche= function(data) {
    recherche.style.display="block";
    if (data.lenth===0) {
        document.querySelector('#titre-recherche').innerText=`x livres correspondent à cette recherche`
        
        rechercheContainer.innerHTML="";
        data.books.forEach( (book, i)=>{
            const tags= book.genre.split(",");
            let html=`
            <div>
                <img src="${book.img}" class="recherche_illustration">
                <h2>${book.title}</h2>
                <h3>By - ${book.author.split(",")[0]}</h3>
                <span>${getStars(book.rating)}${book.rating} (${book.totalratings})</span>
                <ul class="tagList">
                    <li class="tags ${tags[0]}">${tags[0]}</li>
                    <li class="tags ${tags[1]}">${tags[1]}</li>
                    <li class="tags ${tags[2]}">${tags[2]}</li>
                </ul>
            </div>
            `
            
            rechercheContainer.insertAdjacentHTML("beforeend", html);
        })       
    } else {
        document.querySelector('#titre-recherche').innerText=`Aucune livre ne corresponds à cette recherche...`
    }
}



searchForm.addEventListener("submit",async (event)=> {
    event.preventDefault();

    let link=`${url}/books?page=1&limit=20`;
    if(radioButtons[0].checked) link+=`&title=`;
    if(radioButtons[1].checked) link+=`&author=`;
    if(radioButtons[2].checked) link+=`&tags=`;
    link+=searchField.value;
    const data = await fetchThenjson(link);

    hide();
    displayRecherche(data);
})