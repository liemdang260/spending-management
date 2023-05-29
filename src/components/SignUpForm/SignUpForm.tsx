import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { USER_ERROR } from "../../store/user/userError";
import FormObserver from "./FormObserver";
import useSignUpForm from "./useSignUpForm";

export type SignUpFormProps = {
  onSignUp: (username: string, password: string) => void;
  onRemoveLoginError: () => void;
};

export type SignUpFormValues = {
  username: string;
  password: string;
  repeatPassword: string;
};
function SignUpForm({ onSignUp, onRemoveLoginError }: SignUpFormProps) {
  const {
    loginError,
    isLogging,
    onHandleLoginClick,
    onSubmit,
    onValidateForm,
  } = useSignUpForm({
    onSignUp,
  });

  return (
    <Box className="flex flex-col m-3">
      <Typography className="text-center" variant="h3">
        Sign Up
      </Typography>
      <Formik
        initialValues={{ username: "", password: "", repeatPassword: "" }}
        onSubmit={(values) => {
          onSubmit(values.username, values.password);
        }}
        validate={onValidateForm}
      >
        {({ validateForm, setSubmitting, isSubmitting }) => (
          <Form className="w-full">
            <Field
              name="username"
              component={TextField}
              type="email"
              label="Username"
              variant="standard"
              size="medium"
              className="w-full"
              readOnly={false}
              onFocus={() => {
                if (loginError === USER_ERROR.EmailAlredyInUse) {
                  onRemoveLoginError();
                }
              }}
            />
            <Field
              name="password"
              component={TextField}
              type="password"
              label="Password"
              variant="standard"
              size="medium"
              className="w-full"
            />
            <Field
              name="repeatPassword"
              component={TextField}
              type="password"
              label="Repeat Password"
              variant="standard"
              size="medium"
              className="w-full"
            />
            <Box className="w-full flex flex-row justify-end mt-5">
              <Box className="w-[50%] flex flex-row justify-around">
                <Box>
                  <Button variant="outlined" onClick={onHandleLoginClick}>
                    Login
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign up
                    {isSubmitting && (
                      <CircularProgress size="1.5rem" className="absolute" />
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
            <FormObserver callBack={validateForm} trigger={loginError} />
            <FormObserver
              callBack={() => {
                if (!isLogging) setSubmitting(false);
              }}
              trigger={isLogging}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default SignUpForm;
