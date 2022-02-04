let tags = [];



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
  if (localStorage.getItem("tags") !== null) {
    const t = JSON.parse(localStorage.getItem("tags"));
    if (t.length !== 0) {
      for (i = 0; i < t.length; i++) {
        tags.push(t[i]);
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
  let tag = $("#tags-select").val();
  if (title !== "") {
    todos.push({
      title: title,
      priority: priority,
      status: isDone,
      id: taskId,
      tag: tag
    });
    insertToLocal(todos,"todos");
    addTodoDiv(title, priority, taskId, tag);
    showSuccessAlert();
  } else {
    showDangerAlert();
  }
}

function insertToLocal(arr, name) {
  let stringArr = JSON.stringify(arr);
  localStorage.setItem(name, stringArr);
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
    insertToLocal(todos,"todos");
    $(this).parent().css("text-decoration", "line-through");
    $(this).parent().css("opacity", "0.4");
  } else {
    todos[index].status = false;
    console.log(todos[index].status);
    insertToLocal(todos,"todos");
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
      let tag = todos[i].tag;
      let status = todos[i].status;
      if (status === false) {
        let div = `<tr>
        <th scope="row">${title}</th>
        <td>${priority}</td>
        <td><div class="input-group mb-3">
        <div class="input-group-text">
          <input class="form-check-input mt-0" id="status-btn" type="checkbox" value="" aria-label="Checkbox for following text input">
        </div>
        
      </div></td>
        <td>${tag}</td>
        <td><button id="delete-btn" class="btn btn-danger">Delete</button> <button id="update-btn" data-bs-toggle="modal"
        data-bs-target="#edit_modal" class="btn btn-warning">Update</button></td>
      </tr>`;

        $("tbody").append(div);
      } else {
        let div = `<tr>
        <th scope="row">${title}</th>
        <td>${priority}</td>
        <td><div class="input-group mb-3">
        <div class="input-group-text">
          <input class="form-check-input mt-0" id="status-btn" type="checkbox" checked value="" aria-label="Checkbox for following text input">
        </div>
        
      </div></td>
        <td>${tag}</td>
        <td><button id="delete-btn" class="btn btn-danger">Delete</button> <button id="update-btn" data-bs-toggle="modal"
        data-bs-target="#edit_modal" class="btn btn-warning">Update</button></td>
      </tr>`;

        $("tbody").append(div);
      }
    }
  }

  if (tags.length === 0) {
    console.log("tags empty");
  } else {
    for (i = 0; i < tags.length; i++) {
      let tag = `<li class="list-group-item d-flex justify-content-between">${tags[i]} <button type="button" id="tag-delete-btn" class="btn-close" aria-label="Close"></button>  </li> `
      $("#tag-list").append(tag);
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

function addTodoDiv(title, priority, taskId, tag) {
  let div = `<tr>
  <th scope="row">${title}</th>
  <td>${priority}</td>
  <td><div class="input-group mb-3">
  <div class="input-group-text">
    <input class="form-check-input mt-0" id="status-btn" type="checkbox" value="" aria-label="Checkbox for following text input">
  </div>
  
</div></td>
  <td>${tag}</td>
  <td><button id="delete-btn" class="btn btn-danger">Delete</button> <button id="update-btn" data-bs-toggle="modal"
  data-bs-target="#edit_modal" class="btn btn-warning">Update</button></td>
</tr>`;

        $("tbody").append(div);
}

function remove(n) {
  console.log(n);
  todos.splice(n, 1);
  console.log("item removes");
  insertToLocal(todos,"todos");
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
  insertToLocal(todos,"todos");
  render();
});

$(document).on("dblclick", ".todo", function () {
  let index = $(this).index();
  $("#task").val(todos[index].title);
  $("#priority").val(todos[index].priority);
});


// add tags
$("#add-tag-btn").click(function () {
  let tag_input = $("#tag-input").val();
  let tag = `<li class="list-group-item d-flex justify-content-between">${tag_input} <button type="button" id="tag-delete-btn" class="btn-close" aria-label="Close"></button>  </li> `
  $("#tag-list").append(tag);
  tags.push(tag_input);
  insertToLocal(tags,"tags");
  console.log(tags)
  $("#tag-input").val(" ");
});


$("#add-todo-btn").click(function () {
  for(i=0;i<tags.length;i++){
    let tag = `<option value="${tags[i]}">${tags[i]}</option>`
    $("#tags-select").append(tag);
  }
})


$(document).on("click","#update-btn", function(){
  for(i=0;i<tags.length;i++){
    let tag = `<option value="${tags[i]}">${tags[i]}</option>`
    $("#edit_tags_select").append(tag);
  }
  let index = $(this).parent().parent().index();
  $("#edit_task").val(todos[index].title);
  $("#edit_priority").val(todos[index].priority);
  $("#edit_tags_select").val(todos[index].tag);
  $("#update_submit_button").click(function(){
    todos[index].title = $("#edit_task").val();
    todos[index].priority = $("#edit_priority").val();
   // todos[index].status = $("#edit_tags_select").checked();
    console.log(index);
   
  });
});

$(document).on("click","#tag-delete-btn", function(){
  let index = $(this).parent().index();
  tags.splice(index,1);
  insertToLocal(tags,"tags")
  $(this).parent().remove();
  console.log(tags);
});



$(document).on("change", "#status-btn", function () {
  if(this.checked){
    let index = $(this).parent().parent().parent().parent().index();
    todos[index].status = true;
    insertToLocal(todos,"todos");
  }else{
    let index = $(this).parent().parent().parent().parent().index();
    todos[index].status = true;
    insertToLocal(todos,"todos");

  }
})


//filter table
$("#search").on("keyup", function(){
  var value = $(this).val().toLowerCase();
  $(".table-body tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

$(document).on("click","#delete-btn",function () {
  console.log("delete button pressed");
  let index = $(this).parent().parent().index();
  todos.splice(index, 1);
  $(this).parent().parent().remove();
  insertToLocal(todos,"todos");

})

