import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CommonButton from "../../../components/CommonButton/CommonButton";
import { authService } from "../../../services/authService";

const loginInitialValues = {
  phone: "",
  password: "",
};

const loginValidationSchema = Yup.object({
  phone: Yup.string()
    .matches
    // /^[0-9]{10,15}$/, // Adjust based on country/format
    // "Please enter a valid phone number"
    ()
    .required("Phone is required"),
  password: Yup.string().required("Password is required"),
  // .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="md:container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center md:fixed md:top-5 md:justify-start mt-2 justify-center">
          <img
            src="/eyesdealLogo.jpg"
            alt="Eyesdeal Logo"
            className="w-20 h-14 object-contain"
          />
          <h2 className="ml-3 md:block hidden text-3xl font-bold text-indigo-600 font-serif">
            Eyesdeal
          </h2>
        </div>
        <div className="md:w-1/2 w-full md:hidden block relative ">
          <img
            src="/login_small.png"
            alt="Eyesdeal Banner"
            className=" h-auto py-4  w-full object-cover lg:object-contain"
          />
        </div>
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Form */}

          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 lg:p-8">
            <div className="w-full max-w-md">
              {/* Logo and Brand Name */}

              {/* Form */}
              <form onSubmit={formik.handleSubmit} className="w-full">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Log In
                </h3>

                {/* Phone Input */}
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="phone"
                    className={`w-full rounded-md border ${
                      formik.touched.phone && formik.errors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 text-sm py-2 px-3 disabled:bg-gray-100`}
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={(e) =>
                      formik.setFieldValue("phone", e.target.value?.trimStart())
                    }
                    onBlur={formik.handleBlur}
                    placeholder="Enter phone"
                    disabled={loading}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.phone}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="mb-5 relative">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      className="right-3 text-gray-500 hover:text-indigo-600"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <div className="flex items-center">
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
                          <p className="ms-2 font-poppins text-[18px] font-normal">
                            Show
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center">
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
                          <p className="ms-2 font-poppins text-[18px] font-normal">
                            Hide
                          </p>
                        </div>
                      )}
                    </button>
                  </div>
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
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {/* Additional Fields Below Password */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 font-poppins text-[16px] font-normal text-[#242424]"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <p className="text-sm font-poppins text-[16px] font-normal text-[#242424] mt-5">
                    By continuing, you agree to the{" "}
                    <a href="#" className="hover:text-indigo-600 underline">
                      Terms of use
                    </a>{" "}
                    and{" "}
                    <a href="#" className="hover:text-indigo-600 underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-[#007569] text-white text-[22px] font-poppins mt-4 py-2 px-4 h-[50px] rounded-[32px] hover:bg-green-800 transition-colors duration-200 mb-4 "
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Log in"}
                  </button>
                  {/* <div className="text-center mb-4">
                    <a
                      href="#"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Forget your password
                    </a>
                  </div>
                  <div className="text-center mb-4">
                    <a
                      href="#"
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      Don't have an account? Sign up
                    </a>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Or continue with
                    </p>
                    <div className="flex justify-center space-x-4">
                      <button>
                        <img
                          src="/facebook-icon.png"
                          alt="Facebook"
                          className="w-8 h-8"
                        />
                      </button>
                      <button>
                        <img
                          src="/apple-icon.png"
                          alt="Apple"
                          className="w-8 h-8"
                        />
                      </button>
                      <button>
                        <img
                          src="/google-icon.png"
                          alt="Google"
                          className="w-8 h-8"
                        />
                      </button>
                      <button>
                        <img
                          src="/twitter-icon.png"
                          alt="Twitter"
                          className="w-8 h-8"
                        />
                      </button>
                    </div>
                  </div> */}
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Image (Hidden on small screens) */}
          <div className="md:w-1/2 w-full relative overflow-hidden">
            <img
              src="/login_screen.png"
              alt="Eyesdeal Banner"
              className="hidden lg:block h-screen py-4 fixed top-0 w-auto object-cover lg:object-contain"
            />
            <img
              src="/login_medium.png"
              alt="Eyesdeal Banner"
              className="hidden lg:hidden md:block h-screen py-4 fixed top-0 w-auto object-cover lg:object-contain"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
