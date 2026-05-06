const data = {
  BMW: {
    "Serie 3": {
      "320d 190": {
        origine: 190,
        stage1: 230,
        stage2: 260
      }
    }
  }
};

function calcul() {
  let moteur = document.getElementById("moteur").value;
  let stage = document.getElementById("stage").value;

  let voiture = data["BMW"]["Serie 3"][moteur];

  let resultat = voiture[stage];

  document.getElementById("resultat").innerHTML =
    `Puissance après modif : ${resultat}ch`;
}
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