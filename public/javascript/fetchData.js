//const url = "http://127.0.0.1:3000/api/v1";
const url = "https://bibliotheque-api.herokuapp.com/api/v1";

const accueilContainer= document.querySelector("#featured_books");
const oneBook= document.querySelector("#one-book");
const linkBest = document.querySelectorAll(".best");
const linkTop = document.querySelectorAll(".top");
const accueil = document.querySelector("#accueil");
const classement= document.querySelector("#classement");
const classementContainer = document.querySelector("#classementContainer");
const recherche= document.querySelector("#recherche");

const searchForm=document.querySelector(".search")
const searchField=document.querySelector(".search__field");
const radioButtons = document.querySelectorAll(".target");
const paginationBar = document.querySelector(".paginationBar");




/*
    Affichage de l'accueil
*/


const fetchAccueil= async function(){
    const data = await fetchThenjson(`${url}/books?page=1&limit=21&fields=author,title,img,isbn,rating,totalratings, slug`);
    displayAccueil(data);
    window.history.pushState({location: "acceuil", data}, "accueil", "/");
}


/*
    Partie dédiée aux pages classements : 
*/


const fetchClassement= async function(type,tag) {
    const data = await fetchThenjson(`${url}/books/${type}-100/${tag}`);
    data.type=type;
    data.tag=tag;
    displayClassement(data);
    window.history.pushState({location: "classement", data}, `${type}-100 ${tag}`, `/classement/${type}-${tag}`);
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


const search = async function(page, link) {
    const data = await fetchThenjson(`${url}/books?${link}`);
    console.log(data);
    displayRecherche(data, page);
    window.history.pushState({location: "recherche", data}, `Recherche`, `/recherche/${link}`);
};


searchForm.addEventListener("submit", (event)=> {
    event.preventDefault();
    let link=`page=1`;
    if(radioButtons[0].checked) link+=`&title=`;
    if(radioButtons[1].checked) link+=`&author=`;
    if(radioButtons[2].checked) link+=`&tags=`;
    link+=searchField.value;
    searchField.value="";
    search(1, link);
})



/*
    Partie dédiée à l'affichage d'un seul livre
*/


const fetchOneBook= async function(event) {
    event.preventDefault();
    const isbn=event.target.dataset.isbn
    const slug=event.target.dataset.slug

    const title=event.target.innerText
    let data;
    if (isbn) {
        data= await fetchThenjson(`${url}/books/${isbn}`);
    } else {
        data=await fetchThenjson(`${url}/books/${slug}`);
    }
    const googleData = await fetchThenjson(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=1&langRestrict="fr"`);

    data= {...data, ...{googleData : googleData.items[0].volumeInfo} }
    displayOneBook(data);

    window.history.pushState({location: "book", data}, `${data.requestedBook.title}`, `/book/${data.requestedBook.slug}`);
}




// Initialization : 

fetchAccueil();
