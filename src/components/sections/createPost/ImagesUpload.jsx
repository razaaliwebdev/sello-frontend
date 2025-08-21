// import React, { useState, useRef } from "react";

// const ImagesUpload = () => {
//   const [uploads, setUploads] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   // Handle file selection
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;
//     processFiles(files);
//   };

//   // Drag & Drop handlers
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };
//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };
//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = Array.from(e.dataTransfer.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     if (files.length > 0) processFiles(files);
//   };

//   // Process selected files
//   const processFiles = (files) => {
//     const newUploads = files.map((file) => ({
//       id: Date.now() + Math.random(),
//       file,
//       preview: URL.createObjectURL(file),
//       progress: 0,
//       status: "uploading",
//     }));

//     setUploads((prev) => [...prev, ...newUploads]);
//     newUploads.forEach((upload) => simulateUpload(upload));
//   };

//   // Fake upload animation
//   const simulateUpload = (upload) => {
//     const startTime = Date.now();
//     const duration = 2000; // 2 seconds

//     const animate = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min((elapsed / duration) * 100, 100);

//       setUploads((prev) =>
//         prev.map((u) => (u.id === upload.id ? { ...u, progress } : u))
//       );

//       if (progress < 100) {
//         requestAnimationFrame(animate);
//       } else {
//         setUploads((prev) => {
//           const updated = prev.map((u) =>
//             u.id === upload.id ? { ...u, progress: 100, status: "done" } : u
//           );

//           // set first image active automatically
//           if (activeIndex === null) {
//             const newIndex = updated.findIndex((u) => u.id === upload.id);
//             setActiveIndex(newIndex);
//           }
//           return updated;
//         });
//       }
//     };

//     requestAnimationFrame(animate);
//   };

//   // ✅ Fixed Remove Function
//   const removeFile = (id) => {
//     setUploads((prev) => {
//       const indexToRemove = prev.findIndex((u) => u.id === id);

//       if (indexToRemove === -1) return prev;

//       // free memory
//       URL.revokeObjectURL(prev[indexToRemove].preview);

//       const newUploads = prev.filter((u) => u.id !== id);

//       // Fix activeIndex after removal
//       if (newUploads.length === 0) {
//         setActiveIndex(null);
//       } else if (activeIndex === indexToRemove) {
//         setActiveIndex(0); // reset to first image
//       } else if (activeIndex > indexToRemove) {
//         setActiveIndex((prevIndex) => prevIndex - 1);
//       }

//       return newUploads;
//     });
//   };

//   const completedUploads = uploads.filter((u) => u.status === "done");

//   return (
//     <div className="max-w-2xl mx-auto  rounded-xl  overflow-hidden">
//       <div
//         className={`relative px-6 py-14 transition-all duration-300 ${
//           isDragging
//             ? "bg-primary-300 ring-4 ring-primary-300 ring-opacity-50"
//             : "bg-gray-100"
//         }`}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         <div className="box md:h-16 md:w-16 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 absolute top-9 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-gray-300"></div>
//         {/* Preview */}
//         <div className="bg-white rounded-xl  border-2 border-primary-300 border-dashed  h-64 flex items-center justify-center  overflow-hidden group relative">
//           {activeIndex !== null ? (
//             <>
//               <img
//                 src={uploads[activeIndex]?.preview}
//                 alt="preview"
//                 className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
//               />
//               {/* Remove Button */}
//               <button
//                 onClick={() => removeFile(uploads[activeIndex].id)}
//                 className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 shadow"
//               >
//                 Remove
//               </button>
//             </>
//           ) : (
//             <div className="text-center p-6">
//               <p className="text-primary-500 text-sm">No image uploaded yet</p>
//             </div>
//           )}
//         </div>

//         {/* Uploading Progress */}
//         <div className="mt-6 space-y-3">
//           {uploads
//             .filter((u) => u.status === "uploading")
//             .map((upload) => (
//               <div
//                 key={upload.id}
//                 className="bg-white p-3 shadow-sm border rounded"
//               >
//                 <div className="flex justify-between mb-1">
//                   <span className="text-sm text-gray-700">
//                     {upload.file.name}
//                   </span>
//                   <span className="text-xs text-primary-500 font-semibold">
//                     {Math.round(upload.progress)}%
//                   </span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-300 transition-all"
//                     style={{ width: `${upload.progress}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* Upload button */}
//         <div className="mt-6 text-center">
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//             className="hidden"
//             id="fileInput"
//           />
//           <label
//             htmlFor="fileInput"
//             className="px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:scale-x-110 rounded-lg cursor-pointer hover:bg-gradient-to-l transition"
//           >
//             Select Images
//           </label>
//         </div>

