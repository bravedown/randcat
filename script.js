let info = JSON.parse(localStorage.getItem("randcat-info"));
if (!info) info = {};

$("#new-cat").on("click", newCat);
function newCat() {
    let html = 
    `<div class="row bg-light">
        <div id="cat1" class="col-6 col-md-8 list-group-item list-group-item-primary">
            <h2>
                ${$("#cat-name").val()}
            </h2>
        </div>
        <div class="list-group-item list-group-item-info col-3 col-md-2">
            <input data-cat="${$("#cat-name").val()}" class="frequency form-control" placeholder="Frequency">
        </div>
        <div class="list-group-item list-group-item-danger col-3 col-md-2">
            <button data-cat="${$("#cat-name").val()}" class="delete-cat btn btn-outline-danger btn-light">Delete</button>
        </div>
    </div>;`
    $("#categories").append($(html));

}

$(document).on("click", ".delete-cat", deleteCat);
function deleteCat(event) {
    let cat = $(this).attr("data-cat");
    console.log(cat);
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


    console.log(sum);
    console.log("rand num: " + randNum);
    console.log(chosenCat);
}