import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { FormControl, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

export default function AddTransactionForm({
  onBindingSubmitFunction,
}: {
  onBindingSubmitFunction: (submitFunction: () => void) => void;
}) {
  const jars = useSelector((state: RootState) => state.spending.jars);
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
        initialValues={initialValues}
        onSubmit={(value) => {
          console.log(value(), "transaction");
        }}
      >
        {({ submitForm }) => (
          <Form>
            {(() => {
              onBindingSubmitFunction(submitForm);
              return null;
            })()}
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field name="hole" as={TextField} select label="Hủ đi">
                {jars.map((jar, index) => (
                  <MenuItem value={jar.id} key={index}>
                    {jar.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field name="hole" as={TextField} select label="Hủ đến">
                {jars.map((jar, index) => (
                  <MenuItem value={jar.id} key={index}>
                    {jar.name}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field name="date" as={DatePicker} label="Ngày" />
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
