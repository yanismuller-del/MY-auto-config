const data = {
  BMW: {
    "Série 3": {
      "320d 190": {
        stage1: 230,
        stage2: 260
      }
    }
  }
};

// CONFIGURATEUR
function calcul() {
  let moteur = document.getElementById("moteur").value;
  let stage = document.getElementById("stage").value;

  let result = data["BMW"]["Série 3"][moteur][stage];

  document.getElementById("resultat").innerHTML =
    "Puissance estimée : " + result + " ch";
}

// PROPOSITION CONFIG
function proposer() {
  let config = {
    moteur: document.getElementById("moteur").value,
    stage: document.getElementById("stage").value
  };

  let list = JSON.parse(localStorage.getItem("configs")) || [];
  list.push(config);
  localStorage.setItem("configs", JSON.stringify(list));

  alert("Config envoyée !");
}

// FORUM
function poster() {
  let titre = document.getElementById("titre").value;
  let message = document.getElementById("message").value;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({ titre, message });
  localStorage.setItem("posts", JSON.stringify(posts));

  afficher();
}

function afficher() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  let html = "";

  posts.reverse().forEach(p => {
    html += `
      <div class="card">
        <h3>${p.titre}</h3>
        <p>${p.message}</p>
      </div>
    `;
  });

  document.getElementById("posts").innerHTML = html;
}

if (document.getElementById("posts")) {
  afficher();
}