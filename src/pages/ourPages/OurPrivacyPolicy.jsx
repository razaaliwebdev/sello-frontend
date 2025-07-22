import React from "react";
import { images } from "../../assets/assets";
import { Link } from "react-router-dom";

const OurPrivacyPolicy = () => {
  return (
    <div>
      <nav className="bg-primary-500 p-2">
        <div className="logo">
          <img className="w-40" src={images.logo} alt="logo" />
        </div>
      </nav>
      <div className="p-6 md:p-10 max-w-5xl mx-auto text-gray-700">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-center">
          Privacy Policy
        </h1>
        <p className="mb-4 text-sm text-gray-500">
          Last updated: July 21, 2025
        </p>

        <p className="mb-4">
          This website, including its services, listings, and subpages (referred
          to as "Site"), is owned and operated by Paul Kennedy Private Sales,
          Inc. (“we,” “our,” “Sello”). We take privacy seriously and are
          committed to protecting your personal information. This Privacy Policy
          outlines the types of data we collect, how we use it, and your rights
          in relation to that information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. What Personal Information We Collect
        </h2>
        <p className="mb-4">
          We may collect data such as your name, email address, phone number, IP
          address, and information about your use of the Site. This may occur
          when you register, create a listing, submit a form, or interact with
          our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use your data to provide and improve our services, process
          transactions, personalize user experience, and communicate with you.
          Your information may also be used for analytics, legal compliance, or
          to prevent fraud and misuse.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell your personal data. However, we may share information
          with trusted third-party service providers that help us operate the
          Site. These partners are contractually bound to keep your data secure
          and confidential.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Your Rights and Choices
        </h2>
        <p className="mb-4">
          You may request to access, update, or delete your personal data at any
          time. To do so, please contact us at privacy@sello.com. You may also
          opt out of marketing emails through the unsubscribe link.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. Updates to This Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically. Any significant
          changes will be posted on this page with a revised date. Your
          continued use of the Site after changes indicates your acceptance of
          the updated policy.
        </p>

        <p className="mt-8 text-sm text-center text-gray-400">
          © 2025 SELLO. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default OurPrivacyPolicy;
