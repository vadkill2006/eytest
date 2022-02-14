const input = document.querySelector('#searchinput');
const searchBtn = document.querySelector('#search');
const container= document.querySelector('.container')
const card = document.querySelectorAll('.card')
const list = document.querySelector('.list')
// const listNew = document.querySelector('.list1')
const listNew = document.querySelector('#list1')
const pagination = document.querySelector('#pagination')
// const arr = Array.of(listNew)

console.log(container.childNodes);

searchBtn.addEventListener('click', async() => {
  

  const res = await fetch("https://indian-news-live.p.rapidapi.com/news", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "indian-news-live.p.rapidapi.com",
      "x-rapidapi-key": "027c68f6bamsh0f43b6937bdeca2p138aadjsn315fc5f79708"
    }
  })

  const data = await res.json();
console.log(data);
  // let html = '';

  if (input.value == '') {
    list.textContent = `Please enter keyword`;
  } else {
    list.textContent = '';
    let current_page = 1;
    let rows = 10;
    
    // for (let i = 0; i < data.length; i++) {    
    //   //   html += `
    // //     <div class="card mb-3">
    // //     <div class="card-body d-flex">
    // //       <a href="${data[i].url}"><img src="${data[i].img}" alt="" width="200px"></a>
    // //       <div class="content ps-4" id="cardcontent">
    // //         <p class="title"><a href="${data[i].url}">${data[i].title}</a></p>
    // //         <div class="category"><span class="badge rounded-pill bg-light text-dark">${data[i].source}</span></div>
    // //       </div>
    // //     </div>
    // //  </div>
    // // ` ;
    //  } 
    
    
    function DisplayList (items, wrapper, rows_per_page, page) {
      wrapper.innerHTML = "";
      page--;
    
      let start = rows_per_page * page;
      let end = start + rows_per_page;
      let paginatedItems = items.slice(start, end);
      // for (let i = 0; i < data.length; i++) {    
      //   html +=  ;
      // } 
    
      for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];
    
        let item_element = ''
        // let item_element = document.createElement('div');
        // item_element.classList.add('item');
        item_element += `
        <div class="card mb-3">
            <div class="card-body d-flex">
              <a href="${data[i].url}"><img src="${data[i].img}" alt="" width="200px"></a>
              <div class="content ps-4" id="cardcontent">
                <p class="title"><a href="${data[i].url}">${data[i].title}</a></p>
                <div class="category"><span class="badge rounded-pill bg-light text-dark">${data[i].source}</span></div>
              </div>
            </div>
         </div>
        `
        item_element.innerText = item;
        
        wrapper.insertAdjacentHTML('afterbegin', item_element);
      }
    }
    
    function SetupPagination (items, wrapper, rows_per_page) {
      wrapper.innerHTML = "";
    
      let page_count = Math.ceil(items.length / rows_per_page);
      for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, items);
        wrapper.appendChild(btn);
      }
    }
    
    function PaginationButton (page, items) {
      let button = document.createElement('button');
      button.innerText = page;
    
      if (current_page == page) button.classList.add('active');
    
      button.addEventListener('click', function () {
        current_page = page;
        DisplayList(items, listNew, rows, current_page);
    
        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
    
        button.classList.add('active');
      });
    
      return button;
    }
    
    DisplayList(data, listNew, rows, current_page);
    SetupPagination(data, pagination, rows);
    
  }


  // listNew.insertAdjacentHTML('afterbegin', html);
    document.body.appendChild(container);
    console.log(data);   
    
}

)

