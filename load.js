const today = new Date().toISOString().split("T")[0];

let data = JSON.parse(localStorage.getItem("save")) || {
  categories: {
    study: { name: "Study", color: "#4CAF50", required: 2 }
  },
  tasks: {
    [today]: []
  },
  theme: "light"
};

function save() {
  localStorage.setItem("save", JSON.stringify(data));
}

function renderCategories() {
  const el = document.getElementById("categories");
  el.innerHTML = "";

  for (let key in data.categories) {
    const cat = data.categories[key];
    const count = (data.tasks[today] || []).filter(t => t.category === key).length;

    const div = document.createElement("div");
    div.className = "category";
    div.style.borderColor = cat.color;
    div.innerHTML = `<strong>${cat.name}</strong>: ${count} / ${cat.required}`;
    el.appendChild(div);
  }
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  (data.tasks[today] || []).forEach((task, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""}>
      ${task.title}
    `;
    li.querySelector("input").onchange = () => {
      task.done = !task.done;
      save();
    };
    list.appendChild(li);
  });
}

document.getElementById("addTask").onclick = () => {
  const title = prompt("Task name?");
  if (!title) return;

  data.tasks[today].push({
    title,
    category: "study",
    done: false,
    oneTime: true
  });

  save();
  renderTasks();
  renderCategories();
};

document.getElementById("themeToggle").onclick = () => {
  data.theme = data.theme === "light" ? "dark" : "light";
  document.body.dataset.theme = data.theme;
  save();
};

document.body.dataset.theme = data.theme;

renderCategories();
renderTasks();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("save.js");
}
