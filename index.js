const episodes = [
  { title: "Hänen nimensä on Weed", id: "8iaV94rgpaM", premium: false },
  { title: "Ilmetty päällikkö", id: "EPltPK_pQSw", premium: false },
  { title: "Ohu-vuorten soturi", id: "cqzBhOeSEo4", premium: false },
  { title: "Lupaava pentu", id: "HtuEXXZgGGE", premium: false },
  { title: "Paluu Ohuun", id: "VMo1EF6aaqo", premium: false },
  { title: "Kaksipäinen hirviö", id: "kphy1MC0588", premium: false },
  { title: "Hampaan jälki", id: "p0JqWQQ0Dn8", premium: false },
  { title: "Soturin huuto", id: "_ucccK08PTc", premium: false },
  { title: "Ohuen uusi sankaritarina", id: "mufPkJ3cTLQ", premium: false }, // 9
  { title: "Kain hirviö", id: "YmVzZvbsTkk", premium: false },           // 10
  { title: "Villin luonnon kutsu", id: "GTvslkh8yjc", premium: false },    // 11
  { title: "Koston liekki", id: "MYC0_3E_syI", premium: false },          // 12
  { title: "Uskollisuus", id: "rRBaSREjU04", premium: false },            // 13
  { title: "Metsästäjän veri", id: "Cs1ly8jEoQU", premium: true },         // 14
  { title: "Smithin muisto", id: "vQnHCkZrK4E", premium: true },
  { title: "Kunnian hinta", id: "jV-Mf7mLu9Y", premium: true },
  { title: "Uusi vihollinen", id: "Oz5_1mLpzrk", premium: true },
  { title: "Soturin sydän", id: "8iaV94rgpaM", premium: true },
  { title: "Menneisyyden haamu", id: "EPltPK_pQSw", premium: true },
  { title: "Kohtalokas taistelu", id: "cqzBhOeSEo4", premium: true },
  { title: "Veljesviha", id: "HtuEXXZgGGE", premium: true },
  { title: "Ratkaiseva hetki", id: "VMo1EF6aaqo", premium: true },
  { title: "Ginin perintö", id: "m4z7LOEhAW4", premium: true },
  { title: "Ohu-vuorten valtias", id: "w1iABRyvnAI", premium: true },
  { title: "Viimeinen taistelu", id: "FPJTgGkLvU8", premium: true },
  { title: "Sivuston Outro: Heippa!", id: "Oz5_1mLpzrk", premium: true }
];

let player;
let currentIndex = 0;
let isWeedPlus = false;

// Käyttäjälaskuri
function updateOnline() {
  const counter = document.getElementById('online-counter');
  if(counter) counter.innerText = "Käyttäjiä linjoilla: " + Math.floor(Math.random() * 100 + 50);
}
setInterval(updateOnline, 3000); 
updateOnline();

// Kirjautuminen
function checkLogin() {
  const val = document.getElementById('username').value.toLowerCase();
  if (val === "weed") {
    isWeedPlus = true;
    alert("Tervetuloa Weed! Weed+ videot avattu.");
    renderList();
  } else {
    alert("Väärä nimi! Weed+ vaatii nimen 'weed'.");
  }
}

// YouTube API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: episodes[currentIndex].id,
    events: { 'onStateChange': onStateChange }
  });
  renderList();
}

function onStateChange(event) {
  if (event.data === 0) {
    if (currentIndex === episodes.length - 1) {
      document.getElementById('custom-outro').classList.remove('hidden');
    } else {
      let next = currentIndex + 1;
      if (episodes[next].premium && !isWeedPlus) {
        alert("Seuraava jakso vaatii Weed+!");
      } else {
        playVideo(next);
      }
    }
  }
}

function playVideo(index) {
  currentIndex = index;
  if (player && player.loadVideoById) {
    player.loadVideoById(episodes[index].id);
  }
  renderList();
}

function renderList() {
  const list = document.getElementById('episode-list');
  if(!list) return;
  list.innerHTML = "";
  episodes.forEach((ep, index) => {
    const li = document.createElement('li');
    li.innerText = (index + 1) + ". " + ep.title;
    if (ep.premium && !isWeedPlus) {
      li.classList.add('locked');
    } else {
      if (index === currentIndex) li.classList.add('active');
      li.onclick = () => playVideo(index);
    }
    list.appendChild(li);
  });
}

function restartApp() {
  location.reload();
}
