import React from "react";
import { useFormik } from "formik";

export default function Form({ name, type, text, formik, value }: any) {
  const form_input = ({ type }: any) => {
    if (type == "option")
      return (
        <select
          name={name}
          // defaultValue="rbf"
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
        >
          <option value="Fractional Real Estate">Fractional Real Estate</option>
          <option value="Revenue Based Finance">Revenue Based Finance</option>
          <option value="Asset Leasing">Asset Leasing</option>
        </select>
      );
    else if (type == "checkbox")
      return (
        <div className="flex items-center gap-2">
          <input
            type={type}
            name={name}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-5 w-5 text-teal-500 border-2  focus:border-teal-500 focus:ring-teal-500"
          />
          <p className="text-sm font-medium text-gray-500">
            I agree to the Terms and Service that this data will be used for
            further communication.
          </p>
        </div>
      );
    else
      return (
        <input
          type={text}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={`Enter your ${text}:`}
          className="outline outline-2 outline-gray-500 p-2 rounded-md w-2/3 focus:border-teal-500 focus:ring-teal-500"
        />
      );
  };
  return (
    <div className="pb-4">
      <label
        className={`block text-sm pb-2 font-medium ${
          formik.touched[name] && formik.errors[name] ? "text-red-500" : ""
        }`}
        htmlFor={name}
      >
        {formik.errors[name] ? formik.errors[name] : text}
      </label>
      {form_input({ type })}
    </div>
  );
}
