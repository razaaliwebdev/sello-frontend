import React from "react";
import CreatePostForm from "../../components/sections/createPost/CreatePostForm";
import WhyChooseUsUtility from "../../components/utils/WhyChooseUsUtility";
import InpirationSectoin from "../../components/sections/createPost/InpirationSectoin";
import BannerInFilter from "../../components/sections/filter/BannerInFilter";

const CreatePost = () => {
  return (
    <div>
      <CreatePostForm />
      <WhyChooseUsUtility />
      <InpirationSectoin />
      <BannerInFilter />
    </div>
  );
};

export default CreatePost;
