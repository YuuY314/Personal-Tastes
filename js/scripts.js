const nameInput = document.querySelector("#name");
const imageInput = document.querySelector("#image");
const categoryComboBox = document.querySelector("#category");
const addBtn = document.querySelector("#add-btn");

const personalTasteCategories = document.querySelectorAll(".personal-taste-category");

let personalTastes = [];

let index = -1;

addBtn.addEventListener("click", () => {
    if(nameInput.value == "" || imageInput.value == ""){
        alert("Preencha todos os campos");
    } else if(!imageInput.value.endsWith("jpg") && !imageInput.value.endsWith("png") && !imageInput.value.endsWith("jpeg") && !imageInput.value.endsWith("webp") && !imageInput.value.endsWith("svg")){
        alert("O link da imagem precisa terminar exatemente com: .jpg / .png / .jpeg / .webp / .svg");
    } else {
        index++;
        personalTastes.push({
            name: nameInput.value,
            image: imageInput.value,
            category: categoryComboBox.value,
            id: index
        });

        nameInput.value = "";
        imageInput.value = "";

        loadPersonalTastes();
    }
});

function loadPersonalTastes(){
    personalTasteCategories.forEach(personalTasteCategory => {
        const personalTasteCards = document.querySelectorAll(".personal-taste-card");
        personalTasteCards.forEach(personalTasteCard => {
            personalTasteCard.remove();
        });
    });

    for(var i = 0; i < personalTastes.length; i++){
        const personalTasteCard = document.createElement("div");
        personalTasteCard.classList.add("personal-taste-card");
        personalTasteCard.id = personalTastes[i].id;
    
        const personalTasteImage = document.createElement("img");
        personalTasteImage.src = personalTastes[i].image;
    
        const personalTasteName = document.createElement("p");
        personalTasteName.textContent = personalTastes[i].name;
    
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.innerHTML = "<i class='fa-solid fa-xmark'>";
    
        personalTasteCard.appendChild(personalTasteImage);
        personalTasteCard.appendChild(personalTasteName);
        personalTasteCard.appendChild(removeBtn);
    
        personalTasteCategories.forEach(personalTasteCategory => {
            if(personalTastes[i].category == personalTasteCategory.id){
                personalTasteCategory.style.display = "flex";
                personalTasteCategory.appendChild(personalTasteCard);
            }
        });
    }
}

document.addEventListener("click", (e) => {
    let element = e.target;
    let parentElement = element.closest("div");

    if(element.classList.contains("remove-btn")){
        parentElement.remove();
        personalTastes = personalTastes.filter(personalTaste => personalTaste.id != parentElement.id);

        personalTasteCategories.forEach(personalTasteCategory => {
            let numChilds = personalTasteCategory.childElementCount;
            if(numChilds <= 1){
                personalTasteCategory.style.display = "none";
            }
        });
    }
});
