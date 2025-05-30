import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Use style.css for Tailwind compatibility
import { toast } from "react-toastify";
import {
  loginInitialValues,
  loginValidationSchema,
} from "../../../Validation/formValidation";
import { authService } from "../../../services/authService";
import CommonButton from "../../../components/CommonButton/CommonButton";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const { phone, password } = values;
      setLoading(true);
      try {
        const response = await authService.login(phone, password);
        if (response.success) {
          toast.success(response.message || "Login successful");
          // Ensure token is stored
          if (localStorage.getItem("accessToken")) {
            navigate("/", { replace: true });
          } else {
            toast.error("Authentication token not found");
          }
        } else {
          toast.error(response.message || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.message || "Authentication failed");
      } finally {
        setLoading(false);
      }
    },
  });

  // Check for token on mount and after login
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleNext = async () => {
    // Validate phone number
    const phone = formik.values.phone;
    if (!phone || phone.length < 10 || phone.length > 15) {
      formik.setFieldError("phone", "Please enter a valid phone number");
      formik.setFieldTouched("phone", true);
      return;
    }

    setLoading(true);
    try {
      const response = await authService.checkUser(phone);
      if (response.success) {
        setShowPasswordField(true);
        formik.setFieldTouched("password", false);
      } else {
        toast.error(response.message || "User not found");
      }
    } catch (error) {
      console.error("Check user error:", error);
      toast.error(error.message || "Error checking user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Left Side - Form */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md">
              {/* Logo and Brand Name */}
              <div className="flex items-center mb-8">
                <img
                  src="/eyesdealLogo.jpg"
                  alt="Eyesdeal Logo"
                  className="w-20 h-14 object-contain"
                />
                <h2 className="ml-3 text-3xl font-bold text-indigo-600 font-serif">
                  Eyesdeal
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={formik.handleSubmit} className="w-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Sign In
                </h3>

                {/* Phone Input */}
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    country={"in"}
                    value={formik.values.phone}
                    onChange={(phone) => formik.setFieldValue("phone", phone)}
                    onBlur={() => formik.setFieldTouched("phone", true)}
                    inputClass={`w-full rounded-md border ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm py-2 px-3 disabled:bg-gray-100`}
                    containerClass="w-full"
                    inputStyle={{ width: "100%" }}
                    placeholder="Enter phone number"
                    disabled={showPasswordField || loading}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                {/* Password Input - Conditionally Rendered */}
                {showPasswordField && (
                  <div className="mb-5 relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={showPass ? "text" : "password"}
                      className={`w-full rounded-md border ${
                        formik.touched.password && formik.errors.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm py-2 px-3 disabled:bg-gray-100`}
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "password",
                          e.target.value?.trimStart()
                        )
                      }
                      onBlur={formik.handleBlur}
                      placeholder="Enter password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-9 text-gray-500 hover:text-indigo-600"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      )}
                    </button>
                    {formik.touched.password && formik.errors.password && (
                      <p className="mt-1 text-xs text-red-500">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                )}

                {/* Button - Next or Sign In */}
                <div className="flex justify-end mt-6">
                  {!showPasswordField ? (
                    <CommonButton
                      loading={loading}
                      buttonText="Next"
                      onClick={handleNext}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 disabled:bg-indigo-300"
                      disabled={loading}
                    />
                  ) : (
                    <CommonButton
                      loading={loading}
                      buttonText="Sign In"
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 disabled:bg-indigo-300"
                      disabled={loading}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Image (Hidden on small screens) */}
          <div className="hidden lg:block w-1/2 relative overflow-hidden">
            <div className="absolute -left-20 top-1/4 z-10">
              <img
                src="/eyesdeal_baloon.png"
                alt="Eyesdeal Balloon"
                className="w-56 h-56 object-cover"
              />
            </div>
            <img
              src="/eyesdeal_banner.jpeg"
              alt="Eyesdeal Banner"
              className="w-full h-screen object-cover fixed top-0 right-0"
              style={{ width: "50%" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
