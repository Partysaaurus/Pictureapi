const auth = "563492ad6f9170000100000154c6150e5adb4cbba16e23de981d17cd";
const next = document.querySelector(".next");
const input = document.querySelector("input");
const searchButton = document.querySelector(".searchbutton");

let pagenr = 1;
let search = false;
let query = "";

input.addEventListener("input", (e) => {
    e.preventDefault();
    query = e.target.value;

});

async function CuratedPhotos(pagenr) {
    const data = await fetch(
        `https://api.pexels.com/v1/curated?per_page=50&page=${pagenr}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth,
            },

        }
    );
    const result = await data.json();
    result.photos.forEach((photo) => {
        const pic = document.createElement("div");
        pic.innerHTML = `<img src=${photo.src.large}
        <p>Photo : ${photo.photographer}</p>
        <a href=${photo.src.large}>Download</a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}
async function SearchPhotos(query, pagenr) {
    const data = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=50&page=${pagenr}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth,
            },

        }
    );
}
searchButton.addEventListener("click", () => {
    if (input.value === "") return;
    clear();
    search = true;
    SearchPhotos(query, pagenr);
    pagenr++;
});
function clear() {
    input.value = "";
    document.querySelector(".gallery").innerHTML = "";
    pagenr = 1;
}
;

CuratedPhotos(pagenr);




