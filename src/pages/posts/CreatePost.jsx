import React from "react";
import CreatePostForm from "../../components/sections/createPost/CreatePostForm";
import WhyChooseUsUtility from "../../components/utils/WhyChooseUsUtility";
import InpirationSectoin from "../../components/sections/createPost/InpirationSectoin";

const CreatePost = () => {
  return (
    <div>
      <CreatePostForm />
      <WhyChooseUsUtility />
      <InpirationSectoin />
    </div>
  );
};

export default CreatePost;
