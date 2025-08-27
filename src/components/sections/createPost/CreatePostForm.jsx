

// src/components/createPost/CreatePostForm.js
import React, { useState } from "react";
import toast from "react-hot-toast";

import ImagesUpload from "../createPost/ImagesUpload";
import Input from "../../utils/filter/Input";
import BodyTypes from "../../utils/filter/BodyTypes";
import RegionalSpecs from "../../utils/filter/RegionalSpecs";
import Seats from "../../utils/filter/Seats";
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
import LocationButton from "../../utils/filter/LocationButton";

import { useCreateCarMutation } from "../../../redux/services/api";
import CarCondition from "../../utils/filter/CarCondition";

const CreatePostForm = () => {
  const [formData, setFormData] = useState({
    price: "",
    make: "",
    model: "",
    year: "",
    condition: "",
    city: "",
    contactNumber: "",
    kilometers: "",
    bodyType: "",
    regionalSpecs: "",
    seats: "",
    fuelType: "",
    transmission: "",
    cylinders: "",
    exteriorColor: "",
    interiorColor: "",
    doors: "",
    ownerType: "",
    warranty: "",
    horsePower: "",
    engineCapacity: "",
    technicalFeatures: "",
    location: "",
    images: [],
  });

  const [createCar, { isLoading }] = useCreateCarMutation();

  // generic form state updater
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ validation function
  const validateForm = () => {
    if (!formData.images.length) return "Please upload at least 1 image";
    if (!formData.price) return "Price is required";
    if (!formData.make) return "Car make is required";
    if (!formData.model) return "Car model is required";
    if (!formData.year) return "Year is required";
    if (!formData.condition) return "Please select car condition";
    if (!formData.city) return "City is required";
    if (!formData.contactNumber) return "Contact number is required";
    if (!formData.kilometers) return "Kilometers are required";
    if (!formData.bodyType) return "Please select a body type";
    if (!formData.fuelType) return "Please select a fuel type";
    if (!formData.transmission) return "Please select transmission";
    if (!formData.exteriorColor) return "Please select exterior color";
    if (!formData.interiorColor) return "Please select interior color";
    if (!formData.location) return "Location is required";

    // Validate contact number format (basic validation)
    const phoneRegex = /^[+]?[0-9\s-()]{10,}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      return "Please enter a valid contact number";
    }

    return null; // ✅ no errors
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    try {
      // Prepare FormData for file upload
      const submitData = new FormData();
      const requestData = {}; // For debugging

      // Map frontend field names to backend field names
      const fieldMappings = {
        make: 'make',
        model: 'model',
        year: 'year',
        condition: 'condition',
        price: 'price',
        exteriorColor: 'colorExterior',
        interiorColor: 'colorInterior',
        fuelType: 'fuelType',
        engineCapacity: 'engineCapacity',
        transmission: 'transmission',
        kilometers: 'mileage',
        city: 'city',
        contactNumber: 'contactNumber',
        horsePower: 'horsepower',
        warranty: 'warranty',
        regionalSpecs: 'regionalSpec',
        bodyType: 'bodyType',
        cylinders: 'numberOfCylinders',
        ownerType: 'ownerType',
        doors: 'carDoors'
      };

      // Handle location first to avoid duplicate city field
      if (formData.location && typeof formData.location === 'object') {
        const { coordinates, address } = formData.location;
        if (coordinates) {
          const geoLocation = {
            type: 'Point',
            coordinates: [coordinates.lng, coordinates.lat] // Note: MongoDB uses [longitude, latitude] order
          };
          submitData.append('geoLocation', JSON.stringify(geoLocation));
          requestData.geoLocation = geoLocation;
        }
        // Only set city from location if we have a valid address
        if (address && address !== 'Unknown location') {
          submitData.append('city', address);
          requestData.city = address;
        }
      }

      // Append other fields
      Object.entries(formData).forEach(([key, value]) => {
        // Skip location as it's already handled
        if (key === 'location') return;
        
        if (key === 'images') {
          // Handle images
          formData.images.forEach((image) => {
            submitData.append('images', image);
            if (!requestData.images) requestData.images = [];
            requestData.images.push(image.name || 'file');
          });
        } else if (key === 'technicalFeatures' && Array.isArray(value)) {
          // Handle technical features array
          const features = value.join(',');
          if (features) {
            submitData.append('features', features);
            requestData.features = features;
          }
        } else if (fieldMappings[key] && value !== '') {
          // Only include non-empty fields
          const backendKey = fieldMappings[key];
          // Convert numbers to actual numbers
          const processedValue = ['year', 'price', 'mileage', 'numberOfCylinders', 'horsepower', 'engineCapacity'].includes(backendKey) 
            ? Number(value) 
            : value;
          submitData.append(backendKey, processedValue);
          requestData[backendKey] = processedValue;
        }
      });

      // Ensure required fields have default values if empty
      const requiredFields = {
        variant: '',
        sellerType: 'Private',
        regionalSpec: '',
        warranty: 'No',
        horsepower: 0,
        engineCapacity: 0
      };

      Object.entries(requiredFields).forEach(([field, defaultValue]) => {
        if (!submitData.has(field)) {
          submitData.append(field, defaultValue);
          requestData[field] = defaultValue;
        }
      });

      // Debug: Log what's being sent
      console.log('Request Data:', requestData);
      console.log('FormData entries:');
      for (let pair of submitData.entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }

      try {
        console.log('Sending request to /cars with data:', {
          ...Object.fromEntries(submitData),
          images: submitData.getAll('images').map(img => img.name)
        });
        
        const result = await createCar(submitData).unwrap();
        console.log('API Response:', result);
        toast.success("✅ Car posted successfully!");
        
        // Reset form on success
        setFormData({
          price: "",
          make: "",
          model: "",
          year: "",
          condition: "",
          city: "",
          contactNumber: "",
          kilometers: "",
          bodyType: "",
          regionalSpecs: "",
          seats: "",
          fuelType: "",
          transmission: "",
          cylinders: "",
          exteriorColor: "",
          interiorColor: "",
          doors: "",
          ownerType: "",
          warranty: "",
          horsePower: "",
          engineCapacity: "",
          technicalFeatures: "",
          location: "",
          images: [],
        });
        
      } catch (error) {
        console.error('Error details:', {
          status: error.status,
          data: error.data,
          message: error.message,
          error: error
        });
        
        let errorMessage = '❌ Failed to post car';
        if (error.data?.message) {
          errorMessage = error.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage);
        throw error;
      }

      // reset form
      setFormData({
        price: "",
        make: "",
        model: "",
        year: "",
        condition: "",
        city: "",
        contactNumber: "",
        kilometers: "",
        bodyType: "",
        regionalSpecs: "",
        seats: "",
        fuelType: "",
        transmission: "",
        cylinders: "",
        exteriorColor: "",
        interiorColor: "",
        doors: "",
        ownerType: "",
        warranty: "",
        horsePower: "",
        engineCapacity: "",
        technicalFeatures: "",
        location: "",
        images: [],
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err?.data?.message || "❌ Failed to post car");
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
        {/* Images */}
        <div className="my-2">
          <ImagesUpload
            onImagesChange={(files) => handleChange("images", files)}
          />
        </div>

        {/* Price */}
        <div className="price mt-5 mb-2">
          <label className="block mb-1">Price</label>
          <Input
            inputType="number"
            value={formData.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="Enter price"
          />
        </div>

        {/* City */}
        <div className="mb-2">
          <label className="block mb-1">City</label>
          <Input
            inputType="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Enter city"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-2">
          <label className="block mb-1">Contact Number</label>
          <Input
            inputType="tel"
            value={formData.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
            placeholder="Enter contact number"
          />
        </div>

        {/* Car Make & Model */}
        <div className="flex gap-6 my-2 w-full items-center">
          <div className="w-1/2">
            <label className="block mb-1">Car Make</label>
            <Input
              inputType="text"
              value={formData.make}
              onChange={(e) => handleChange("make", e.target.value)}
              placeholder="e.g., Toyota"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Car Model</label>
            <Input
              inputType="text"
              value={formData.model}
              onChange={(e) => handleChange("model", e.target.value)}
              placeholder="e.g., Camry"
            />
          </div>
        </div>

        {/* Year & Kilometers */}
        <div className="flex gap-6 my-2 w-full items-center">
          <div className="w-1/2">
            <label className="block mb-1">Year</label>
            <Input
              inputType="number"
              value={formData.year}
              onChange={(e) => handleChange("year", e.target.value)}
              placeholder="e.g., 2020"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Kilometers</label>
            <Input
              inputType="number"
              value={formData.kilometers}
              onChange={(e) => handleChange("kilometers", e.target.value)}
              placeholder="e.g., 50000"
            />
          </div>
        </div>

        {/* Dropdown/Specs (all use handleChange) */}
        <div>
          <label className="block mb-1">Body Types</label>
          <BodyTypes onBodyTypeChange={(val) => handleChange("bodyType", val)} />
        </div>

        <div>
          <label className="block mb-1">Regional Specs</label>
          <RegionalSpecs
            onChange={(val) => handleChange("regionalSpecs", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Seats</label>
          <Seats onChange={(val) => handleChange("seats", val)} />
        </div>

        <div>
          <label className="block mb-1">Fuel Types</label>
          <FuelSpecs onChange={(val) => handleChange("fuelType", val)} />
        </div>

        <div>
          <label className="block mb-1">Transmission Types</label>
          <TransmissionSpecs
            onChange={(val) => handleChange("transmission", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Number of Cylinders</label>
          <CylindersSpecs onChange={(val) => handleChange("cylinders", val)} />
        </div>

        <div>
          <label className="block mb-1">Exterior Color</label>
          <ExteriorColor
            onChange={(val) => handleChange("exteriorColor", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Interior Color</label>
          <InteriorColor
            onChange={(val) => handleChange("interiorColor", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Doors</label>
          <DoorsSpecs onChange={(val) => handleChange("doors", val)} />
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
          <label className="block mb-1">Horsepower</label>
          <HorsePowerSpecs
            onChange={(val) => handleChange("horsePower", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Engine Capacity CC</label>
          <EngineCapacitySpecs
            onChange={(val) => handleChange("engineCapacity", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Technical Features</label>
          <TechnicalFeaturesSpecs
            onChange={(val) => handleChange("technicalFeatures", val)}
          />
        </div>

        <div>
          <label className="block mb-1">Car Condition</label>
          <CarCondition onChange={(val) => handleChange("condition", val)} />
        </div>

        <div className="my-4">
          <label className="block mb-1">Location</label>
          <LocationButton onChange={(val) => handleChange("location", val)} />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-500 px-4 my-5 py-2 rounded hover:opacity-90 transition w-full text-xl shadow-lg shadow-gray-400 font-semibold"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePostForm;
