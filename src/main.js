import { searchImage } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import Simplelightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const moreButton = document.querySelector(".more-btn");

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async event => {
    event.preventDefault();

    query = event.target.elements.query.value.trim();

    if (!query) {
        iziToast.info({
            title: 'Note',
            message: 'Please enter your search',
        });
        return;
    }

    gallery.innerHTML = "";
    page = 1;
    totalHits = 0;
    loader.style.display = "block";

    try {
        const data = await searchImage(query, page);
        totalHits = data.totalHits;
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
                if (data.hits.length < totalHits) {
                    moreButton.style.display = "block";
                }
            }
        } catch(error) {
            iziToast.error({
                title: 'Error',
                message: 'Please try again later!',
            });
            console.log(error);
        } finally {
            loader.style.display = "none";
        };
});




moreButton.addEventListener("click", async () => {
    page += 1;
    loader.style.display = "block";
    try {
        const data = await searchImage(query, page);
        const markup = imagesTemplate(data.hits);
        gallery.insertAdjacentHTML('beforeend', markup);

        let lightbox = new Simplelightbox(".gallery a", {
            captionsData: "alt",
        });
        lightbox.refresh();

        const card = document.querySelector(".gallery-item");
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: cardHeight * 2,
            behavior: 'smooth'
        });

        if (gallery.children.length >= totalHits) {
            moreButton.style.display = "none";
            iziToast.info({
            title: 'Note',
            message: 'Please enter your search',
        });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Please try again later!',
        });
        console.log(error);
    } finally {
        loader.style.display = "none";
    }
});