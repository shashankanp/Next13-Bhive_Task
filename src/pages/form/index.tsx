"use client";

import Image from "next/image";
import formImage from "../../../public/stonks.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter();

  // Formik Logic
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      opportunity: "Revenue Based Finance",
      terms: "",
    },

    // Form Validation
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Name must be lesser than 20 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Not a valid Email Address")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Should be of format 'john@gmail.com'"
        )
        .required("Email is required"),
      phone: Yup.string().phone("IN").required("A phone number is required"),
      terms: Yup.array().required("Terms of Sevice must be checked"),
    }),

    // Submit Form
    onSubmit: async (values) => {
      console.log(values);
      axios
        .post("/api/person/add", {
          name: values.name,
          email: values.email,
          phone: values.phone,
          opportunity: values.opportunity,
        })
        .then((response) => {
          console.log("Success:", response);
          return response.data;
        })
        .catch((err) => console.log("Error:", err));
      router.push("/success");
    },
  });

  return (
    <main className="h-screen flex items-center justify-center md:mt-20">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white flex rounded-lg w-3/4"
      >
        <div className="flex-1 text-gray-700 p-10">
          <h1 className="text-2xl pb-2">Please enter your Information</h1>
          <p className="text-lg text-gray-500">
            This information will be used to provide you with our best
            opportunities!
          </p>

          <div className="mt-6">
            {/* Name Input Field */}
            <div className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.name && formik.errors.name
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="name"
              >
                {formik.errors.name ? formik.errors.name : "Name"}
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your name:"
                className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            {/* Email Input Field */}
            <div className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.email && formik.errors.email
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="email"
              >
                {formik.errors.email ? formik.errors.email : "Email Id"}
              </label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your mail Id:"
                className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            {/* Phone Number Input Field */}
            <div className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.phone && formik.errors.phone
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="phone"
              >
                {formik.errors.phone ? formik.errors.phone : "Phone Number"}
              </label>
              <input
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your Phone No:"
                className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>

            {/* Opportunity Input Field */}
            <div className="pb-4">
              <label
                className="block text-sm pb-2 font-medium"
                htmlFor="opportunity"
              >
                Opportunities
              </label>
              <select
                name="opportunity"
                // defaultValue="rbf"
                value={formik.values.opportunity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
              >
                <option value="Fractional Real Estate">
                  Fractional Real Estate
                </option>
                <option value="Revenue Based Finance">
                  Revenue Based Finance
                </option>
                <option value="Asset Leasing">Asset Leasing</option>
              </select>
            </div>

            {/* Image submission */}
            {/* <div className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.phone && formik.errors.phone
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="phone"
              >
                {formik.errors.phone ? formik.errors.phone : "Upload File"}
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) =>
                  formik.setFieldValue("photo", e.currentTarget.files[0])
                }
              />
            </div> */}

            {/* Terms of Service */}
            <div className="pb-4">
              <label
                className={`block text-sm pb-2 font-medium ${
                  formik.touched.terms && formik.errors.terms
                    ? "text-red-500"
                    : ""
                }`}
                htmlFor="terms"
              >
                {formik.errors.terms ? formik.errors.terms : "Terms of Service"}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="terms"
                  value="checked"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-5 w-5 text-teal-500 border-2  focus:border-teal-500 focus:ring-teal-500"
                />
                <p className="text-sm font-medium text-gray-500">
                  I agree to the Terms and Service that this data will be used
                  for further communication.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="bg-teal-500 font-medium text-sm text-white py-3 mt-6 rounded-lg w-full"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="relative flex-1">
          <Image
            src={formImage}
            alt="Image"
            fill
            priority
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            className="object-cover rounded-lg invisible md:visible"
          />
        </div>
      </form>
    </main>
  );
}
