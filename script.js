const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

// Cheia ta NewsAPI integrată direct
const apiKey = "935cecfe80e14bdcb5d1c000dad47acb";

// "in" pentru India, poți schimba în 'us' pentru SUA
const country = "in";

const options = ["general","entertainment","health","science","sports","technology"];
let requestURL;

// Creează carduri pentru articole (UI modern)
const generateUI = (articles) => {
  container.innerHTML = "";
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");

    // Limităm descrierea la 120 caractere
    let shortDesc = item.description || item.content || "";
    if (shortDesc.length > 120) shortDesc = shortDesc.substring(0, 117) + "...";

    card.innerHTML = `
      <div class="news-image-container">
        <img src="${item.urlToImage || "https://picsum.photos/400/225"}" alt="${item.title}" />
      </div>
      <div class="news-content">
        <h3 class="news-title">${item.title}</h3>
        <p class="news-description">${shortDesc}</p>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>
    `;

    container.appendChild(card);
  }
};

// Apelează NewsAPI
const getNews = async () => {
  try {
    let response = await fetch(requestURL);
    if (!response.ok) {
      alert("Data unavailable at the moment. Please try again later");
      return;
    }
    let data = await response.json();
    generateUI(data.articles);
  } catch (error) {
    console.error(error);
    alert("An error occurred while fetching news.");
  }
};

// Selectarea unei categorii
const selectCategory = (e, category) => {
  document.querySelectorAll(".option").forEach((btn) => btn.classList.remove("active"));
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

// Crearea butoanelor de categorie
const createOptions = () => {
  optionsContainer.innerHTML = "";
  options.forEach((cat) => {
    let btn = document.createElement("button");
    btn.className = `option ${cat === "general" ? "active" : ""}`;
    btn.textContent = cat;
    btn.addEventListener("click", (e) => selectCategory(e, cat));
    optionsContainer.appendChild(btn);
  });
};

// Inițializare
const init = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  createOptions();
  getNews();
};

window.onload = init;
