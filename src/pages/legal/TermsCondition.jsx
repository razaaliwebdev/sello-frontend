import React from "react";
import { images } from "../../assets/assets";

const TermsCondition = () => {
  return (
    <div className="">
      <nav className="bg-primary-500 p-2">
        <div className="logo">
          <img className="w-40" src={images.logo} alt="logo" />
        </div>
      </nav>
      <div className="container mx-auto px-4 py-10 max-w-4xl text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

        <p className="mb-4">
          By accessing or using the Sello website and services, you agree to be
          bound by these Terms & Conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Site</h2>
        <p className="mb-4">
          You agree to use this site only for lawful purposes. You may not use
          it to violate any applicable laws, infringe on intellectual property,
          or engage in harmful or fraudulent activities.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your
          account and password. You agree to accept responsibility for all
          activities that occur under your account.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Intellectual Property
        </h2>
        <p className="mb-4">
          All content on this site, including text, graphics, logos, and
          software, is the property of Sello and protected by intellectual
          property laws. You may not copy, reproduce, or distribute any part
          without permission.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Limitation of Liability
        </h2>
        <p className="mb-4">
          Sello is not liable for any direct, indirect, or consequential damages
          that arise from the use or inability to use the site or services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate or suspend your access to our
          services at any time, without notice, for conduct that violates these
          Terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
        <p className="mb-4">
          These Terms may be updated occasionally. We will notify users by
          updating the “Last updated” date or providing direct notice for
          significant changes.
        </p>

        <p className="mt-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Sello. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default TermsCondition;
