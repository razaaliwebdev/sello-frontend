import roadster from '../types/roadster.svg';
import cabriolet from '../types/cabriolet.svg';
import superType from '../types/superType.svg';
import hatchback from '../types/hatchback.svg';
import micro from '../types/micro.svg';
import station from '../types/station.svg';
import sedan from '../types/sedan.svg'
import muscle from '../types/muscle.svg';
import sports from '../types/sports.svg';
import targa from '../types/targa.svg';
import convertible from '../types/convertible.svg';
import coupe from '../types/coupe.svg';
import hybird from '../types/hybird.svg';
import suv from '../types/suv.svg';
import truck from '../types/suv.svg';
import van from '../types/van.svg';

import fuelIcon from '../specs/fuelIcon.svg';
import hybirdCar from '../specs/hybird.svg';
import electric from '../specs/electric.svg';

import auto from '../specs/auto.svg';
import menual from '../specs/manual.svg';

import door from '../specs/door.svg';


export const bodyTypes = [
    {
        titleValue: 'Roadster',
        image: roadster,
        isChecked: false
    },
    {
        titleValue: 'Cabriolet',
        image: cabriolet,
        isChecked: false
    },
    {
        titleValue: 'Super',
        image: superType,
        isChecked: false
    },
    {
        titleValue: 'Hatchback',
        image: hatchback,
        isChecked: false
    },
    {
        titleValue: 'Micro',
        image: micro,
        isChecked: false
    },
    {
        titleValue: 'Station',
        image: station,
        isChecked: false
    },
    {
        titleValue: 'Sedan',
        image: sedan,
        isChecked: false
    },
    {
        titleValue: 'Muscle',
        image: muscle,
        isChecked: false
    },
    {
        titleValue: 'Sports',
        image: sports,
        isChecked: false
    },
    {
        titleValue: 'Targa',
        image: targa,
        isChecked: false
    },
    {
        titleValue: 'Convertible',
        image: convertible,
        isChecked: false
    },
    {
        titleValue: 'Coupe',
        image: coupe,
        isChecked: false
    },
    {
        titleValue: 'Hybird',
        image: hybird,
        isChecked: false
    },
    {
        titleValue: 'SUV',
        image: suv,
        isChecked: false
    },
    {
        titleValue: 'Truck',
        image: truck,
        isChecked: false
    },
    {
        titleValue: 'Van',
        image: van,
        isChecked: false
    },
];

export const regionalSpecs = [
    {
        titleValue: 'GCC',
        isChecked: false
    },
    {
        titleValue: "American",
        isChecked: false
    },
    {
        titleValue: "Canadian",
        isChecked: false
    },
    {
        titleValue: "European",
        isChecked: false
    }
];

export const numberOfSeats = [
    {
        titleValue: 2,
        isChecked: false
    },
    {
        titleValue: 3,
        isChecked: false
    },
    {
        titleValue: 4,
        isChecked: false
    },
    {
        titleValue: 5,
        isChecked: false
    },
    {
        titleValue: 6,
        isChecked: false
    },
    {
        titleValue: 7,
        isChecked: false
    }
];

export const fuelType = [
    {
        titleValue: "Petrol",
        image: fuelIcon,
        isChecked: false
    }, {
        titleValue: "Diesel",
        image: fuelIcon,
        isChecked: false
    },
    {
        titleValue: "Hybird",
        image: hybirdCar,
        isChecked: false
    },
    {
        titleValue: "Electric",
        image: electric,
        isChecked: false
    }
];

export const transmissionType = [
    {
        titleValue: "Manual",
        image: menual,
        isChecked: false
    },
    {
        titleValue: "Automatic",
        image: auto,
        isChecked: false
    }
];

export const numberOfCylinders = [
    {
        titleValue: 2,
        isChecked: false
    },
    {
        titleValue: 3,
        isChecked: false
    },
    {
        titleValue: 4,
        isChecked: false
    },
    {
        titleValue: 5,
        isChecked: false
    },
    {
        titleValue: 6,
        isChecked: false
    },
    {
        titleValue: 7,
        isChecked: false
    },
    {
        titleValue: 8,
        isChecked: false
    },
    {
        titleValue: 8 + "+",
        isChecked: false
    }
]

export const exteriorColors = [
    {
        titleValue: "black",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "blue",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "Brown",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "purple",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "silver",
        isChecked: false,
        category: "color",
    },
    {
        titleValue: "white",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "orange",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "yellow",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "gold",
        isChecked: false,
        category: "color"
    },
];

export const interiorColor = [
    {
        titleValue: "black",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "blue",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "Brown",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "purple",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "silver",
        isChecked: false,
        category: "color",
    },
    {
        titleValue: "white",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "orange",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "yellow",
        isChecked: false,
        category: "color"
    },
    {
        titleValue: "gold",
        isChecked: false,
        category: "color"
    },
];

export const doors = [
    {
        titleValue: 2,
        image: door,
        isChecked: false
    },
    {
        titleValue: 3,
        image: door,
        isChecked: false
    },
    {
        titleValue: 4,
        image: door,
        isChecked: false
    },
    {
        titleValue: 5,
        image: door,
        isChecked: false
    },
    {
        titleValue: 5 + "+",
        image: door,
        isChecked: false
    }
]

export const ownerType = [
    {
        titleValue: "Owner",
        isChecked: false
    },
    {
        titleValue: "Dealer",
        isChecked: false
    },
    {
        titleValue: "Dealership"
    }
]