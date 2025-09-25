import roadster from "../types/roadster.svg";
import cabriolet from "../types/cabriolet.svg";
import superType from "../types/superType.svg";
import hatchback from "../types/hatchback.svg";
import micro from "../types/micro.svg";
import station from "../types/station.svg";
import sedan from "../types/sedan.svg";
import muscle from "../types/muscle.svg";
import sports from "../types/sports.svg";
import targa from "../types/targa.svg";
import convertible from "../types/convertible.svg";
import coupe from "../types/coupe.svg";
import hybird from "../types/hybird.svg";
import suv from "../types/suv.svg";
import truck from "../types/suv.svg";
import van from "../types/van.svg";

import fuelIcon from "../specs/fuelIcon.svg";
import hybirdCar from "../specs/hybird.svg";
import electric from "../specs/electric.svg";

import auto from "../specs/auto.svg";
import menual from "../specs/manual.svg";

import door from "../specs/door.svg";

import hp from "../specs/hp.svg";

import cc from "../specs/cc.svg";
import wheel from "../specs/wheel.svg";

import g1 from "../../../images/g1.png";
import g2 from "../../../images/g2.png";
import g3 from "../../../images/g3.png";
import g4 from "../../../images/g4.png";

import suvType from '../types/suvType.svg';
import sedanType from '../types/sedanType.svg';
import hatchbackType from '../types/hatchbackType.svg';
import coupeType from '../types/coupeType.svg';
import hybirdType from '../types/hybirdType.svg';
import reviewBoyImg from '../types/reviewBoyImg.png';
import reviewGirlImg from '../types/reviewGirlImg.png';

export const bodyTypes = [
  { titleValue: "Roadster", image: roadster, isChecked: false },
  { titleValue: "Cabriolet", image: cabriolet, isChecked: false },
  { titleValue: "Super", image: superType, isChecked: false },
  { titleValue: "Hatchback", image: hatchback, isChecked: false },
  { titleValue: "Micro", image: micro, isChecked: false },
  { titleValue: "Station", image: station, isChecked: false },
  { titleValue: "Sedan", image: sedan, isChecked: false },
  { titleValue: "Muscle", image: muscle, isChecked: false },
  { titleValue: "Sports", image: sports, isChecked: false },
  { titleValue: "Targa", image: targa, isChecked: false },
  { titleValue: "Convertible", image: convertible, isChecked: false },
  { titleValue: "Coupe", image: coupe, isChecked: false },
  { titleValue: "Hybrid", image: hybird, isChecked: false },
  { titleValue: "SUV", image: suv, isChecked: false },
  { titleValue: "Pickup", image: truck, isChecked: false },
  { titleValue: "Van", image: van, isChecked: false },
];

export const regionalSpecs = [
  { titleValue: "GCC", isChecked: false },
  { titleValue: "American", isChecked: false },
  { titleValue: "Canadian", isChecked: false },
  { titleValue: "European", isChecked: false },
];

export const numberOfSeats = [
  { titleValue: 2, isChecked: false },
  { titleValue: 3, isChecked: false },
  { titleValue: 4, isChecked: false },
  { titleValue: 5, isChecked: false },
  { titleValue: 6, isChecked: false },
  { titleValue: 7, isChecked: false },
];

export const fuelType = [
  { titleValue: "Petrol", image: fuelIcon, isChecked: false },
  { titleValue: "Diesel", image: fuelIcon, isChecked: false },
  { titleValue: "Hybrid", image: hybirdCar, isChecked: false },
  { titleValue: "Electric", image: electric, isChecked: false },
];

export const transmissionType = [
  { titleValue: "Manual", image: menual, isChecked: false },
  { titleValue: "Automatic", image: auto, isChecked: false },
];

export const numberOfCylinders = [
  { titleValue: 2, isChecked: false },
  { titleValue: 3, isChecked: false },
  { titleValue: 4, isChecked: false },
  { titleValue: 5, isChecked: false },
  { titleValue: 6, isChecked: false },
  { titleValue: 7, isChecked: false },
  { titleValue: 8, isChecked: false },
  { titleValue: 12, isChecked: false },
];

export const exteriorColors = [
  { titleValue: "Black", isChecked: false, category: "color" },
  { titleValue: "Blue", isChecked: false, category: "color" },
  { titleValue: "Brown", isChecked: false, category: "color" },
  { titleValue: "Purple", isChecked: false, category: "color" },
  { titleValue: "Silver", isChecked: false, category: "color" },
  { titleValue: "White", isChecked: false, category: "color" },
  { titleValue: "Orange", isChecked: false, category: "color" },
  { titleValue: "Yellow", isChecked: false, category: "color" },
  { titleValue: "Gold", isChecked: false, category: "color" },
];

export const interiorColor = [
  { titleValue: "Black", isChecked: false, category: "color" },
  { titleValue: "Blue", isChecked: false, category: "color" },
  { titleValue: "Brown", isChecked: false, category: "color" },
  { titleValue: "Purple", isChecked: false, category: "color" },
  { titleValue: "Silver", isChecked: false, category: "color" },
  { titleValue: "White", isChecked: false, category: "color" },
  { titleValue: "Orange", isChecked: false, category: "color" },
  { titleValue: "Yellow", isChecked: false, category: "color" },
  { titleValue: "Gold", isChecked: false, category: "color" },
];

