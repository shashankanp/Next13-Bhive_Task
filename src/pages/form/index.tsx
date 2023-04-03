"use client";

import Image from "next/image";
import formImage from "../../../public/stonks.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import "yup-phone-lite";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utils/firebase";
import { useState } from "react";
import Form from "../component/form";

export default function Home() {
  const [error, setError] = useState();
  // const [imageUpload, setImageUpload] = useState(null);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  // Formik Logic
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      opportunity: "Revenue Based Finance",
      terms: "",
      // photo: "",
    },

    // Form Validation
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be atleast 3 characters")
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
      // console.log(values);
      axios
        .post("/api/form/add", {
          firebase_uid: user?.uid,
          name: values.name,
          email: values.email,
          phone: values.phone,
          opportunity: values.opportunity,
          // photo: values.photo,
        })
        .then((response) => {
          console.log("Input Success:", response);
          router.push("/success");
          return response.data;
        })
        .catch((err) => {
          setError(err.message);
          console.log("Input Error:", err);
        });
    },
  });

  if (loading) return <h1 className="text-3xl">Loading...</h1>;
  if (!user) router.push("/auth/login");
  if (user)
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
              <Form
                name="name"
                type="text"
                text="Name"
                formik={formik}
                value=""
              />

              {/* Email Input Field */}
              <Form
                name="email"
                type="email"
                text="Email Id"
                formik={formik}
                value=""
              />

              {/* Phone Number Input Field */}
              <Form
                name="phone"
                type="tel"
                text="Phone Number"
                formik={formik}
                value=""
              />

              {/* Opportunity Input Field */}

              <Form
                name="opportunity"
                type="option"
                text="Opportunities"
                formik={formik}
                value=""
              />

              {/* Image submission */}
              {/* <div className="pb-4">
                <label
                  className={`block text-sm pb-2 font-medium ${
                    formik.touched.photo && formik.errors.photo
                      ? "text-red-500"
                      : ""
                  }`}
                  htmlFor="file"
                >
                  {formik.errors.photo ? formik.errors.photo : "Upload Photo"}
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) =>{ setImageUpload(e.target.files?[0]);
                  }}
                />
              </div> */}

              {/* Terms of Service */}
              <Form
                name="terms"
                type="checkbox"
                text="Terms of Service"
                formik={formik}
                value="checked"
              />

              {error && (
                <p className="text-red-700 -mb-4 text-center bg-red-300 mx-5">
                  Email or Phone already exists
                </p>
              )}
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
