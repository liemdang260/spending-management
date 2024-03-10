import { Button, DialogActions, FormControl, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

type AddIncomeFormProps = {
  onBindingSubmitFunction: (submitFunction: () => void) => void;
};

function AddIncomeForm({ onBindingSubmitFunction }: AddIncomeFormProps) {
  const jars = useSelector((state: RootState) => state.spending.jars);

  const initialValues = useCallback(
    () => ({
      amount: 0,
      date: dayjs(),
      jar: jars[0].id,
    }),
    [jars]
  );

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(value) => {
          console.log(value(), "income form");
        }}
      >
        {({ submitForm }) => (
          <Form>
            {(() => {
              onBindingSubmitFunction(submitForm);
              return null;
            })()}
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
            <FormControl fullWidth sx={{ my: 1 }}>
              <Field
                name="description"
                as={TextField}
                label="Mô tả"
                variant="standard"
              />
            </FormControl>
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddIncomeForm;
