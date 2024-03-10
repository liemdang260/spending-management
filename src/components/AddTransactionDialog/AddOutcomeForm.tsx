import React, { useCallback } from "react";
import { Field, Form, Formik } from "formik";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import dayjs from "dayjs";
import { IJar } from "../../interfaces/spending.interfaces";
import FormikDatePicker from "./FormikDatePicker";

type AddOutcomeFormProps = {
  jar: IJar;
  onBindingSubmitFunction: (submitFunction: () => void) => void;
};
const AddOutcomeForm = ({
  jar,
  onBindingSubmitFunction,
}: AddOutcomeFormProps) => {
  const initialValues = useCallback(
    () => ({
      amount: 0,
      date: dayjs(),
      jar: jar.id,
      description: "",
      tags: "",
    }),
    [jar]
  );
  return (
    <div>
      <Formik
        initialValues={initialValues()}
        onSubmit={(value) => {
          console.log(value.date.toString(), "out come forme");
        }}
      >
        {({ submitForm }) => (
          <Form>
            {(() => {
              onBindingSubmitFunction(submitForm);
              return null;
            })()}
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field name="date" as={FormikDatePicker} label="Ngày" />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field
                name="amount"
                as={TextField}
                label="Số tiền"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">VND</InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field
                name="description"
                as={TextField}
                label="Mô tả"
                variant="standard"
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field
                name="tag"
                as={TextField}
                label="Tags"
                variant="standard"
              />
            </FormControl>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOutcomeForm;
