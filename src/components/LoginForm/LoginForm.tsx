import { Typography, Box, Button, CircularProgress } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useNavigate } from "react-router";
import FormObserver from "../SignUpForm/FormObserver";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { USER_ERROR } from "../../store/user/userError";

export type LoginFormValues = {
  username: string;
  password: string;
};

export type LoginFormProps = {
  onLogin: (username: string, password: string) => void;
  onRemoveLoginError: () => void;
};
function LoginForm({ onLogin, onRemoveLoginError }: LoginFormProps) {
  const navigate = useNavigate();

  const onHandleSignUpClick = () => {
    navigate("/login/signup-form");
  };

  const { isLogging, loginError } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <Box className="flex flex-col m-3">
      <Typography className="text-center" variant="h3">
        Login
      </Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          onLogin(values.username, values.password);
        }}
        validate={(values: LoginFormValues): Partial<LoginFormValues> => {
          const errors: Partial<LoginFormValues> = {};
          if (!values.username) {
            errors.username = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
          ) {
            errors.username = "Invalid email address";
          } else if (loginError === USER_ERROR.UserNotFound) {
            errors.username = "Username does not exist";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password must have 6 characters";
          } else if (loginError === USER_ERROR.WrongPassword) {
            errors.password = "Incorrect password";
          }
          return errors;
        }}
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
                if (loginError === USER_ERROR.UserNotFound) {
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
              onFocus={() => {
                if (loginError === USER_ERROR.WrongPassword) {
                  onRemoveLoginError();
                }
              }}
            />
            <Box className="w-full flex flex-row justify-end mt-5">
              <Box className="w-[50%] flex flex-row justify-around">
                <Box>
                  <Button variant="outlined" onClick={onHandleSignUpClick}>
                    Sign up
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
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

export default LoginForm;
