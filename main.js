let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

// console.log(title, price, taxes, ads, discount, total, count, category, submit);

let mood = "create";
let tmp;
//get Total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "rgb(15, 110, 0)";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}
price.onkeyup = getTotal;
taxes.onkeyup = getTotal;
ads.onkeyup = getTotal;
discount.onkeyup = getTotal;

//create procuct
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mood = "create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }
  //save local storage
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
};
//Clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// Read Data

function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id= "update">Update</button></td>
        <td><button onclick="deleteData(${i})" id= "delete">Delete</button></td>
      </tr>
    
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length != 0) {
    btnDelete.innerHTML = `
      <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}

// Delete Product

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
// Delete All

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
//update data

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  category.value = dataPro[i].category;
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  // console.log(i);
}
