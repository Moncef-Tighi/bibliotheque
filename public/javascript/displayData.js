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


const displayClassement = function(data) {
    hide();
    classement.style.display="block";
    document.querySelector('#titre-classement').innerText=`${data.type}-100 catégorie ${data.tag}`
    classementContainer.innerHTML="";
    data.books.forEach( (book, i)=>{
        const tags= book.genre.split(",")
        let html=`
        <div>
            <h1 class='number'>#${i+1}</h1>
            <a href="#" data-isbn="${book.isbn}" data-slug="${book.slug}" data-tile="${book.title}" class="oneBook"><img src="${book.img}" class="classement_illustration">
            <h2>${book.title}</a></h2>
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

    const linkBooks=document.querySelectorAll(".OneBook");
    linkBooks.forEach(book=> book.addEventListener("click", fetchOneBook));

}


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
            <a href="#" data-isbn="${book.isbn}" data-slug="${book.slug}" class="oneBook"><img src="${book.img}" class="recherche_illustration">
                <h2>${book.title}</a></h2>
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
        const linkBooks=document.querySelectorAll(".OneBook");
        linkBooks.forEach(book=> book.addEventListener("click", fetchOneBook));    
    } else {
        document.querySelector('#titre-recherche').innerText=`Aucune livre ne corresponds à cette recherche...`
    }
}


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
