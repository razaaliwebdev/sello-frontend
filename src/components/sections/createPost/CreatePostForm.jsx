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
import LocationPicker from "../../utils/LocationPicker";

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

  const [createCar, { isLoading }] = useCreateCarMutation();

  // Initialize available models - optimized with useMemo-like logic
  useEffect(() => {
    if (!formData.make || makes.length === 0) {
      setAvailableModels(models);
      return;
    }

    const selectedMakeObj = makes.find(m => m.name === formData.make);
    if (selectedMakeObj && getModelsByMake[selectedMakeObj._id]) {
      const makeModels = getModelsByMake[selectedMakeObj._id];
      setAvailableModels(makeModels.length > 0 ? makeModels : models);
    } else {
      setAvailableModels(models);
    }
  }, [formData.make, makes, models, getModelsByMake]);

  // Initialize available years - optimized
  // Years can be independent or tied to models
  useEffect(() => {
    if (!formData.model || availableModels.length === 0) {
      // Show all years when no model is selected
      setAvailableYears(years);
      return;
    }

    const selectedModelObj = availableModels.find(m => m.name === formData.model);
    if (selectedModelObj) {
      // Filter years by model if they have parentCategory
      const modelYears = years.filter(y => {
        if (!y.parentCategory) return true; // Include independent years
        const parentId = typeof y.parentCategory === "object" ? y.parentCategory._id : y.parentCategory;
        return parentId === selectedModelObj._id;
      });
      setAvailableYears(modelYears.length > 0 ? modelYears : years);
    } else {
      setAvailableYears(years);
    }
  }, [formData.model, availableModels, years]);

  // Initialize available cities - optimized
  useEffect(() => {
    if (!formData.country || countries.length === 0) {
      setAvailableCities(cities);
      return;
    }

    const selectedCountryObj = countries.find(c => c.name === formData.country);
    if (selectedCountryObj && getCitiesByCountry[selectedCountryObj._id]) {
      const countryCities = getCitiesByCountry[selectedCountryObj._id];
      setAvailableCities(countryCities.length > 0 ? countryCities : cities);
    } else {
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
          // Filter years by model if they have parentCategory, include independent years
          const modelYears = years.filter(y => {
            if (!y.parentCategory) return true; // Include independent years
            const parentId = typeof y.parentCategory === "object" ? y.parentCategory._id : y.parentCategory;
            return parentId === selectedModelObj._id;
          });
          setAvailableYears(modelYears.length > 0 ? modelYears : years);
          // Reset year if it's not available for the new model
          if (formData.year && modelYears.length > 0 && !modelYears.find(y => y.name === formData.year.toString())) {
            setFormData((prev) => ({ ...prev, year: "" }));
          }
        } else {
          setAvailableYears(years);
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
    
    // Early validation - check images first (most common issue)
    if (!formData.images || formData.images.length === 0) {
      toast.error("Please upload at least one car image");
      return;
    }

    // Validate required fields
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
    
    const missing = requiredFields.filter((key) => {
      const value = formData[key];
      return !value || (typeof value === 'string' && value.trim() === '');
    });
    
    if (missing.length) {
      toast.error(`Missing required fields: ${missing.join(", ")}`);
      return;
    }

    // Validate price
    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price (must be greater than 0)");
      return;
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(formData.year);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear + 1) {
      toast.error(`Year must be between 1900 and ${currentYear + 1}`);
      return;
    }

    // Validate contact number
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

    // Optimize FormData construction - build in single pass
    // Add images first
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((img) => {
        if (img instanceof File) {
          data.append("images", img);
        }
      });
    }

    // Add features array
    if (defaults.features && defaults.features.length > 0) {
      defaults.features.forEach((feature) => {
        if (feature && typeof feature === 'string' && feature.trim()) {
          data.append("features[]", feature.trim());
        }
      });
    }

    // Add all other fields efficiently
    const fieldsToAppend = [
      'title', 'description', 'make', 'model', 'variant', 'year', 'condition',
      'price', 'colorExterior', 'colorInterior', 'fuelType', 'engineCapacity',
      'transmission', 'mileage', 'regionalSpec', 'bodyType', 'country', 'city',
      'location', 'sellerType', 'carDoors', 'contactNumber', 'geoLocation',
      'horsepower', 'warranty', 'numberOfCylinders', 'ownerType'
    ];

    fieldsToAppend.forEach((key) => {
      const value = defaults[key] !== undefined ? defaults[key] : formData[key];
      if (value !== null && value !== undefined && value !== '') {
        data.append(key, String(value));
      }
    });

    try {
      const res = await createCar(data).unwrap();
      
      // Show success message (may include upgrade notification)
      if (res.message && res.message.includes('upgraded')) {
        toast.success(res.message, { duration: 5000 });
      } else {
        toast.success("Car post created successfully!");
      }
      
      // Update user data if role was upgraded
      if (res.data?.user) {
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (currentUser) {
          currentUser.role = res.data.user.role;
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      }
      
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
      // Better error handling with specific messages
      const errorMessage = err?.data?.message || err?.message || "Failed to create car post";
      
      // Provide more specific error messages
      if (errorMessage.includes('validation')) {
        toast.error("Please check all required fields and try again");
      } else if (errorMessage.includes('image') || errorMessage.includes('file')) {
        toast.error("Image upload failed. Please try again with valid images");
      } else if (errorMessage.includes('unauthorized') || errorMessage.includes('auth')) {
        toast.error("Session expired. Please login again");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(errorMessage);
      }
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
          <label className="block mb-2 font-medium">Car Location *</label>
          <LocationPicker
            onLocationChange={(coords) => handleChange("geoLocation", coords)}
            initialLocation={formData.geoLocation}
          />
          {!formData.geoLocation && (
            <p className="text-xs text-gray-500 mt-2">
              Select your car's location on the map. This helps buyers find cars near them.
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-500 text-white px-4 my-5 py-2 rounded hover:bg-primary-600 transition-colors w-full text-xl shadow-lg shadow-gray-400 font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
