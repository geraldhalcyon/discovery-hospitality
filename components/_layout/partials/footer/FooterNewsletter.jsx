import globalData from "@/lib/preBuildScripts/static/globalData.json";
import Link from "next/link";
import FORMAPI from "@/lib/api/forms/request";

import { useState } from "react";
import dynamic from "next/dynamic";
export default function FooterNewsletter() {
  const SectionAccordion = dynamic(() =>
    import("@/components/partials/collapsibles/SectionAccordion")
  );
  const { tenantDetails } = globalData;
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const payload = {
    main: {},
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const agree = document.querySelector("#newsletter-form #agree").checked;

    const email = document.querySelector("#newsletter-form #email").value;

    payload["main"]["email"] = email;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email",
      }));
    }

    if (!agree) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        agree: "Please agree to the terms and conditions",
      }));
    }

    if (agree && !errors.email) {
      setIsSending(true);
      await FORMAPI.submitForm("newsletter-form", payload)
        .then((res) => {
          e.target.reset();
          if (res.status === 200 || res.status === 201) {
            setShowSuccessModal(true);
            setIsSending(false);
          }
        })
        .catch((err) => {
          setIsSending(false);
        });
    }
  };

  return (
    <SectionAccordion title="Stay Updated">
      <section className="footer-newsletter md:py-[40px]">
        <h2
          className={`hidden md:block text-center text-primary tracking-[1px] text-[25px] mb-[30px] mb-[15px] ${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : "font-domine"
          }`}
        >
          Stay Updated
        </h2>

        <div className="container md:!max-w-[550px]">
          <p className="text-[#555] md:text-center">
            Enter your email address below to receive our newsletter
          </p>

          <form
            id="newsletter-form"
            className="max-w-[550px] mx-auto md:max-w-auto"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-wrap items-center mt-[30px]">
              <input
                id="email"
                type="text"
                placeholder="Email Address"
                className={`w-full sm:w-[calc(100%-150px)] text-primary border-[1px]  px-[15px] py-[10px] mb-[15px] sm:mb-0 h-[60px] ${
                  errors.email ? "border-[#FF4C60]" : "border-[#ced4da]"
                } `}
              />
              <button
                type="submit"
                className={`w-full group flex justify-center text-uppercase sm:w-[150px] text-primary border-primary border px-[15px] py-[15px] h-[60px] hover:bg-primary hover:text-[#fff] transition-all duration-300 ease-in-out ${
                  isSending
                    ? "cursor-not-allowed opacity-[.5]"
                    : "cursor-pointer"
                }`}
                disabled={isSending}
              >
                {isSending && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {isSending ? "Sending..." : "Submit"}
              </button>

              {errors.email && (
                <span className="text-red-500 text-[12px] mt-[15px] block">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="text-[#555] text-[12px] mt-[15px] relative">
              <input
                className={`absolute top-[8px] left-0 overflow-hidden cursor-pointer`}
                type="checkbox"
                name="agree"
                id="agree"
              />
              <label
                htmlFor="agree"
                className="pl-[20px] block leading-4  select-none cursor-pointer"
              >
                I Agree to the {tenantDetails.name}{" "}
                <span>
                  <Link
                    className="text-primary"
                    href="/terms-condition"
                    target="_blank"
                  >
                    Terms and Conditions
                  </Link>
                </span>{" "}
                and have read the{" "}
                <span>
                  <Link
                    className="text-primary"
                    href="/privacy-policy"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agree && (
                <span className="text-red-500 text-[12px] mt-[5px] inline-block">
                  {errors.agree}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 p-[15px] flex items-center justify-center z-[9999] bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg animate-wobble">
              <h2 className="text-2xl font-bold mb-4">Success!</h2>
              <p>You have been subscribed successfully.</p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                }}
                className="min-w-[150px] mt-[30px] inline-block py-[8px] px-[20px] bg-primary text-[#fff] rounded-[30px] text-[14px] font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </SectionAccordion>
  );
}
