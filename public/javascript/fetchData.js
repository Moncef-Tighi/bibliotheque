const url = "http://127.0.0.1:3000/api/v1";
const accueilContainer= document.querySelector("#featured_books")

function fetchThenjson(link) {
    return fetch(link).then(response => response.json())
}

const accueil = async () => {
    const data = await fetchThenjson(`${url}/books?page=1&limit=21&fields=author,title,img,isbn,rating,totalratings`);
    data.books.forEach(book=>{
        let html=`
        <div>
            <h2>${book.title}</h2>
            <img src="${book.img}" class="acceuil_illustration">
            <h3>${book.author}</h3>
            <span>${book.rating} (${book.totalratings})</span>
        </div>
        `
        accueilContainer.insertAdjacentHTML("beforeend", html)
    })
} 
accueil();