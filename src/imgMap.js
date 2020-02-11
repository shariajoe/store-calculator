import image1 from "./assets/book-imgs/after-gandhi-hires.jpg";
import image2 from "./assets/book-imgs/arctic-dreams-hires.jpg";
import image3 from "./assets/book-imgs/golden-bull-hardcover-hires.jpg";
import image4 from "./assets/book-imgs/EatYourUSHistHmwk_300.jpg"; 
import image5 from "./assets/book-imgs/home-now-hires.jpg";
import image6 from "./assets/book-imgs/ink-garden-of-brother-hires.jpg"; 
import image7 from "./assets/book-imgs/little-pig-joins-the-hires.jpg";
import image8 from "./assets/book-imgs/mountain-of-mittens-hires.jpg";
import image9 from "./assets/book-imgs/presidential-pets-hires.jpg";
import image10 from "./assets/book-imgs/twinkle-twinkle-little-star-hires.jpg";
import image11 from "./assets/book-imgs/under-the-freedom-tree-hires.jpg";
import image12 from "./assets/book-imgs/unite-or-die-hires.jpg";
import image13 from "./assets/book-imgs/white-house-kids-hires.jpg";

let images = {
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13
}

function getImage(key) {
    return images[key];
}

export default getImage;