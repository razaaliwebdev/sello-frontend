import React, { useState } from "react";
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

const CreatePostForm = () => {
  const navigate = useNavigate();
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
      enctype="multipart/form-data"
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

        <div className="mb-2">
          <label className="block mb-1">City</label>
          <Input
            inputType="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Enter city"
            required
          />
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
            <label className="block mb-1">Car Make</label>
            <Input
              inputType="text"
              value={formData.make}
              onChange={(e) => handleChange("make", e.target.value)}
              placeholder="e.g., Toyota"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1">Car Model</label>
            <Input
              inputType="text"
              value={formData.model}
              onChange={(e) => handleChange("model", e.target.value)}
              placeholder="e.g., Camry"
              required
            />
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
            <label className="block mb-1">Year</label>
            <Input
              inputType="number"
              value={formData.year}
              onChange={(e) => handleChange("year", e.target.value)}
              placeholder="e.g., 2020"
              required
            />
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
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const coords = `[${position.coords.longitude}, ${position.coords.latitude}]`;
                    handleChange("geoLocation", coords);
                    toast.success("Location captured!");
                  },
                  (error) => toast.error("Geolocation error: " + error.message)
                );
              } else {
                toast.error("Geolocation not supported.");
              }
            }}
            className="w-full flex items-center justify-between px-5 py-2 border border-gray-300 rounded-md my-2"
          >
            <img
              src={images.location}
              className="w-7 h-7"
              alt="location icons"
            />
            <div className="text-gray-800">Dubai</div>
            <span></span>
          </button>
          <p>Current: {formData.geoLocation}</p>
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
