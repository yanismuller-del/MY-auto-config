
// 👤 USER
function getUser() {
  let user = localStorage.getItem("user");
  if (!user) {
    user = prompt("Choisis ton pseudo");
    localStorage.setItem("user", user);
  }
  return user;
}

/* =========================
   📸 POSTS
========================= */

function createPost() {
  let title = document.getElementById("titre").value;
  let desc = document.getElementById("desc").value;
  let tag = document.getElementById("tag").value;
  let image = document.getElementById("image").value;
  let user = getUser();

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({
    user,
    title,
    desc,
    tag,
    image,
    likes: 0,
    comments: []
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  alert("Post publié !");
}

/* =========================
   📱 FEED
========================= */

function loadFeed() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  let html = "";

  posts.slice().reverse().forEach((p, i) => {
    html += `
      <div class="card">
        <div class="user">👤 ${p.user}</div>

        <h3>${p.title}</h3>
        <p>${p.desc}</p>

        ${p.image ? `<img class="post-img" src="${p.image}">` : ""}

        <small>🏷️ ${p.tag}</small>

        <button onclick="like(${i})">❤️ ${p.likes}</button>

        <input id="c${i}" placeholder="Commentaire">
        <button onclick="comment(${i})">Envoyer</button>

        <div>
          ${p.comments.map(c => `<p>💬 ${c}</p>`).join("")}
        </div>
      </div>
    `;
  });

  document.getElementById("feed").innerHTML = html;
}

/* =========================
   ❤️ LIKE
========================= */

function like(i) {
  let posts = JSON.parse(localStorage.getItem("posts"));
  posts[i].likes++;
  localStorage.setItem("posts", JSON.stringify(posts));
  loadFeed();
}

/* =========================
   💬 COMMENTAIRES
========================= */

function comment(i) {
  let posts = JSON.parse(localStorage.getItem("posts"));
  let c = document.getElementById("c"+i).value;

  posts[i].comments.push(c);

  localStorage.setItem("posts", JSON.stringify(posts));
  loadFeed();
}

/* =========================
   👤 PROFIL
========================= */

function loadProfile() {
  let user = getUser();

  document.getElementById("username").innerText = "Profil de " + user;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  let mine = posts.filter(p => p.user === user);

  document.getElementById("myPosts").innerHTML =
    mine.map(p => `
      <div class="card">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <small>🏷️ ${p.tag}</small>
      </div>
    `).join("");
}

/* =========================
   💬 DM SIMPLE
========================= */

function sendDM() {
  let to = document.getElementById("to").value;
  let msg = document.getElementById("msg").value;
  let from = getUser();

  let dms = JSON.parse(localStorage.getItem("dms")) || [];

  dms.push({ from, to, msg });

  localStorage.setItem("dms", JSON.stringify(dms));

  alert("Message envoyé !");
}

/* =========================
   AUTO LOAD
========================= */

if (document.getElementById("feed")) loadFeed();
if (document.getElementById("myPosts")) loadProfile();