getCats = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
      loadButtons(data.categories);
    });
};

loadButtons = (catArray) => {
  const btn_container = document.getElementById("btn_container");
  catArray.forEach((element) => {
    const btn_div = document.createElement("div");
    btn_div.classList = "flex justify-center";
    btn_div.innerHTML = `
    <button id="btn-${element.category}" onclick="getSpecialArray('${element.category}')" class="cat_btn flex items-center border-2 border-gray-300 px-10 py-2 rounded-xl">
    <img src="${element.category_icon}">
    <p class="text-2xl font-bold">${element.category}</p>
    </button>
    `;
    btn_container.append(btn_div);
  });
};

getAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      displayPets(data.pets);
    });
};

displayPets = (pets) => {
  const container = document.getElementById("card_container");
  container.innerHTML = ``;
  if (pets.length == 0) {
    container.classList.remove("grid");
    container.innerHTML = `
    <div class="text-center flex flex-col items-center">
    <img class="h-48" src="./images/error.webp">
    <h1 class="text-3xl font-bold">No Information Available</h1>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    
    `;
    return;
  } else {
    container.classList.add("grid");
  }
  pets.forEach((element) => {
    let div = document.createElement("div");
    div.classList =
      "card card-compact bg-base-100 w-full border-2 border-gray-200";
    div.innerHTML = `
            <figure>
              <img
                class="p-2 rounded-2xl"
                src="${element.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${element.pet_name} </h2>
              <ul>
                <li>Breed: ${
                  element.breed == null || undefined
                    ? "Not Available"
                    : element.breed
                }</li>
                <li>Birth: ${
                  element.date_of_birth == null || undefined
                    ? "Not Available"
                    : element.date_of_birth
                } </li>
                <li>Gender:  ${
                  element.gender == null || undefined
                    ? "Not Available"
                    : element.gender
                }</li>
                <li>Price:  ${
                  element.price == null || undefined
                    ? "Not Available"
                    : element.price
                }</li>
              </ul>
              <hr />
              <div class="card-actions justify-around">
                <button onclick = "appendImage(${element.petId})"
                  class="border-gray-200 border-2 p-1 rounded-lg text-green-700 font-bold"
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABCElEQVR4nO2UsWoCQRCGvwTrdJZRi0Bs0gesBQsfII2vYJfSN7CxkJAQENHUaVLYWOQFfAetbBKSQiRwajj4D5Yld7fn7UECGViY2Zv5v2GZG/hltgbegAlQ9y1+ARyM8wlc+QR0JDwHnuS/+ATcS/QWOJP/4Uu8CwQSbQBl+e95hUvAUGJ7oAecAE3dLfKIh88wk9AWuDG+9XU/yCIYTUdkz4rD0bw27k+BpTVR5lkBLRfAl+KalddOEDchqQA7drXYuj8BOFfNpijAnWqmRQAqGowgbhHmBTwoP9y0+AZUje4viwA8KneclHQsoOrS/U+CK4c/1jyjtE5sQMsRsgNetcL/jcz2DT1MixkpDKX3AAAAAElFTkSuQmCC"
                  />
                </button>
                <button id = "adp-${element.petId}" onclick="adopt(${
      element.petId
    })"
                  class="border-gray-200 border-2 p-1 rounded-lg text-green-700 font-bold adp"
                >
                  Adopt
                </button>
                <button onclick = "loadDetails(${element.petId})"
                  class="border-gray-200 border-2 p-1 rounded-lg text-green-700 font-bold"
                >
                  Details
                </button>
              </div>
            </div>
    `;
    container.append(div);
  });
};

loadDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayDetails(data.petData);
    });
};

displayDetails = (element) => {
  const modalDetails = document.getElementById("modalContent");
  modalDetails.innerHTML = `
  <img src = "${element.image}" width = "100%">
  <h2 class="card-title">${element.pet_name} </h2>
              <div><ul>
                <li>Breed: ${
                  element.breed == null || undefined
                    ? "Not Available"
                    : element.breed
                }</li>
                <li>Birth: ${
                  element.date_of_birth == null || undefined
                    ? "Not Available"
                    : element.date_of_birth
                } </li>
                <li>Gender:  ${
                  element.gender == null || undefined
                    ? "Not Available"
                    : element.gender
                }</li>
                <li>Price:  ${
                  element.price == null || undefined
                    ? "Not Available"
                    : element.price
                }</li>
                <li>Vaccinated Status:  ${
                  element.vaccinated_status == null || undefined
                    ? "Not Available"
                    : element.vaccinated_status
                }</li>
              </ul></div>
              <h2 class="card-title">Pet Details</h2>
              <p>${element.pet_details}</p>
  
  `;
  document.getElementById("showModalData").click();
};

removeActive = () => {
  let buttons = document.getElementsByClassName("cat_btn");
  for (button of buttons) {
    button.classList.remove("active");
  }
};

getSpecialArray = (category) => {
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("grid_container").classList.add("hidden");
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        removeActive();
        let btn = document.getElementById(`btn-${category}`);
        btn.classList.add("active");
        displayPets(data.data);
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("grid_container").classList.remove("hidden");
      });
  }, 1500);
};

appendImage = (id) => {
  let img_container = document.getElementById("img_container");
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      data.pets.forEach((element) => {
        if (element.petId == id) {
          let div = document.createElement("div");
          div.innerHTML = `
          <img class="rounded-xl" src = "${element.image}">
          `;
          img_container.append(div);
        }
      });
    });
};

adopt = (id) => {
  let btn = document.getElementById(`adp-${id}`);
  document.getElementById("showAdopted").click();
  let num = 3;
  const clockID = setInterval(() => {
    if (num == 1) {
      clearInterval(clockID);
      document.getElementById("close").click();
    }
    console.log(num--);
    document.getElementById("countdown").innerText = `${num}`;
  }, 1000);

  btn.innerText = "Adopted";
  document.getElementById("countdown").innerText = "3";
};

getAllPets();
getCats();
