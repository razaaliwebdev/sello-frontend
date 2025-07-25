import searchIcon from './images/searchIcon.png';
import illustration from './images/illustration.png';
import car1 from './images/car1.png';
import userIcon from './images/userIcon.png';
import google from './images/google.webp';
import verified from './images/verified.png';
import logo from './images/logo.svg';
import headerLogo from './images/headerLogo.svg';
import bell from "./images/bell.svg";
import car from './images/car.jpg';
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';
import car4 from './images/car4.jpg';
import car5 from './images/car5.jpg';
import car6 from './images/car6.jpg';
import car7 from './images/car7.jpg';
import br1 from './images/br1.svg';
import br2 from "./images/br2.svg";
import br3 from "./images/br3.svg";
import br4 from "./images/br4.svg";
import br5 from "./images/br5.svg";
import br6 from "./images/br6.svg";
import br7 from "./images/br7.svg";
import satisficationSectionImage from './images/satisficationSectionImage.png';
import why1 from './images/why1.svg';
import why2 from './images/why2.svg';
import why3 from './images/why3.svg';
import why4 from './images/why4.svg';
import transmissionIcon from './images/transmissionIcon.svg';
import fuelTypeIcon from './images/fuelTypeIcon.svg';
import milesIcon from './images/milesIcon.svg';
import audiA4 from './images/audiA4.png';
import audiA5 from './images/audiA5.png';
import mercedesBenz from './images/mercedesBenz.jpg';
import ford from './images/ford.jpg';


export const images = {
    car1,
    searchIcon,
    illustration,
    userIcon,
    google,
    verified,
    headerLogo,
    logo,
    bell,
    car5,
    car6,
    car7,
    transmissionIcon,
    fuelTypeIcon,
    milesIcon
};



// DATA

export const menuLinks = [
    {
        path: "/home",
        name: "Home"
    },
    {
        path: "/cars",
        name: "Lisgings"
    },
    {
        path: "/blog",
        name: "Blog"
    },
    {
        path: "/pages",
        name: "Pages"
    },
    {
        path: "/about",
        name: "About"
    },
    {
        path: "/contact",
        name: "Contact"
    },
]



// Hero Slides
export const heroSlides = [
    { image: car },
    { image: car2 },
    { image: car3 },
    { image: car4 },
];

// Main Brands Icons
export const brandsCategory = [
    {
        image: br1,
    },
    {
        image: br2,
    },
    {
        image: br3,
    },
    {
        image: br4,
    },
    {
        image: br5,
    },
    {
        image: br6,
    },
    {
        image: br7,
    }
];



// Clients or Satisfication
export const whyUs = {
    image: satisficationSectionImage,
    title: "Get A Fair Price For Your Car Sell To Us Today",
    description: "We are committed to providing our customers with exceptional service, competitive pricing, and wide range of.",
    whatWeOffer: [
        "We are the UK's largest provider, with more patrols in more places",
        "You get 24/7 roadside assistance",
        "We fix 4 out 5 cars at the roadside"
    ],
    ourAchievementsData: [
        {
            value: 836,
            caption: "Cars for sale"
        },
        {
            value: 738,
            caption: "Dealer Reviewss"
        },
        {
            value: 100,
            caption: "Victory per day"
        },
        {
            value: 238,
            caption: "Verified Dealer"
        }
    ],
    whyChooseUs: [
        {
            image: why1,
            title: "Exclusive Offers You Can’t Miss",
            description: "Discover unbeatable deals tailored to your budget. Our finance experts work tirelessly to bring you the best value, every time."
        },
        {
            image: why2,
            title: "Your Trusted Dealership Partner",
            description: "Built on honesty and reliability, we’ve earned the trust of thousands by delivering quality vehicles and exceptional customer care."
        },
        {
            image: why3,
            title: "Clear, Honest Pricing",
            description: "What you see is what you pay — no hidden costs, no surprises. We believe in full transparency to help you shop with confidence."
        },
        {
            image: why4,
            title: "Certified Service Expertise",
            description: "Our skilled technicians are committed to keeping your vehicle in top shape — from routine maintenance to advanced diagnostics."
        }
    ]

}

// Dummy Data for Popular Makes
export const popularMakes = [
    {
        image: audiA4,
        brand: "Audi",
        model: "A4",
        year: 2022,
        description: "2.0 D5 PowerPlus Momemtum 5dr AWD...",
        moved: 150,
        fuelType: "Diesel",
        transmission: "CVT",
        price: 120000
    },
    {
        image: audiA5,
        brand: "Audi",
        model: "A5",
        year: 2023,
        description: "2.0 D5 PowerPlus Momemtum 5dr sedan...",
        moved: 550,
        fuelType: "Petrol",
        transmission: "Automatic",
        price: 450000
    },
    {
        image: mercedesBenz,
        brand: "Mercedes-Benz",
        model: "C-Class",
        year: 2023,
        description: "C 300 AMG Line with cutting-edge tech and refined interior.",
        moved: 95,
        fuelType: "Petrol",
        transmission: "Automatic",
        price: 145000,
    },
    {
        image: ford,
        brand: "Ford",
        model: "Mustang",
        year: 2021,
        description: "5.0L V8 GT Fastback — classic muscle with modern performance.",
        moved: 200,
        fuelType: "Petrol",
        transmission: "Manual",
        price: 110000,
    },


]
