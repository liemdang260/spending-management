import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../store/store";
import pageRoute from "../../route/pageRoute";
import { SignUpFormValues } from "./SignUpForm";
import { USER_ERROR } from "../../store/user/userError";

type useSignUpFormProps = {
  onSignUp: (username: string, password: string) => void;
};

type useSignUpFormResponse = {
  loginError: USER_ERROR | null | undefined;
  isLogging: boolean;
  onSubmit: (username: string, password: string) => void;
  onHandleLoginClick: () => void;
  onValidateForm: (values: SignUpFormValues) => Partial<SignUpFormValues>;
};

const useSignUpForm = ({
  onSignUp,
}: useSignUpFormProps): useSignUpFormResponse => {
  const { loginError, isLogging } = useSelector(
    (state: RootState) => state.user
  );

  const navigate = useNavigate();

  const onSubmit = (username: string, password: string) => {
    onSignUp(username, password);
  };

  const onHandleLoginClick = () => {
    navigate(pageRoute.loginPage);
  };

  const onValidateForm = (
    values: SignUpFormValues
  ): Partial<SignUpFormValues> => {
    const errors: Partial<SignUpFormValues> = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
    ) {
      errors.username = "Invalid email address";
    } else if (loginError === USER_ERROR.EmailAlredyInUse) {
      errors.username = "Email already in use";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must have 6 characters";
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = "Required";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Must match with password above";
    }
    return errors;
  };
  return {
    loginError,
    isLogging,
    onSubmit,
    onHandleLoginClick,
    onValidateForm,
  };
};

export default useSignUpForm;
