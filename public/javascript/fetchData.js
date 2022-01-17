const url = "http://127.0.0.1:3000/api/v1";

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
    oneBook.style.display="none";
    oneBook.innerHTML="";
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
        history.back()
    })
});


/*
    Affichage de l'accueil
*/

const displayAccueil =  function(data) {
    hide();
    accueil.style.display="block";
    accueilContainer.innerHTML="";
    data.books.forEach(book=>{
        let html=`
        <div>
            <h2><a href="#" data-isbn="${book.isbn}" data-slug="${book.slug}" class="oneBook">${book.title}</a></h2>
            <img src="${book.img}" class="acceuil_illustration">
            <h3>${book.author.split(",")[0]}</h3>
            <span>${getStars(book.rating)}${book.rating} (${book.totalratings})</span>
        </div>
        `
        accueilContainer.insertAdjacentHTML("beforeend", html)
    })
    //Obligé d'attacher l'event listener ici, sinon il s'éxecutera avant que les links ne soit render sur la page.
    const linkBooks=document.querySelectorAll(".OneBook");
    linkBooks.forEach(book=> book.addEventListener("click", fetchOneBook));

} 


const fetchAccueil= async function(){
    const data = await fetchThenjson(`${url}/books?page=1&limit=21&fields=author,title,img,isbn,rating,totalratings, slug`);
    displayAccueil(data);
    window.history.pushState({location: "acceuil", data}, "accueil", "/");
}


/*
    Partie dédiée aux pages classements : 
*/

const displayClassement = function(data) {
    if (data) {
        hide();
        classement.style.display="block";
        document.querySelector('#titre-classement').innerText=`${data.type}-100 catégorie ${data.tag}`
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

const displayRecherche= function(data, page) {
    hide();
    recherche.style.display="block";
    rechercheContainer.innerHTML="";
    document.documentElement.scrollTop = 0;
    if (data.length>0) {
        document.querySelector('#titre-recherche').innerText=`${data.length} livres correspondent à cette recherche`;
        document.querySelector('#page-actuelle').innerHTML=`page <span id="current">${page}</span>/${Math.ceil(data.length/20)}`;

        data.books.forEach( (book)=>{
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
        if (data.length>20) {
            document.querySelector(".paginationBar").style.display="flex";
            displayPagination(data.length, page);
        }

    } else {
        document.querySelector('#titre-recherche').innerText=`Aucune livre ne corresponds à cette recherche...`
    }
}

const search = async function(page, link) {
    const data = await fetchThenjson(`${url}/books?${link}`);
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

const displayOneBook = function(data) {
    hide();
    oneBook.style.display="block";
    googleData= data.googleData;
    book=data.requestedBook
    //C'est bizarre de devoir reduce les tags comme ça, mais c'est parce que les data ne sont pas clean
    //Et à cause d'une implémentation étrange de la méthode reduce on doit ajouter le premier élément
    //à la fin sinon il passera dans l'output sans passer par l'accumulateur
    const accumulator = (total, tag) => {
        return total+=`<li class="tags ${tag}">${tag}</li>`
    }
    const array = book.genre.split(",").slice(0,4);
    const tags= array.reduce(accumulator, array[0]);

    let html = `
    <svg class="advanced__icon previous">
        <use href="./img/icons.svg#previous-icon"></use>
    </svg>
    <img src="${book.img}"></img>
    <div id="head-info">
        <h1>${googleData.title}</h1>
        <h2>Par ${googleData.authors[0]}</h2>
        <span>${getStars(book.rating)}${book.rating} (${book.totalratings})</span>
        <div id="additional-info"> 
            <ul>
                <li>Date de publication :  ${googleData.publishedDate}</li>
                <li>Publié part : ${googleData.publisher}</li>
                <li>Taille : ${googleData.pageCount} pages</li>
            </ul>
        </div>
        <div id="head-info-links">
            <a href="${googleData.canonicalVolumeLink}">Plus d'informations</a>
        </div>
        <ul>
            ${tags.slice(tags.indexOf("<"), -1)}
        </ul></ul>
        
    </div>
    <div id="description">
        <p>${googleData.description}</p>
        <p>${book.desc}</p>
    </div>
    `;
    oneBook.insertAdjacentHTML("afterbegin", html);
}

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
    displayOneBook(data)
    window.history.pushState({location: "book", data}, `${data.title}`, `/book/${data.slug}`);
}




// Initialization : 

fetchAccueil();
