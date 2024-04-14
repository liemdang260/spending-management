import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { FormControl, MenuItem, TextField } from "@mui/material";
import FormikDatePicker from "./FormikDatePicker";

export default function AddTransactionForm({
  onBindingSubmitFunction,
}: {
  onBindingSubmitFunction: (submitFunction: () => void) => void;
}) {
  const jars = useSelector((state: RootState) => state.spending.data.jars);
  const initialValues = useCallback(
    () => ({
      amount: 0,
      date: dayjs(),
      sourceJar: jars[0].id,
      destinationJar: jars[1].id,
    }),
    [jars]
  );
  return (
    <div>
      <Formik
        initialValues={initialValues()}
        onSubmit={(value) => {
          console.log(value.date.toString(), "transaction");
        }}
      >
        {({ submitForm }) => (
          <Form>
            {(() => {
              onBindingSubmitFunction(submitForm);
              return null;
            })()}
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field
                name="sourceHole"
                as={TextField}
                select
                label="Hủ đi"
                defaultValue={1}
              >
                {jars.map((jar, index) => (
                  <MenuItem value={jar.id} key={index}>
                    {jar.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field
                name="destinationHole"
                as={TextField}
                select
                label="Hủ đến"
                defaultValue={2}
              >
                {jars.map((jar, index) => (
                  <MenuItem value={jar.id} key={index}>
                    {jar.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field name="date" as={FormikDatePicker} label="Ngày" />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field
                name="amount"
                as={TextField}
                label="Số tiền"
                variant="standard"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </FormControl>
          </Form>
        )}
      </Formik>
    </div>
  );
}
