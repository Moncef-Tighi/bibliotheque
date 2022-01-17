/*
    Partie dédiée au routing en utilisant History API
*/


window.onpopstate= function (event) {
    if (event.state) {
        switch (event.state.location) {
            case 'acceuil' : 
                displayAccueil(event.state.data);
                break;
            case 'classement' : 
                displayClassement(event.state.data);
                break;    
            case 'recherche' : 
                displayRecherche(event.state.data);
                break;
            case 'book' : 
                displayOneBook(event.state.data);
                break;
        }
    }
}


