import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import { Button } from "./utils";

const Home = () => {
  const history = useHistory();
  const handleSubmit = (codigo: string) => {
    history.push(`/student/${codigo}`);
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 400px)" });
  return (
    <CodeForm onSubmit={handleSubmit} isTabletOrMobile={isTabletOrMobile} />
  );
};

type CodeFormProps = {
  onSubmit: (codigo: string) => void;
  isTabletOrMobile: boolean;
};
export const CodeForm = (props: CodeFormProps) => {
  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.number().required("El codigo es requerido"),
    }),
    onSubmit: ({ code }) => {
      const codigoSchema = Yup.string().trim();
      const validCodigo = codigoSchema.validateSync(code);
      if (validCodigo) {
        props.onSubmit(validCodigo);
      }
    },
  });
  return (
    <div>
      <Form
        onSubmit={(e) => formik.handleSubmit(e as any)}
        inline={props.isTabletOrMobile}
      >
        <div className="flex flex-col w-full md:flex-row md:w-40">
          <label htmlFor="code">Codigo:</label>
          <input
            id="code"
            type="text"
            onChange={(e) => formik.handleChange(e as any)}
            value={formik.values.code}
            className="border rounded-sm w-full md:w-40 h-10 mx-2 px-3"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 text-white p-2 m-1"
          >
            Submit
          </button>
        </div>
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
