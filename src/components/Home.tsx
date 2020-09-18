import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Home: React.FC<any> = ({ setCurrentRoute, setCode }) => {
  const formik = useFormik({
    initialValues: {
      code: ""
    },
    validationSchema: Yup.object({
      code: Yup.number().required("Required")
    }),
    onSubmit: values => {
      setCode(values.code);
      setCurrentRoute("selection");
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="code">Code:</label>
      <input
        id="code"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.code}
      />
      <button type="submit">Submit</button>
      {formik.touched.code && formik.errors.code ? (
        <div>
          {/code must be a `number` type/.test(formik.errors.code) ? (
            <>Please provide your code as a number</>
          ) : (
            formik.errors.code
          )}
        </div>
      ) : null}
    </form>
  );
};

export default Home;
