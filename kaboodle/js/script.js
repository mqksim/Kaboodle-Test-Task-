var s1 = document.querySelector('.s1');
var s1Wrapper = s1.querySelector('.swiper-wrapper');
var s2 = document.querySelector('.s2');
var s2Wrapper = s2.querySelector('.swiper-wrapper');

var html = ``;
var list = [], comingSoon = [], mostPopular = [], comingSoonF = [], mostPopularF = [];


async function getData() {
    const response = await fetch('https://api.myjson.com/bins/14o7e4');
    const myJson = await response.json();
    list = myJson;
    for (var i = 0; i < list.length; i++) {
        if (list[i].rank) {
            mostPopular.push(list[i]);
        } else if (list[i].expectations_count) {
            comingSoon.push(list[i]);
        }
    }
    createHorizSlider1(comingSoon);
    createVertSlider2(mostPopular);

}

getData();


function initializePlayerButtons() {
    let playButtons = document.querySelectorAll('.play-button');
    for(var i = 0; i < playButtons.length; i++) {
        playButtons[i].addEventListener("click", function () {
            openPlayer();
        })
    }
}

function openPlayer() {

    if(player) {
        if(player.children[1].id === "video-placeholder") {
            player.destroy();
        }
    }

    document.getElementById('close-player').style.display = "block";
    var player = new YT.Player('video-placeholder', {
        width: 1200,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
    });
    closePlayer(player);
}

function closePlayer(player) {
    document.getElementById('close-player').addEventListener('click', function () {
        player.destroy();
        document.getElementById('close-player').style.display = "none";
    })
}




function createHorizSlider1(array) {
    s1.querySelector('.swiper-button-prev').style.display = "none";
    s1.querySelector('.swiper-button-next').style.display = "none";
    drawCard(s1Wrapper, array);
    swiper1 = new Swiper({
        el: '.s1',
        direction: "horizontal",
        initialSlide: 2,
        spaceBetween: 130,
        slidesPerView: 4,
        centeredSlides: true,
        slideToClickedSlide: true,
    });
    initializePlayerButtons();
}

