const imageContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");

//flags
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

//unsplash api url
let count = 5;
const apiKey = "f1xbgA4WlnDwZapPxqCG3S0YIxcyJe_Db33p3D6FgOw";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//helper setAttribute function to follow dry method
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//imageloaded function
function imageLoaded() {
  imagesLoaded += 1;
  if (imagesLoaded == totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
  }
}

//displayPhoto function
function displayPhoto() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("totalImages: ", totalImages);
  photosArray.forEach((photo) => {
    //create the <a> element
    const link = document.createElement("a");
    // link.setAttribute("href", photo.links.html);
    // link.setAttribute("target", "_blank");
    setAttributes(link, {
      href: photo.links.html,
      target: "_blank",
    });
    //craete the <img> element
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
    //now adding all things together and putting into image container
    link.appendChild(img);
    imageContainer.appendChild(link);
  });
}

//GET photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhoto();
  } catch (error) {
    console.log(error);
  }
}

//load more photos when scrolled near the end of the photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//On Load
getPhotos();
