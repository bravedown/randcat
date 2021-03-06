let info = JSON.parse(localStorage.getItem("randcat-info"));
if (!info) info = {};

$("#new-cat").on("click", newCat);
function newCat() {
    let id = $("#cat-name").val() !== "" ? $("#cat-name").val().trim().split(" ").join("-") : "blankcat";
    let html = 
    `<div id="${id}" class="row bg-light">
        <div class="col-6 col-md-8 list-group-item list-group-item-primary">
            <h2>
                ${$("#cat-name").val()}
            </h2>
        </div>
        <div class="list-group-item list-group-item-info col-3 col-md-2">
            <input data-cat="${$("#cat-name").val()}" class="frequency form-control" placeholder="Freq">
        </div>
        <div class="list-group-item list-group-item-danger col-3 col-md-2">
            <button data-cat="${id}" class="delete-cat btn btn-outline-danger btn-light">Delete</button>
        </div>
    </div>`;
    $("#categories").append($(html));

}

$(document).on("click", ".delete-cat", deleteCat);
function deleteCat(event) {
    let cat = $(this).attr("data-cat");
    $("#" + cat).remove();
}

$("#generate").on("click", generateCat);
function generateCat() {
    let cats = [];
    let pos = 0;
    $(".frequency").each(function(){
        pos += +$(this).val();
        cats.push([$(this).attr("data-cat"), $(this).val(), pos]);
    });
    let sum = 0;
    cats.forEach(e => sum += parseInt(e[1]));
    let randNum = Math.floor(Math.random() * sum);
    let chosenCat = "";
    for (let i = 0; i < cats.length; i++) {
        if (randNum < cats[i][2]) {
            if (!(cats[i-1] && randNum < cats[i-1][2])) chosenCat = cats[i][0]
        }
    }
    $("#history").prepend($(`<h3 class="text-info">${$("#active-cat").text()}</h3>`));
    $("#active-cat").text(chosenCat);    
}