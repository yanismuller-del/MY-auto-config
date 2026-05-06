function createPost() {
  let title = document.getElementById("titre").value;
  let desc = document.getElementById("desc").value;
  let tag = document.getElementById("tag").value;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  let post = {
    title,
    desc,
    tag,
    likes: 0,
    comments: []
  };

  posts.push(post);

  localStorage.setItem("posts", JSON.stringify(posts));

  alert("Post publié !");
}

function loadFeed() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  let html = "";

  posts.reverse().forEach((p, index) => {
    html += `
      <div class="card">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <small>🏷️ ${p.tag}</small>

        <button onclick="like(${index})">❤️ ${p.likes}</button>

        <div>
          <input placeholder="Commentaire" id="c${index}">
          <button onclick="comment(${index})">Commenter</button>
        </div>

        <div id="comments${index}">
          ${p.comments.map(c => `<p>💬 ${c}</p>`).join("")}
        </div>
      </div>
    `;
  });

  document.getElementById("feed").innerHTML = html;
}

function like(i) {
  let posts = JSON.parse(localStorage.getItem("posts"));
  posts[i].likes++;
  localStorage.setItem("posts", JSON.stringify(posts));
  loadFeed();
}

function comment(i) {
  let posts = JSON.parse(localStorage.getItem("posts"));
  let c = document.getElementById("c"+i).value;

  posts[i].comments.push(c);

  localStorage.setItem("posts", JSON.stringify(posts));
  loadFeed();
}

if (document.getElementById("feed")) {
  loadFeed();
}