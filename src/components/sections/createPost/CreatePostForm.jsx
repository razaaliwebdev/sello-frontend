import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCreateCarMutation } from "../../../redux/services/api";

import ImagesUpload from "../createPost/ImagesUpload";
import Input from "../../utils/filter/Input";
import BodyTypes from "../../utils/filter/BodyTypes";
import RegionalSpecs from "../../utils/filter/RegionalSpecs";
import FuelSpecs from "../../utils/filter/FuelSpecs";
import TransmissionSpecs from "../../utils/filter/TransmissionSpecs";
import CylindersSpecs from "../../utils/filter/CylindersSpecs";
import ExteriorColor from "../../utils/filter/ExteriorColor";
import InteriorColor from "../../utils/filter/InteriorColor";
import DoorsSpecs from "../../utils/filter/DoorsSpecs";
import OwnerTypeSpecs from "../../utils/filter/OwnerTypeSpecs";
import WarrantyType from "../../utils/filter/WarrantyType";
import HorsePowerSpecs from "../../utils/filter/HorsePowerSpecs";
import EngineCapacitySpecs from "../../utils/filter/EngineCapacitySpecs";
import TechnicalFeaturesSpecs from "../../utils/filter/TechnicalFeaturesSpecs";
import CarCondition from "../../utils/filter/CarCondition";
import { images } from "../../../assets/assets";
import { useCarCategories } from "../../../hooks/useCarCategories";

