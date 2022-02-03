// when document loads
let todos = [];
$(document).ready(function () {
  if (localStorage.getItem("todos") !== null) {
    const t = JSON.parse(localStorage.getItem("todos"));
    if (t.length !== 0) {
      for (i = 0; i < t.length; i++) {
        todos.push(t[i]);
      }
    }
  }

  render();
});

//for submitted
$("form").submit(function (e) {
  e.preventDefault();
  saveAndAddDiv();
  clearInput();
});

function saveAndAddDiv(index) {
  let title = $("#task").val();
  let priority = $("#priority").val();
  let isDone = false;
  let taskId = getRandomId();
  if (title !== "") {
    todos.push({
      title: title,
      priority: priority,
      status: isDone,
      id: taskId,
    });
    insertToLocal(todos);
    addTodoDiv(title, priority, taskId);
    showSuccessAlert();
  } else {
    showDangerAlert();
  }
}

function insertToLocal(arr) {
  let stringArr = JSON.stringify(arr);
  localStorage.setItem("todos", stringArr);
}

function getRandomId() {
  const d = Date.now();
  return d;
}

// render

function clearInput() {
  $("#task").val("");
}

// delete button working
$(document).on("click", "#delBtn", function () {
  let ind = $(this).parent().index();
  remove(ind);
  $(this).parent().fadeOut();
  $(this).parent().remove();
});

// done button working
$(document).on("click", "#statusBtn", function () {
  console.log("done clicked");
  let index = $(this).parent().index();
  if (todos[index].status === false) {
    todos[index].status = true;
    console.log(todos[index].status);
    insertToLocal(todos);
    $(this).parent().css("text-decoration", "line-through");
    $(this).parent().css("opacity", "0.4");
  } else {
    todos[index].status = false;
    console.log(todos[index].status);
    insertToLocal(todos);
    $(this).parent().css("text-decoration", "none");
  }
});

function render() {
  if (todos.length === 0) {
    console.log("nothing");
  } else {
    for (i = 0; i < todos.length; i++) {
      let taskid = todos[i].id;
      let title = todos[i].title;
      let priority = todos[i].priority;
      let status = todos[i].status;
      if (status === false) {
        let div = `<tr>
        <th scope="row">${title}</th>
        <td>${priority}</td>
        <td>${status}</td>
        <td>Delete</td>
      </tr>`;

        $("tbody").append(div);
      } else {
        let div = `<tr>
        <th scope="row">${title}</th>
        <td>${priority}</td>
        <td>${status}</td>
        <td>Delete</td>
      </tr>`;

        $("tbody").append(div);
      }
    }
  }
}

function showDangerAlert() {
  $(".alert-danger").show();
  setTimeout(function () {
    $(".alert-danger").hide();
  }, 2000);
}

function showSuccessAlert() {
  $(".alert-success").show();
  setTimeout(function () {
    $(".alert-success").hide();
  }, 2000);
}

function addTodoDiv(title, priority, taskId) {
  let div = `<tr>
        <th scope="row">${title}</th>
        <td>${priority}</td>
        <td>${status}</td>
        <td>Delete</td>
      </tr>`;

        $("tbody").append(div);
}

function remove(n) {
  console.log(n);
  todos.splice(n, 1);
  console.log("item removes");
  insertToLocal(todos);
  console.log(todos);
}

$("#sortBtn").click(function () {
  console.log("sort clicked");
  todos.sort(function (a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
  });
  $(".todo-list").empty();
  insertToLocal(todos);
  render();
});

$(document).on("dblclick", ".todo", function () {
  let index = $(this).index();
  $("#task").val(todos[index].title);
  $("#priority").val(todos[index].priority);
});
