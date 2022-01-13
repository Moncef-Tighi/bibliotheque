const url = "http://127.0.0.1:3000/api/v1";
const accueilContainer= document.querySelector("#featured_books")
const linkBest = document.querySelectorAll(".best");
const linkTop = document.querySelectorAll(".top")
const accueil = document.querySelector("#accueil");
const classement= document.querySelector("#classement")
const previousIcon= document.querySelector(".previous");


function fetchThenjson(link) {
    return fetch(link).then(response => response.json())
}

previousIcon.forEach(icon=> icon.addEventListener("click", (event) => {
    event.preventDefault();
    classement.style.display="none";
    accueil.style.display="none";
}) );


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
        classement.style.display="grid";
        let html=`
        <div>
            <h2>${book.title}</h2>
            <img src="${book.img}" class="acceuil_illustration">
            <h3>${book.author.split(",")[0]}</h3>
            <span>${book.rating} (${book.totalratings})</span>
        </div>
        `
        classementContainer.insertAdjacentHTML("beforeend", html)
    }
    console.log(data);
}

const linkController = function(event) {
    event.preventDefault();
    fetchClassement(event.target.classList[0], event.target.dataset.tag)
}

linkBest.forEach(link=> link.addEventListener("click", linkController) );
linkTop.forEach(link=> link.addEventListener("click", linkController) );