const CreatePostForm = () => {
  const navigate = useNavigate();
  const { makes, models, getModelsByMake, years, countries, cities, getCitiesByCountry, isLoading: categoriesLoading } = useCarCategories();
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [availableModels, setAvailableModels] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    make: "",
    model: "",
    variant: "",
    year: "",
    condition: "",
    price: "",
    colorExterior: "",
    colorInterior: "",
    fuelType: "",
    engineCapacity: "",
    transmission: "",
    mileage: "",
    features: [],
    regionalSpec: "",
    bodyType: "",
    country: "",
    city: "",
    location: "",
    sellerType: "",
    carDoors: "",
    contactNumber: "",
    geoLocation: "",
    horsepower: "",
    warranty: "",
    numberOfCylinders: "",
    ownerType: "",
    images: [],
  });
  const [locationName, setLocationName] = useState("");
  const [isCapturingLocation, setIsCapturingLocation] = useState(false);

  const [createCar, { isLoading }] = useCreateCarMutation();

  // Initialize available models - show all if no make selected, filtered if make selected
  useEffect(() => {
    if (formData.make && makes.length > 0) {
      const selectedMakeObj = makes.find(m => m.name === formData.make);
      if (selectedMakeObj) {
        const makeModels = getModelsByMake[selectedMakeObj._id] || [];
        setAvailableModels(makeModels);
      } else {
        // If make not found, show all models
        setAvailableModels(models);
      }
    } else {
      // Show all models when no make is selected
      setAvailableModels(models);
    }
  }, [formData.make, makes, models, getModelsByMake]);

  // Initialize available years when model is selected or data loads
  useEffect(() => {
    if (formData.model && availableModels.length > 0) {
      const selectedModelObj = availableModels.find(m => m.name === formData.model);
      if (selectedModelObj) {
        const modelYears = years.filter(y => {
          const parentId = typeof y.parentCategory === "object" ? y.parentCategory._id : y.parentCategory;
          return parentId === selectedModelObj._id;
        });
        setAvailableYears(modelYears);
      } else {
        // If no model selected, show all years
        setAvailableYears(years);
      }
    } else {
      // Show all years if no model selected
      setAvailableYears(years);
    }
  }, [formData.model, availableModels, years]);

  // Initialize available cities - show all if no country selected, filtered if country selected
  useEffect(() => {
    if (formData.country && countries.length > 0) {
      const selectedCountryObj = countries.find(c => c.name === formData.country);
      if (selectedCountryObj) {
        const countryCities = getCitiesByCountry[selectedCountryObj._id] || [];
        setAvailableCities(countryCities.length > 0 ? countryCities : cities);
      } else {
        // If country not found, show all cities
        setAvailableCities(cities);
      }
    } else {
      // Show all cities when no country is selected
      setAvailableCities(cities);
    }
  }, [formData.country, countries, cities, getCitiesByCountry]);

  const handleChange = (field, value) => {
    // Handle features to ensure it's a flat array
    if (field === "features") {
      const flatValue = Array.isArray(value)
        ? value.flat().filter((item) => typeof item === "string" && item.trim())
        : typeof value === "string" && value.trim()
        ? value.split(",").map((item) => item.trim())
        : [];
      setFormData((prev) => ({ ...prev, [field]: flatValue }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
      
      // When make changes, update available models
      if (field === "make") {
        setSelectedMake(value);
        if (value) {
          const selectedMakeObj = makes.find(m => m.name === value);
          if (selectedMakeObj) {
            const makeModels = getModelsByMake[selectedMakeObj._id] || [];
            setAvailableModels(makeModels.length > 0 ? makeModels : models);
            // Reset model if it's not available for the new make
            if (formData.model && makeModels.length > 0 && !makeModels.find(m => m.name === formData.model)) {
              setFormData((prev) => ({ ...prev, model: "" }));
            }
          } else {
            setAvailableModels(models);
          }
        } else {
          // Show all models when make is cleared
          setAvailableModels(models);
        }
      }
      
      // When model changes, update available years
      if (field === "model") {
        const selectedModelObj = availableModels.find(m => m.name === value);
        if (selectedModelObj) {
          const modelYears = years.filter(y => {
            const parentId = typeof y.parentCategory === "object" ? y.parentCategory._id : y.parentCategory;
            return parentId === selectedModelObj._id;
          });
          setAvailableYears(modelYears);
          // Reset year if it's not available for the new model
          if (formData.year && !modelYears.find(y => y.name === formData.year.toString())) {
            setFormData((prev) => ({ ...prev, year: "" }));
          }
        }
      }
      
      // When country changes, update available cities
      if (field === "country") {
        setSelectedCountry(value);
        if (value) {
          const selectedCountryObj = countries.find(c => c.name === value);
          if (selectedCountryObj) {
            const countryCities = getCitiesByCountry[selectedCountryObj._id] || [];
            setAvailableCities(countryCities.length > 0 ? countryCities : cities);
            // Reset city if it's not available for the new country
            if (formData.city && countryCities.length > 0 && !countryCities.find(c => c.name === formData.city)) {
              setFormData((prev) => ({ ...prev, city: "" }));
            }
          } else {
            setAvailableCities(cities);
          }
        } else {
          // Show all cities when country is cleared
          setAvailableCities(cities);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "title",
      "make",
      "model",
      "year",
      "condition",
      "price",
      "fuelType",
      "engineCapacity",
      "transmission",
      "regionalSpec",
      "bodyType",
      "city",
      "contactNumber",
      "sellerType",
      "warranty",
      "ownerType",
      "geoLocation",
    ];
    const missing = requiredFields.filter((key) => !formData[key]);
    if (missing.length) {
      toast.error(`Missing required fields: ${missing.join(", ")}`);
      return;
    }
    if (!/^\+?\d{9,15}$/.test(formData.contactNumber)) {
      toast.error("Invalid contact number. Must be 9-15 digits.");
      return;
    }
    let parsedGeoLocation;
    try {
      parsedGeoLocation = formData.geoLocation
        ? JSON.parse(formData.geoLocation)
        : null;
      if (
        !parsedGeoLocation ||
        !Array.isArray(parsedGeoLocation) ||
        parsedGeoLocation.length !== 2 ||
        parsedGeoLocation[0] === 0 ||
        parsedGeoLocation[1] === 0
      ) {
        toast.error("Invalid geoLocation. Please capture valid coordinates.");
        return;
      }
    } catch {
      toast.error("Invalid geoLocation format. Use [longitude, latitude].");
      return;
    }

    const data = new FormData();
    const defaults = {
      variant: formData.variant || "N/A",
      colorExterior: formData.colorExterior || "N/A",
      colorInterior: formData.colorInterior || "N/A",
      horsepower: formData.horsepower || "N/A",
      mileage: formData.mileage || "0",
      carDoors: formData.carDoors || "4",
      numberOfCylinders: formData.numberOfCylinders || "4",
      location: formData.location || "",
      description: formData.description || "",
      features: formData.features.length ? formData.features : [],
    };

    console.log("formData.features before submission:", formData.features);

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((img) => data.append("images", img));
      } else if (key === "features") {
        // Append each feature individually to FormData
        defaults.features.forEach((feature) =>
          data.append("features[]", feature)
        );
      } else {
        data.append(
          key,
          defaults[key] !== undefined ? defaults[key] : formData[key]
        );
      }
    });

    try {
      const res = await createCar(data).unwrap();
      toast.success("Car post created successfully!");
      setFormData({
        title: "",
        description: "",
        make: "",
        model: "",
        variant: "",
        year: "",
        condition: "",
        price: "",
        colorExterior: "",
        colorInterior: "",
        fuelType: "",
        engineCapacity: "",
        transmission: "",
        mileage: "",
        features: [],
        regionalSpec: "",
        bodyType: "",
        country: "",
        city: "",
        location: "",
        sellerType: "",
        carDoors: "",
        contactNumber: "",
        geoLocation: "",
        horsepower: "",
        warranty: "",
        numberOfCylinders: "",
        ownerType: "",
        images: [],
      });
      setSelectedMake("");
      setSelectedCountry("");
      setAvailableModels([]);
      setAvailableYears([]);
      setAvailableCities([]);
      navigate(`/my-listings`);
    } catch (err) {
      console.error("Create Car Error:", err);
      toast.error(err?.data?.message || "Failed to create car post");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 md:px-20 py-12"
      encType="multipart/form-data"
    >
      <h1 className="text-center md:text-3xl font-semibold">Post</h1>
      <div className="border-[1px] border-gray-700 rounded-md px-5 py-6 my-5">
        <div className="my-2">
          <ImagesUpload
            onImagesChange={(files) => handleChange("images", files)}
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Title</label>
          <Input
            inputType="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g., 2017 Toyota Fortuner V8"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe the car..."
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="price mt-5 mb-2">
          <label className="block mb-1">Price</label>
          <Input
            inputType="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="flex gap-6 my-2 w-full items-center">
          <div className="w-1/2">
            <label className="block mb-1">Country</label>
            <select
              value={formData.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              disabled={categoriesLoading}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country._id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-1">City</label>
            <select
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading 
                  ? "Loading..." 
                  : availableCities.length === 0 
                    ? "No cities available" 
                    : formData.country
                      ? "Select City"
                      : "Select City (or select Country to filter)"}
              </option>
              {availableCities.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Contact Number</label>
          <Input
            inputType="tel"
            value={formData.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
            placeholder="e.g., +971532345332"
            required
          />
        </div>

        <div className="flex gap-6 my-2 w-full items-center">
          <div className="w-1/2">
            <label className="block mb-1">Car Make *</label>
            <select
              value={formData.make}
              onChange={(e) => handleChange("make", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              disabled={categoriesLoading}
            >
              <option value="">Select Make</option>
              {makes.map((make) => (
                <option key={make._id} value={make.name}>
                  {make.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Car Model *</label>
            <select
              value={formData.model}
              onChange={(e) => handleChange("model", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              disabled={categoriesLoading}
            >
              <option value="">
                {categoriesLoading 
                  ? "Loading..." 
                  : availableModels.length === 0 
                    ? "No models available" 
                    : formData.make
                      ? "Select Model"
                      : "Select Model (or select Make to filter)"}
              </option>
              {availableModels.map((model) => (
                <option key={model._id} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-2">
          <label className="block mb-1">Variant</label>
          <Input
            inputType="text"
            value={formData.variant}
            onChange={(e) => handleChange("variant", e.target.value)}
            placeholder="e.g., V8"
          />
        </div>

        <div className="flex gap-6 my-2 w-full items-center">
          <div className="w-1/2">
            <label className="block mb-1">Year *</label>
            <select
              value={formData.year}
              onChange={(e) => handleChange("year", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              disabled={categoriesLoading}
            >
              <option value="">Select Year</option>
              {availableYears.length > 0 ? (
                availableYears.map((year) => (
                  <option key={year._id} value={year.name}>
                    {year.name}
                  </option>
                ))
              ) : (
                // Fallback: show years from 1990 to current year if no categories
                Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })
              )}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Mileage (km)</label>
            <Input
              inputType="number"
              value={formData.mileage}
              onChange={(e) => handleChange("mileage", e.target.value)}
              placeholder="e.g., 50000"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Body Type</label>
          <BodyTypes
            onBodyTypeChange={(val) => handleChange("bodyType", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Regional Spec</label>
          <RegionalSpecs
            onChange={(val) => handleChange("regionalSpec", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Fuel Type</label>
          <FuelSpecs onChange={(val) => handleChange("fuelType", val)} />
        </div>

        <div>
          <label className="block mb-1">Transmission</label>
          <TransmissionSpecs
            onChange={(val) => handleChange("transmission", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Number of Cylinders</label>
          <CylindersSpecs
            onChange={(val) => handleChange("numberOfCylinders", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Exterior Color</label>
          <ExteriorColor
            onChange={(val) => handleChange("colorExterior", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Interior Color</label>
          <InteriorColor
            onChange={(val) => handleChange("colorInterior", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Car Doors</label>
          <DoorsSpecs onChange={(val) => handleChange("carDoors", val)} />
        </div>

        <div>
          <label className="block mb-1">Owner Type</label>
          <OwnerTypeSpecs onChange={(val) => handleChange("ownerType", val)} />
        </div>

        <div>
          <label className="block mb-1">Warranty</label>
          <WarrantyType onChange={(val) => handleChange("warranty", val)} />
        </div>

        <div>
          <label className="block mb-1">Seller Type</label>
          <select
            value={formData.sellerType}
            onChange={(e) => handleChange("sellerType", e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select</option>
            <option value="individual">Individual</option>
            <option value="dealer">Dealer</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Horsepower</label>
          <HorsePowerSpecs
            onChange={(val) => handleChange("horsepower", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Engine Capacity</label>
          <EngineCapacitySpecs
            onChange={(val) => handleChange("engineCapacity", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Features</label>
          <TechnicalFeaturesSpecs
            onChange={(val) => handleChange("features", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Condition</label>
          <CarCondition onChange={(val) => handleChange("condition", val)} />
        </div>

        <div className="mb-2">
          <label className="block mb-1">Address</label>
          <Input
            inputType="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Enter address"
          />
        </div>

        <div className="my-4">
          <label className="block mb-1">Current Location</label>
          <button
            type="button"
            onClick={async () => {
              if (!navigator.geolocation) {
                toast.error("Geolocation is not supported by your browser.");
                return;
              }
              
              setIsCapturingLocation(true);
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                  try {
                    const longitude = position.coords.longitude;
                    const latitude = position.coords.latitude;
                    const coords = `[${longitude}, ${latitude}]`;
                    handleChange("geoLocation", coords);
                    
                    // Try to get location name using reverse geocoding
                    try {
                      const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
                      if (apiKey) {
                        const response = await fetch(
                          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
                        );
                        const data = await response.json();
                        if (data.status === "OK" && data.results.length > 0) {
                          const address = data.results[0].formatted_address;
                          setLocationName(address);
                          toast.success(`Location captured: ${address}`);
                        } else {
                          setLocationName(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                          toast.success("Location captured!");
                        }
                      } else {
                        setLocationName(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                        toast.success("Location captured!");
                      }
                    } catch (geocodeError) {
                      setLocationName(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                      toast.success("Location captured!");
                    }
                  } catch (error) {
                    toast.error("Failed to process location: " + error.message);
                  } finally {
                    setIsCapturingLocation(false);
                  }
                },
                (error) => {
                  setIsCapturingLocation(false);
                  let errorMsg = "Failed to get location. ";
                  switch (error.code) {
                    case error.PERMISSION_DENIED:
                      errorMsg += "Please allow location access.";
                      break;
                    case error.POSITION_UNAVAILABLE:
                      errorMsg += "Location information unavailable.";
                      break;
                    case error.TIMEOUT:
                      errorMsg += "Location request timed out.";
                      break;
                    default:
                      errorMsg += error.message;
                  }
                  toast.error(errorMsg);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 0
                }
              );
            }}
            disabled={isCapturingLocation}
            className={`w-full flex items-center justify-between px-5 py-3 border-2 border-gray-300 rounded-lg my-2 transition-all ${
              formData.geoLocation 
                ? "border-green-500 bg-green-50" 
                : "border-gray-300 hover:border-primary-500 hover:bg-gray-50"
            } ${isCapturingLocation ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center gap-3">
              <img
                src={images.location}
                className={`w-6 h-6 ${formData.geoLocation ? "text-green-600" : ""}`}
                alt="location icon"
              />
              <div className="text-left">
                <div className={`text-sm font-medium ${formData.geoLocation ? "text-green-700" : "text-gray-700"}`}>
                  {isCapturingLocation 
                    ? "Capturing location..." 
                    : locationName || formData.geoLocation 
                      ? (locationName || "Location captured") 
                      : "Click to capture your current location"}
                </div>
                {formData.geoLocation && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    {formData.geoLocation}
                  </div>
                )}
              </div>
            </div>
            {isCapturingLocation ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
            ) : formData.geoLocation ? (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
          {!formData.geoLocation && (
            <p className="text-xs text-gray-500 mt-1">
              We need your location to help buyers find your car
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-500 px-4 my-5 py-2 rounded hover:opacity-90 transition w-full text-xl shadow-lg shadow-gray-400 font-semibold disabled:opacity-50"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
