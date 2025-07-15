// let banco = [{ tarefa: "tarefa1", status: "checked" }];

function getbanco() {
  return JSON.parse(localStorage.getItem("TodoList")) ?? [];
}

function setBanco(banco) {
  localStorage.setItem("TodoList", JSON.stringify(banco));
}

function criarTarefa(tarefa, stausTarefa, index) {
  const div = document.createElement("div");
  div.innerHTML = ` 
    <input type="checkbox" class="checkbox" ${stausTarefa} data-index=${index}>
    <label>${tarefa} </label>
    <button class='button-remove' data-index=${index}>❌</button>`;

  document.getElementById("tasks").append(div);
}

function atualizarTela(e) {
  document.getElementById("tasks").textContent = "";
  const banco = getbanco();
  banco.forEach((item, index) => {
    criarTarefa(item.tarefa, item.status, index);
  });
}

function atualizarItem(index) {
  const banco = getbanco();
  banco[index].status = banco[index].status === "" ? "checked" : "";
  setBanco(banco);
  atualizarTela();
}

function removeItem(index) {
  const banco = getbanco();
  banco.splice(index, 1);
  setBanco(banco);
  atualizarTela();
}

function itemClicado(e) {
  const el = e.target;
  if (el.type === "submit") {
    const index = el.dataset.index;
    removeItem(index);
  }

  if (el.type === "checkbox") {
    const index = el.dataset.index;
    console.log(index);
    atualizarItem(index);
    atualizaPorcetagem();
  }
}

function apagarTodasTarefas(e) {
  const banco = getbanco();
  banco.splice(0, banco.length);
  setBanco(banco);
  document.querySelector(".search").style.width = `0`;
  atualizarTela();
}

function atualizaPorcetagem() {
  const banco = getbanco();
  let qtdChecked = 0;

  banco.forEach((item) => {
    if (item.status) {
      qtdChecked++;
    }
  });

  let pct = Math.floor((qtdChecked / banco.length) * 100);

  document.querySelector(".search").style.width = `${pct}%`;
  document
    .querySelector(".search")
    .setAttribute("placeholder", `${pct}% Concluido`);
}

function cadastraNovaTarefa(e) {
  const banco = getbanco();

  if (e.target.value === "") return;

  if (e.key === "Enter") {
    banco.push({ tarefa: e.target.value, status: "" });
    setBanco(banco);
    atualizaPorcetagem();
    atualizarTela();
    e.target.value = ""; // Limpar tarefa do input
  }

  if (banco.length > 0) {
    document.getElementById("clear-tasks").style.display = "block";
  }
}

document
  .getElementById("newTask")
  .addEventListener("keypress", cadastraNovaTarefa);

document
  .getElementById("clear-tasks")
  .addEventListener("click", apagarTodasTarefas);

document.getElementById("tasks").addEventListener("click", itemClicado);

atualizarTela();