//         {/* Navigation dots */}
//         {completedUploads.length > 0 && (
//           <div className="flex justify-center mt-6 gap-2">
//             {uploads.map(
//               (upload, idx) =>
//                 upload.status === "done" && (
//                   <button
//                     key={upload.id}
//                     onClick={() => setActiveIndex(idx)}
//                     className={`w-3 h-3 rounded-full ${
//                       activeIndex === idx
//                         ? "bg-gradient-to-r from-primary-400 to-primary-500 shadow"
//                         : "bg-gray-400"
//                     }`}
//                   />
//                 )
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImagesUpload;

import React, { useState, useRef } from "react";

const ImagesUpload = () => {
  const [uploads, setUploads] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    processFiles(files);
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) processFiles(files);
  };

  // Process selected files
  const processFiles = (files) => {
    const newUploads = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "uploading",
      url: null, // will hold API uploaded link later
    }));

    setUploads((prev) => [...prev, ...newUploads]);
    newUploads.forEach((upload) => simulateUpload(upload));
  };

  // Fake upload animation (replace with API call later)
  const simulateUpload = (upload) => {
    const startTime = Date.now();
    const duration = 2000; // 2 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      setUploads((prev) =>
        prev.map((u) => (u.id === upload.id ? { ...u, progress } : u))
      );

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        // ✅ Here you can call your API instead of simulate
        setUploads((prev) => {
          const updated = prev.map((u) =>
            u.id === upload.id
              ? {
                  ...u,
                  progress: 100,
                  status: "done",
                  url: `https://api.example.com/uploads/${u.file.name}`, // mock uploaded link
                }
              : u
          );

          // auto set active
          if (activeIndex === null) {
            const newIndex = updated.findIndex((u) => u.id === upload.id);
            setActiveIndex(newIndex);
          }

          // ✅ Collect and log completed uploads (ready for API use)
          const completed = updated.filter((u) => u.status === "done");
          console.log("Uploaded images:", completed);

          return updated;
        });
      }
    };

    requestAnimationFrame(animate);
  };

  // Remove File
  const removeFile = (id) => {
    setUploads((prev) => {
      const indexToRemove = prev.findIndex((u) => u.id === id);
      if (indexToRemove === -1) return prev;

      URL.revokeObjectURL(prev[indexToRemove].preview);

      const newUploads = prev.filter((u) => u.id !== id);

      if (newUploads.length === 0) {
        setActiveIndex(null);
      } else if (activeIndex === indexToRemove) {
        setActiveIndex(0);
      } else if (activeIndex > indexToRemove) {
        setActiveIndex((prevIndex) => prevIndex - 1);
      }

      return newUploads;
    });
  };

  const completedUploads = uploads.filter((u) => u.status === "done");

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
        <div
          className={`relative px-4 md:px-8 py-10 md:py-14 rounded-xl transition-all duration-300 ${
            isDragging
              ? "bg-primary-300 ring-4 ring-primary-300 ring-opacity-50"
              : "bg-gray-100"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Decorative circle */}
          <div className="md:h-16 md:w-16 h-12 w-12 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 absolute top-8 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>

          {/* Preview */}
          <div className="bg-white rounded-xl border-2 border-primary-300 border-dashed h-56 md:h-72 flex items-center justify-center overflow-hidden group relative">
            {activeIndex !== null ? (
              <>
                <img
                  src={uploads[activeIndex]?.preview}
                  alt="preview"
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => removeFile(uploads[activeIndex].id)}
                  className="absolute top-3 right-3 bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded hover:bg-red-600 shadow"
                >
                  Remove
                </button>
              </>
            ) : (
              <div className="text-center p-6">
                <p className="text-primary-500 text-sm md:text-base">
                  No image uploaded yet
                </p>
              </div>
            )}
          </div>

          {/* Uploading Progress */}
          <div className="mt-6 space-y-3">
            {uploads
              .filter((u) => u.status === "uploading")
              .map((upload) => (
                <div
                  key={upload.id}
                  className="bg-white p-3 shadow-sm border rounded"
                >
                  <div className="flex justify-between mb-1 text-xs md:text-sm">
                    <span className="truncate max-w-[150px] md:max-w-xs">
                      {upload.file.name}
                    </span>
                    <span className="text-primary-500 font-semibold">
                      {Math.round(upload.progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-300 transition-all"
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Upload button */}
          <div className="mt-6 text-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 hover:scale-105 text-white rounded-lg cursor-pointer transition inline-block"
            >
              Select Images
            </label>
          </div>

          {/* Navigation dots */}
          {completedUploads.length > 0 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {uploads.map(
                (upload, idx) =>
                  upload.status === "done" && (
                    <button
                      key={upload.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                        activeIndex === idx
                          ? "bg-gradient-to-r from-primary-400 to-primary-500 shadow"
                          : "bg-gray-400"
                      }`}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </div>
      <p className="text-left capitalize text-lg md:text-xl text-gray-600 font-semibold">
        How to take a great listing photo
      </p>
    </>
  );
};

export default ImagesUpload;
