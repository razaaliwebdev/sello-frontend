import React from "react";
import ImagesUpload from "../carDetails/ImagesUpload";

const CreatePostForm = () => {
  return (
    <div className="px-4 md:px-20 py-12">
      <h1 className="text-center md:text-3xl font-semibold">Post</h1>
      <div className="border-[1px] border-gray-700 rounded-md px-5 py-6 my-5">
        <div className="">
          <ImagesUpload />
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
