import { searchImage } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import Simplelightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");


form.addEventListener('submit', event => {
    event.preventDefault();

    const query = event.target.elements.query.value.trim();

    if (!query) {
        iziToast.info({
            title: 'Note',
            message: 'Please enter your search',
        });
        return;
    }

    gallery.innerHTML = "";
    loader.style.display = "block";

    searchImage(query)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
            } else {
                const markup = imagesTemplate(data.hits);
                gallery.innerHTML = markup;
                let lightbox = new Simplelightbox(".gallery a", {
                    captionsData: "alt",
                });
                lightbox.refresh();
            }
        })
        .catch(error => {
            iziToast.error({
                title: 'Error',
                message: 'Please try again later!',
            });
            console.log(error);
        })
        .finally(() => {
            loader.style.display = "none";
        });
});
