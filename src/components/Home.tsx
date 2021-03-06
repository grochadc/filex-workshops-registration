import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 400px)" });
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.number().required("Required"),
    }),
    onSubmit: ({ code }) => {
      history.push(`/selection/${code}`);
    },
  });
  return (
    <div>
      <Form
        onSubmit={(e) => formik.handleSubmit(e as any)}
        inline={isTabletOrMobile}
      >
        <Form.Group>
          <Form.Label htmlFor="code">Code:</Form.Label>
          <Form.Control
            id="code"
            type="text"
            onChange={(e) => formik.handleChange(e as any)}
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
