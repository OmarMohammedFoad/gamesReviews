
const card = document.querySelector('.card-container');
const row = document.querySelector('.cards .row');
const categoryList = document.querySelector('.category-list');
const gameDetails = document.querySelector('.details .row');



const fetchData = async (category) => {
    try {
        
 

        const data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games${category ? `?category=${category}` : '?category=mmorpg'}`,
            {
                headers: {
                    'x-rapidapi-key': '7fd8571c15mshe1b82729e4c1fbep12f308jsn97d05d78d942',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            }
        );
        const response = await data.json();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}


const getCategory =  ()=>{
  categoryList.addEventListener('click',async (e)=>{
    e.preventDefault();
    let clicked  = e.target.closest("a");
    console.log(clicked);
    categoryList.querySelectorAll('.nav-link').forEach(link => link.classList.remove('first-link'));
    clicked.classList.add('first-link');

    await displayData(clicked.innerText)

  })
}


const fetchOneGame = async (id)=>{

    try {
        const data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
            headers: {
                'x-rapidapi-key': '7fd8571c15mshe1b82729e4c1fbep12f308jsn97d05d78d942',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
            
        });

        return data.json();
    } catch (error) {
        console.error(error)
    }
}

const displayOneGame = async (id)=>{
    
    const data = await fetchOneGame(id);

    console.log(data);
    gameDetails.innerHTML = `   <div class="col-md-5">
          <img src="${data.thumbnail}" class="w-100" alt="">
        </div>
        <div class="col-md-6">
          <h2> title : <span>${data.title}</span></h2>
          <p>category : <span>${data.category}</span></p>
          <p>platform : <span>${data.platform}</span></p>
          <p>status : <span>${data.status}</span></p>
          <p>description : <span>${data.short_description}</span></p>
            <div class="col-md-6">
              <button  class="show-game btn btn-danger" >
              <a href="${data.game_url}" class="text-white text-decoration-none">Play Game</a>
              
              </button>
             </div>
        
        
          </div>


       `

return data;
    

}


const displayData = async (category) => {
    const data = await fetchData(category);



    row.innerHTML = data.map((game) => {
        return `<div class=" col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card-container">
                            <article data-target=${game.id} class="card border-1 text-white">
                                <img class="card-img-top  object-fit-cover h-100 p-3" src=${game.thumbnail} alt="Card image cap">
                                <header class="c-header d-flex justify-content-between pt-3 px-2  ">
                                    <p>${game.title}</p>
                                    <span class="badge  h-25 p-2 text-center">new</span>
                                </header>
                                <div class="card-body text-center">
                                    <p class="card-text">${(game.short_description).substring(0, 50)}</p>
                                </div>
                                <div class="card-footer border-top border-secondary border-0 d-flex justify-content-between">
                                    <span class="badge p-2 text-center">${game.genre}</span>
                                    <span class="badge p-2 text-center">${game.platform}</span>
    
                                </div>
    
                            </article>
                        
    </div>
                    </div>
                    `
                }).join(" ")



    row.addEventListener('click', async (e) => {
        e.preventDefault();
        let clicked = e.target.closest("article");
        console.log(clicked);
        let id = clicked.getAttribute('data-target');
    const cards =    document.getElementById('cards');
        cards.classList.add('d-none');
        document.querySelector('.header').classList.add('d-none');
        document.querySelector('.details').classList.remove('d-none');
        const closeBtn = document.getElementById('close');
        closeBtn.addEventListener('click',()=>{
            cards.classList.remove('d-none');
            document.querySelector('.details').classList.add('d-none');
        })
        await displayOneGame(id);
    })


            }




const init = async () => {
     getCategory();
    await displayData();
    await displayOneGame();
}

init();