function createVertSlider1(array) {
    s1.querySelector('.swiper-button-prev').style.display = "block";
    s1.querySelector('.swiper-button-next').style.display = "block";
    drawList(s1Wrapper, array);
    swiper1 = new Swiper({
        el: '.s1',
        direction: "vertical",
        initialSlide: 2,
        spaceBetween: 60,
        slidesPerView: 3,
        centeredSlides: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    setProgress();
    initializePlayerButtons();
}

function createVertSlider2(array) {
    s2.querySelector('.swiper-button-prev').style.display = "block";
    s2.querySelector('.swiper-button-next').style.display = "block";
    drawList(s2Wrapper, array);
    swiper2 = new Swiper({
        el: '.s2',
        direction: "vertical",
        initialSlide: 2,
        spaceBetween: 60,
        slidesPerView: 3,
        centeredSlides: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    setProgress();
    initializePlayerButtons();
}

function createHorizSlider2(array) {
    s2.querySelector('.swiper-button-prev').style.display = "none";
    s2.querySelector('.swiper-button-next').style.display = "none";
    drawCard(s2Wrapper, array);
    swiper2 = new Swiper({
        el: '.s2',
        direction: "horizontal",
        initialSlide: 2,
        spaceBetween: 130,
        slidesPerView: 4,
        centeredSlides: true,
        slideToClickedSlide: true,
    });
}

function comingFilter(str) {
    comingSoonF = [];
    var view;
    if (swiper1.params.direction === "horizontal") {
        view = "card";
    } else {
        view = "list";
    }
    for (var i = 0; i < comingSoon.length; i++) {
        if (comingSoon[i].type === str) {
            comingSoonF.push(comingSoon[i]);
        }
    }
    swiper1.destroy();
    if (view === "list") {
        createVertSlider1(comingSoonF)
    } else {
        createHorizSlider1(comingSoonF)
    }
}

function mostPopularFilter(str) {
    mostPopularF = [];
    var view;
    if (swiper2.params.direction === "vertical") {
        view = "list";
    } else {
        view = "card";
    }
    for (var i = 0; i < mostPopular.length; i++) {
        if (mostPopular[i].type === str) {
            mostPopularF.push(mostPopular[i]);
        }
    }
    console.log(mostPopularF);
    swiper2.destroy();
    if (view === "list") {
        createVertSlider2(mostPopularF)
    } else {
        createHorizSlider2(mostPopularF)
    }
}


function setProgress() {
    var circles = document.querySelectorAll('.progress-ring__circle');
    var rates = document.querySelectorAll('.rate');
    let radius = circles[0].r.baseVal.value;
    var circumferens = 2 * Math.PI * radius;
    for (var i = 0; i < circles.length; i++) {
        circles[i].style.strokeDasharray = `${circumferens} ${circumferens}`;
        circles[i].style.strokeDashoffset = circumferens;
        var offset = circumferens - (+rates[i].textContent) * 10 / 100 * circumferens;
        circles[i].style.strokeDashoffset = offset;
    }


    // circle.setAttribute("dash-")
}

function drawList(t, arr) {
    html = ``;
    for (let i = 0; i < arr.length; i++) {
        html += `<div class="swiper-slide">
                <div class="film-image">
                    <img src="${arr[i].poster}" alt="${arr[i].title}">
                </div>
                <button class="play-button">
                    <a href="#player"><img src="./img/play-button.svg" alt="Play"></a>
                </button>
            ${arr[i].rank ? `
            <div class="film-rate">
                <svg class="progress-ring" width="100" height="100">
                    <circle class="progress-ring__circle2" stroke="#d3f4e3" stroke-width="12" cx="50" cy="50" r="40"
                            fill="transparent"/>
                    <circle class="progress-ring__circle" stroke="#22ca71" stroke-width="12" cx="50" cy="50" r="40"
                            fill="transparent"
                            stroke-dasharray="50 10" stroke-dashoffset="100"/>
                </svg>
                <span class="rate">${arr[i].rank ? arr[i].rank : arr[i].expectations_count}</span>
            </div>`
            :
            `
            <div class="gradeless">
                <img src="img/products/actions/gradeless.svg">
            </div>
            `}
            <div class="content-wrapper">
                <div class="film-info">
                    <h3 class="film-tittle">${arr[i].title}</h3>
                    <span class="film-year">${arr[i].year}</span>
                    <span class="film-director">${arr[i].director}</span>
                    <span class="film-writer">${arr[i].writer}</span>
                </div>
                <div class="film-description">
                    ${arr[i].content}
                </div>
                <div class="film-actions">
                    <button class="film-share">
                        <img src="icons/Share.png" alt="">
                    </button>
                    <button class="film-comment">
                        <p>${arr[i].comments_count}</p>
                        <img src="icons/comment.png" alt="">
                    </button>
                    <button class="film-rate">
                        <p>123</p>
                        <img src="icons/torate.png" alt="">
                    </button>
                    <button class="film-like">
                        <p>${arr[i].likes_count}</p>
                        <img src="icons/like.png" alt="">
                    </button>
                    <button id="readmore" href="#">Read more</button>
                </div>
            </div>
        </div>`
    }
    t.innerHTML = html;
}

function drawCard(t, arr) {
    html = ``;
    for (let i = 0; i < arr.length; i++) {
        html += `<div class="swiper-slide">
            <div class="film-info">
                <h3 class="film-tittle">${arr[i].title}</h3>
                <span class="film-year">${arr[i].year}</span>
            </div>
            <div class="img-wrapper">
                <div class="film-image">
                    <img src="${arr[i].poster}" alt="${arr[i].title}">
                </div>
            </div>
            <div class="film-attr">
                <span class="film-type"></span>
                <span class="film-cant-grade"></span>
            </div>
            <button class="play-button">
                <img src="./img/play-button.svg" alt="Play">
            </button>
            <div class="film-actions">
                <button class="film-share">
                    <img src="icons/Share.png" alt="">
                </button>
                <button class="film-comment">
                    <p>${arr[i].comments_count}</p>
                    <img src="icons/comment.png" alt="">
                </button>
                <button class="film-rate">
                    <p>623</p>
                    <img src="icons/torate.png" alt="">
                </button>
                <button class="film-like">
                    <p>${arr[i].likes_count}</p>
                    <img src="icons/like.png" alt="">
                </button>
            </div>
        </div>`
    }
    t.innerHTML = html;
}

document.getElementById('view-list__s1').addEventListener('click', function (e) {
    document.querySelector('.active-filter1').classList.remove("active-filter1");
    document.getElementById('filter-all1').classList.add("active-filter1");
    document.querySelector('.active-view1').classList.remove("active-view1");
    e.target.classList.add("active-view1");
    if (s1.classList.contains('swiper-card')) {
        swiper1.destroy();
        s1.classList.remove('swiper-card');
        s1.classList.remove('swiper-container-horizontal');
        s1.classList.add('swiper-list');
        s1Wrapper.classList.add('container');
        // drawList(s1Wrapper, comingSoonList);
        createVertSlider1(comingSoon);
    }
});
document.getElementById('view-card__s1').addEventListener('click', function (e) {
    document.querySelector('.active-filter1').classList.remove("active-filter1");
    document.getElementById('filter-all1').classList.add("active-filter1");
    document.querySelector('.active-view1').classList.remove("active-view1");
    e.target.classList.add("active-view1");
    if (s1.classList.contains('swiper-list')) {
        swiper1.destroy();
        s1.classList.remove('swiper-list');
        s1.classList.add('swiper-card');
        s1Wrapper.classList.remove('container');
        createHorizSlider1(comingSoon);
    }
});

document.getElementById('view-list__s2').addEventListener('click', function (e) {
    document.querySelector('.active-filter2').classList.remove("active-filter2");
    document.getElementById('filter-all2').classList.add("active-filter2");
    document.querySelector('.active-view2').classList.remove("active-view2");
    e.target.classList.add("active-view2");
    if (s2.classList.contains('swiper-card')) {
        swiper2.destroy();
        s2.classList.remove('swiper-card');
        s2.classList.remove('swiper-container-horizontal');
        s2.classList.add('swiper-list');
        createVertSlider2(mostPopular);
    }
});
document.getElementById('view-card__s2').addEventListener('click', function (e) {
    document.querySelector('.active-filter2').classList.remove("active-filter2");
    document.getElementById('filter-all2').classList.add("active-filter2");
    document.querySelector('.active-view2').classList.remove("active-view2");
    e.target.classList.add("active-view2");
    if (s2.classList.contains('swiper-list')) {
        swiper2.destroy();
        s2.classList.remove('swiper-list');
        s2.classList.add('swiper-card');
        createHorizSlider2(mostPopular);
    }
});

document.getElementById('filter-tv1').addEventListener('click', function (e) {
    document.querySelector('.active-filter1').classList.remove("active-filter1");
    e.target.classList.add("active-filter1");
    comingFilter("TV-Show");
});
document.getElementById('filter-all1').addEventListener('click', function (e) {
    document.querySelector('.active-filter1').classList.remove("active-filter1");
    e.target.classList.add("active-filter1");
    if (swiper1.params.direction === "horizontal") {
        swiper1.destroy();
        createHorizSlider1(comingSoon);
    } else {
        swiper1.destroy();
        createVertSlider1(comingSoon);
    }
});
document.getElementById('filter-movies1').addEventListener('click', function (e) {
    document.querySelector('.active-filter1').classList.remove("active-filter1");
    e.target.classList.add("active-filter1");
    comingFilter("Movie");
});

document.getElementById('filter-tv2').addEventListener('click', function (e) {
    document.querySelector('.active-filter2').classList.remove("active-filter2");
    e.target.classList.add("active-filter2");
    mostPopularFilter("TV-Show");
});
document.getElementById('filter-all2').addEventListener('click', function (e) {
    document.querySelector('.active-filter2').classList.remove("active-filter2");
    e.target.classList.add("active-filter2");
    if (swiper2.params.direction === "horizontal") {
        swiper2.destroy();
        createHorizSlider2(mostPopular);
    } else {
        swiper2.destroy();
        createVertSlider2(mostPopular);
    }
});
document.getElementById('filter-movies2').addEventListener('click', function (e) {
    document.querySelector('.active-filter2').classList.remove("active-filter2");
    e.target.classList.add("active-filter2");
    mostPopularFilter("Movie");
});

