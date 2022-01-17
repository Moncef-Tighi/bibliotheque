const ChangeOnePage = function(event) {
    event.preventDefault();
    let currentPage=Number(document.querySelector('#current').innerText);
    if (event.target.id==="previous") currentPage-=1 
    else currentPage+=1 
    let link=window.location.pathname.replace(/page=.+?(?=&)/, `page=${Number(currentPage)}`);

    link= link.slice(11)

    search(currentPage,link);

}

const displayPagination = function(length, start) {
    if (start!=1) paginationBar.innerHTML= ` <li id="previous"><a href="#" id="previous">«</a></li>`
    const size = Math.ceil(length/20)
    if (start+5>size) start-= 3-(size-start);
    else if (start-5<0 && start!=1) start=1;
    else if (start!=1) start-=2

    let i=start;
    if (i>3) {
        paginationBar.insertAdjacentHTML("beforeend", `
        <li class='pagination'><a href="#" >1</a></li>
        `)
        paginationBar.insertAdjacentHTML("beforeend", `
        <li id='more'><a href="#" >...</a></li>
    `)
    }
    if (i<1) i=1
    while (size>= i && i<start+5) {
        
        paginationBar.insertAdjacentHTML("beforeend", `
            <li class='pagination'><a href="#" >${i}</a></li>
        `)
        i+=1;
    } 

    if (i===start+5) {
        paginationBar.insertAdjacentHTML("beforeend", `
            <li class="pagination"><a id='more' href="#" >...</a></li>
        `)
        paginationBar.insertAdjacentHTML("beforeend", `
        <li class='pagination'><a href="#" >${size}</a></li>
        `)
    }

    paginationBar.insertAdjacentHTML("beforeend", `
    <li id="next"><a href="#">»</a></li>
    `)
    let pages = [...document.querySelectorAll(".pagination")].map(page=> page.firstChild)
    pages.forEach(page => {
        page.addEventListener("click", async(event)=> {
            event.preventDefault();
            let currentPage=Number(event.target.innerText);
            
            //Regex : Trouver le string qui commence par page= jusqu'à ce que ça atteinge le '&'
            let link=window.location.pathname.replace(/page=.+?(?=&)/, `page=${currentPage}`);
            link= link.slice(11)

            search(currentPage,link);
        } )
    })
    if (document.querySelector("#next")) document.querySelector("#next").addEventListener("click", ChangeOnePage)
    if (document.querySelector("#previous")) document.querySelector("#previous").addEventListener("click", ChangeOnePage)


}
