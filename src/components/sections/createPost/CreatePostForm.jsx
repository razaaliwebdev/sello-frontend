// import React, { useState } from "react";
// import toast from "react-hot-toast";

// import ImagesUpload from "../createPost/ImagesUpload";
// import Input from "../../utils/filter/Input";
// import BodyTypes from "../../utils/filter/BodyTypes";
// import RegionalSpecs from "../../utils/filter/RegionalSpecs";
// import Seats from "../../utils/filter/Seats";
// import FuelSpecs from "../../utils/filter/FuelSpecs";
// import TransmissionSpecs from "../../utils/filter/TransmissionSpecs";
// import CylindersSpecs from "../../utils/filter/CylindersSpecs";
// import ExteriorColor from "../../utils/filter/ExteriorColor";
// import InteriorColor from "../../utils/filter/InteriorColor";
// import DoorsSpecs from "../../utils/filter/DoorsSpecs";
// import OwnerTypeSpecs from "../../utils/filter/OwnerTypeSpecs";
// import WarrantyType from "../../utils/filter/WarrantyType";
// import HorsePowerSpecs from "../../utils/filter/HorsePowerSpecs";
// import EngineCapacitySpecs from "../../utils/filter/EngineCapacitySpecs";
// import TechnicalFeaturesSpecs from "../../utils/filter/TechnicalFeaturesSpecs";
// import LocationButton from "../../utils/filter/LocationButton";
// import CarCondition from "../../utils/filter/CarCondition";

// const CreatePostForm = () => {
//   const [formData, setFormData] = useState({
//     price: "",
//     make: "",
//     model: "",
//     year: "",
//     condition: "",
//     city: "",
//     contactNumber: "",
//     kilometers: "",
//     bodyType: "",
//     regionalSpecs: "",
//     seats: "",
//     fuelType: "",
//     transmission: "",
//     cylinders: "",
//     exteriorColor: "",
//     interiorColor: "",
//     doors: "",
//     ownerType: "",
//     warranty: "",
//     horsePower: "",
//     engineCapacity: "",
//     technicalFeatures: "",
//     location: "",
//     images: [],
//   });

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast.success("Form submitted (demo only, no API call)");
//     console.log("Form data:", formData);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="px-4 md:px-20 py-12"
//       encType="multipart/form-data"
//     >
//       <h1 className="text-center md:text-3xl font-semibold">Post</h1>
//       <div className="border-[1px] border-gray-700 rounded-md px-5 py-6 my-5">
//         {/* Images */}
//         <div className="my-2">
//           <ImagesUpload
//             onImagesChange={(files) => handleChange("images", files)}
//           />
//         </div>

//         {/* Price */}
//         <div className="price mt-5 mb-2">
//           <label className="block mb-1">Price</label>
//           <Input
//             inputType="number"
//             value={formData.price}
//             onChange={(e) => handleChange("price", e.target.value)}
//             placeholder="Enter price"
//           />
//         </div>

//         {/* City */}
//         <div className="mb-2">
//           <label className="block mb-1">City</label>
//           <Input
//             inputType="text"
//             value={formData.city}
//             onChange={(e) => handleChange("city", e.target.value)}
//             placeholder="Enter city"
//           />
//         </div>

//         {/* Contact Number */}
//         <div className="mb-2">
//           <label className="block mb-1">Contact Number</label>
//           <Input
//             inputType="tel"
//             value={formData.contactNumber}
//             onChange={(e) => handleChange("contactNumber", e.target.value)}
//             placeholder="Enter contact number"
//           />
//         </div>

//         {/* Car Make & Model */}
//         <div className="flex gap-6 my-2 w-full items-center">
//           <div className="w-1/2">
//             <label className="block mb-1">Car Make</label>
//             <Input
//               inputType="text"
//               value={formData.make}
//               onChange={(e) => handleChange("make", e.target.value)}
//               placeholder="e.g., Toyota"
//             />
//           </div>
//           <div className="w-1/2">
//             <label className="block mb-1">Car Model</label>
//             <Input
//               inputType="text"
//               value={formData.model}
//               onChange={(e) => handleChange("model", e.target.value)}
//               placeholder="e.g., Camry"
//             />
//           </div>
//         </div>

