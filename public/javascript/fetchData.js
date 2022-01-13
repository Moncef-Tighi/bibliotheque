const url = "http://127.0.0.1:3000/api/v1";
const accueilContainer= document.querySelector("#featured_books")
const linkBest = document.querySelectorAll(".best");
const linkTop = document.querySelectorAll(".top")
const accueil = document.querySelector("#accueil");
const classement= document.querySelector("#classement");
const classementContainer = document.querySelector("#classementContainer");


function fetchThenjson(link) {
    return fetch(link).then(response => response.json())
}

const previousIcon= document.querySelectorAll(".previous");
previousIcon.forEach(icon=> {
    icon.addEventListener("click", (event) => {
        event.preventDefault();
        classement.style.display="none";
        accueil.style.display="block";
    })
});


/*
    Affichage de l'accueil
*/

const accueilDisplay = async () => {
    const data = await fetchThenjson(`${url}/books?page=1&limit=21&fields=author,title,img,isbn,rating,totalratings`);
    data.books.forEach(book=>{
        let html=`
        <div>
            <h2>${book.title}</h2>
            <img src="${book.img}" class="acceuil_illustration">
            <h3>${book.author.split(",")[0]}</h3>
            <span>${book.rating} (${book.totalratings})</span>
        </div>
        `
        accueilContainer.insertAdjacentHTML("beforeend", html)
    })
} 
accueilDisplay();

/*
    Partie dédiée aux pages classements : 
*/

const fetchClassement= async function(type,tag) {
    
    const data = await fetchThenjson(`${url}/books/${type}-100/${tag}`);
    if (data) {
        accueil.style.display="none";
        classement.style.display="block";
        document.querySelector('#titre-classement').innerText=`${type}-100 catégorie ${tag}`
        classementContainer.innerHTML="";
        data.books.forEach(book=>{
            const tags= book.genre.split(",")
            let html=`
            <div>
                <img src="${book.img}" class="classement_illustration">
                <h2>${book.title}</h2>
                <h3>By - ${book.author.split(",")[0]}</h3>
                <span>${book.rating} (${book.totalratings})</span>
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

const linkController = function(event) {
    event.preventDefault();
    fetchClassement(event.target.classList[0], event.target.dataset.tag)
}

linkBest.forEach(link=> link.addEventListener("click", linkController) );
linkTop.forEach(link=> link.addEventListener("click", linkController) );