export const doors = [
  { titleValue: 2, image: door, isChecked: false },
  { titleValue: 3, image: door, isChecked: false },
  { titleValue: 4, image: door, isChecked: false },
  { titleValue: 5, image: door, isChecked: false },
];

export const ownerType = [
  { titleValue: "Owner", isChecked: false },
  { titleValue: "Dealer", isChecked: false },
  { titleValue: "Dealership", isChecked: false },
];

export const warrantyType = [
  { titleValue: "Yes", isChecked: false },
  { titleValue: "No", isChecked: false },
  { titleValue: "Doesn't Apply", isChecked: false },
];

export const horsePower = [
  { titleValue: "0-99 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "100-199 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "200-299 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "300-399 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "400-499 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "500-599 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "600-699 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "700-799 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "800 HP", image: hp, isChecked: false, category: "horsepower" },
  { titleValue: "900+ HP", image: hp, isChecked: false, category: "horsepower" },
];

export const engineCapacityCC = [
  { titleValue: "0-999 CC", isChecked: false, image: cc, category: "engineCapacity" },
  { titleValue: "1000-1499 CC", isChecked: false, image: cc, category: "engineCapacity" },
  { titleValue: "1500-1999 CC", isChecked: false, image: cc, category: "engineCapacity" },
  { titleValue: "2000-2499 CC", isChecked: false, image: cc, category: "engineCapacity" },
  { titleValue: "2500+ CC", isChecked: false, image: cc, category: "engineCapacity" },
];

export const technicalFeatures = [
  { titleValue: "4 Wheel Drive", image: wheel, isChecked: false, category: "features" },
  { titleValue: "All Wheel Drive", image: wheel, isChecked: false, category: "features" },
  { titleValue: "All Wheel Steering", image: wheel, isChecked: false, category: "features" },
  { titleValue: "Anti-lock Brakes ABS", image: wheel, isChecked: false, category: "features" },
  { titleValue: "Cruise Control", image: wheel, isChecked: false, category: "features" },
  { titleValue: "Dual Exhaust", image: wheel, isChecked: false, category: "features" },
  { titleValue: "Front Airbags", image: wheel, isChecked: false, category: "features" },
  { titleValue: "Front Wheel Drive", image: wheel, isChecked: false, category: "features" },
  { titleValue: "NOS System", image: wheel, isChecked: false, category: "features" },
  { titleValue: "Rear Wheel Drive", image: wheel, isChecked: false, category: "features" },
];

export const carCondition = [
  { id: 1, titleValue: "New", isChecked: false, category: "condition" },
  { id: 2, titleValue: "Used", isChecked: false, category: "condition" },
];

export const filterGridCars = [
  { id: 1, image: g1 },
  { id: 2, image: g2 },
  { id: 3, image: g3 },
  { id: 4, image: g4 },
];

export const usersBrowseByCarType = [
  { id: 1, image: suvType, titleValue: "SUV", category: "carType" },
  { id: 2, image: sedanType, titleValue: "Sedan", category: "carType" },
  { id: 3, image: hatchbackType, titleValue: "Hatchback", category: "carType" },
  { id: 4, image: coupeType, titleValue: "Coupe", category: "carType" },
  { id: 5, image: hybirdType, titleValue: "Hybrid", category: "carType" },
];

export const customersReviews = [
  {
    id: 1,
    image: reviewBoyImg,
    customerName: "John Doe",
    customerRole: "Facebook",
    review: "Great platform! Found my dream car within days, and the process was super smooth.",
    category: "review",
  },
  {
    id: 2,
    image: reviewGirlImg,
    customerName: "Sarah Smith",
    customerRole: "Google",
    review: "Excellent experience! The search filters made it easy to narrow down my options.",
    category: "review",
  },
];

export const loanPageCustomersReviews = [
  {
    id: 1,
    image: reviewBoyImg,
    customerName: "John Doe",
    customerRole: "Facebook",
    review: "Great platform! Found my dream car within days, and the process was super smooth.",
    category: "review",
  },
  {
    id: 2,
    image: reviewGirlImg,
    customerName: "Sarah Smith",
    customerRole: "Google",
    review: "Excellent experience! The search filters made it easy to narrow down my options.",
    category: "review",
  },
  {
    id: 3,
    image: reviewBoyImg,
    customerName: "Michael Johnson",
    customerRole: "Instagram",
    review: "Loved the transparent pricing. No hidden fees and everything was straightforward.",
    category: "review",
  },
  {
    id: 4,
    image: reviewGirlImg,
    customerName: "Emily Davis",
    customerRole: "Twitter",
    review: "Customer support was fantastic. They helped me through each step of financing my car.",
    category: "review",
  },
  {
    id: 5,
    image: reviewBoyImg,
    customerName: "David Lee",
    customerRole: "LinkedIn",
    review: "I was impressed with the wide selection of vehicles. Found exactly what I needed.",
    category: "review",
  },
  {
    id: 6,
    image: reviewGirlImg,
    customerName: "Olivia Brown",
    customerRole: "YouTube",
    review: "This platform saved me so much time. The loan calculator was a game-changer!",
    category: "review",
  },
];











