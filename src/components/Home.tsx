import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";

const Home: React.FC<any> = ({ setCurrentRoute, setCode }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 400px)" });
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      setCode(values.code);
      setCurrentRoute("selection");
    },
  });
  return (
    <div>
      <Form onSubmit={formik.handleSubmit} inline={isTabletOrMobile}>
        <Form.Group>
          <Form.Label htmlFor="code">Code:</Form.Label>
          <Form.Control
            id="code"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.code}
          />
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
      {formik.touched.code && formik.errors.code ? (
        <Alert variant="warning">
          {/code must be a `number` type/.test(formik.errors.code) ? (
            <>Please provide your code as a number</>
          ) : (
            formik.errors.code
          )}
        </Alert>
      ) : null}
    </div>
  );
};

export default Home;