//         {/* Year & Kilometers */}
//         <div className="flex gap-6 my-2 w-full items-center">
//           <div className="w-1/2">
//             <label className="block mb-1">Year</label>
//             <Input
//               inputType="number"
//               value={formData.year}
//               onChange={(e) => handleChange("year", e.target.value)}
//               placeholder="e.g., 2020"
//             />
//           </div>
//           <div className="w-1/2">
//             <label className="block mb-1">Kilometers</label>
//             <Input
//               inputType="number"
//               value={formData.kilometers}
//               onChange={(e) => handleChange("kilometers", e.target.value)}
//               placeholder="e.g., 50000"
//             />
//           </div>
//         </div>

//         {/* Dropdowns */}
//         <div>
//           <label className="block mb-1">Body Types</label>
//           <BodyTypes
//             onBodyTypeChange={(val) => handleChange("bodyType", val)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Regional Specs</label>
//           <RegionalSpecs
//             onChange={(val) => handleChange("regionalSpecs", val)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Seats</label>
//           <Seats onChange={(val) => handleChange("seats", val)} />
//         </div>

//         <div>
//           <label className="block mb-1">Fuel Types</label>
//           <FuelSpecs onChange={(val) => handleChange("fuelType", val)} />
//         </div>

//         <div>
//           <label className="block mb-1">Transmission Types</label>
//           <TransmissionSpecs
//             onChange={(val) => handleChange("transmission", val)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Number of Cylinders</label>
//           <CylindersSpecs onChange={(val) => handleChange("cylinders", val)} />
//         </div>

//         <div>
//           <label className="block mb-1">Exterior Color</label>
//           <ExteriorColor
//             onChange={(val) => handleChange("exteriorColor", val)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Interior Color</label>
//           <InteriorColor
//             onChange={(val) => handleChange("interiorColor", val)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Doors</label>
//           <DoorsSpecs onChange={(val) => handleChange("doors", val)} />
//         </div>

//         <div>
//           <label className="block mb-1">Owner Type</label>
//           <OwnerTypeSpecs onChange={(val) => handleChange("ownerType", val)} />
//         </div>

//         <div>
//           <label className="block mb-1">Warranty</label>
//           <WarrantyType onChange={(val) => handleChange("warranty", val)} />
//         </div>

//         <div>
//           <label className="block mb-1">Horsepower</label>
//           <HorsePowerSpecs
//             onChange={(val) => handleChange("horsePower", val)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Engine Capacity CC</label>
//           <EngineCapacitySpecs
//             onChange={(val) => handleChange("engineCapacity", val)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Technical Features</label>
//           <TechnicalFeaturesSpecs
//             onChange={(val) => handleChange("technicalFeatures", val)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Car Condition</label>
//           <CarCondition onChange={(val) => handleChange("condition", val)} />
//         </div>

//         <div className="my-4">
//           <label className="block mb-1">Location</label>
//           <LocationButton onChange={(val) => handleChange("location", val)} />
//         </div>

//         {/* Submit */}
//         <div>
//           <button
//             type="submit"
//             className="bg-primary-500 px-4 my-5 py-2 rounded hover:opacity-90 transition w-full text-xl shadow-lg shadow-gray-400 font-semibold"
//           >
//             Post
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CreatePostForm;

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useCreateCarMutation } from "../../../redux/services/api"; // ✅ import your hook

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

  // ✅ hook from RTK Query
  const [createCar, { isLoading }] = useCreateCarMutation();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      // append all fields
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          formData.images.forEach((img) => {
            data.append("images", img); // multiple images
          });
        } else {
          data.append(key, formData[key]);
        }
      });

      // ✅ call API
      const res = await createCar(data).unwrap();

      toast.success("Car post created successfully!");
      console.log("Created car:", res);

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
      console.error("Error creating car:", err);
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

        {/* Dropdowns */}
        <div>
          <label className="block mb-1">Body Types</label>
          <BodyTypes
            onBodyTypeChange={(val) => handleChange("bodyType", val)}
          />
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
