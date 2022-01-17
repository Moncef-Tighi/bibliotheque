
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