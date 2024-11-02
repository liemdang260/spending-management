import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from "@mui/material";
import {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import AddOutcomeForm from "./AddOutcomeForm";
import AddIncomeForm from "./AddIncomeForm";
import AddTransactionForm from "./AddTransactionForm";
import { IJar } from "../../services/Models/JarModel";

type AddSpendingFormProps = {
  onDisableSubmitButton: () => void;
  jar: IJar;
};

enum TAB_INDEX {
  ADD_INCOME_FORM = 0,
  ADD_OUTCOME_FORM = 1,
  ADD_TRANSACTION_FORM = 2,
}

export const AddSpendingForm = forwardRef(
  ({ onDisableSubmitButton, jar }: AddSpendingFormProps, ref) => {
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

    const onChangeTab = (_: any, newValue: any) => {
      setCurrentTabIndex(newValue);
    };

    const onBindingSubmitFunction = (
      forms: React.MutableRefObject<
        {
          label: string;
          tabIndex: TAB_INDEX;
          renderForm: (index: number) => ReactNode;
          submitForm: (() => void) | null;
        }[]
      >,
      index: number,
      submitFormFunction: () => void
    ) => {
      forms.current[index] = {
        ...forms.current[index],
        submitForm: submitFormFunction,
      };
    };

    const forms = useRef<
      {
        label: string;
        renderForm: (index: number) => ReactNode;
        tabIndex: TAB_INDEX;
        submitForm: (() => void) | null;
      }[]
    >([
      {
        label: "Thu nhập",
        tabIndex: TAB_INDEX.ADD_INCOME_FORM,
        renderForm: (index: number) => (
          <AddIncomeForm
            onBindingSubmitFunction={(submitForm) =>
              onBindingSubmitFunction(forms, index, submitForm)
            }
          />
        ),
        submitForm: null,
      },
      {
        label: "Chi tiêu",
        tabIndex: TAB_INDEX.ADD_OUTCOME_FORM,
        renderForm: (index) => (
          <AddOutcomeForm
            jar={jar}
            onBindingSubmitFunction={(submitForm) =>
              onBindingSubmitFunction(forms, index, submitForm)
            }
          />
        ),
        submitForm: null,
      },
      {
        label: "Chuyển tiền",
        tabIndex: TAB_INDEX.ADD_TRANSACTION_FORM,
        renderForm: (index) => (
          <AddTransactionForm
            onBindingSubmitFunction={(submitForm) =>
              onBindingSubmitFunction(forms, index, submitForm)
            }
          />
        ),
        submitForm: null,
      },
    ]);

    useImperativeHandle(
      ref,
      () => {
        return {
          submit: () => {
            forms.current[currentTabIndex].submitForm?.();
          },
        };
      },
      [forms, currentTabIndex]
    );
    return (
      <div className="w-[30vw] h-[50vh]">
        <Tabs value={currentTabIndex} onChange={onChangeTab}>
          {forms.current.map((form, index) => (
            <Tab key={index} label={form.label} />
          ))}
        </Tabs>
        {forms.current.map((form, index) => (
          <TabPanel
            index={form.tabIndex}
            currentTabIndex={currentTabIndex}
            key={index}
          >
            {form.renderForm(index)}
          </TabPanel>
        ))}
      </div>
    );
  }
);

const TabPanel = ({ index, children, currentTabIndex }: any) => {
  return index === currentTabIndex ? children : <></>;
};

type AddTransactionDialogProps = {
  jar: IJar;
  isAddNewSpending: any;
  closeAddDialog: any;
};
export function AddTransactionDialog({
  closeAddDialog,
  jar,
  isAddNewSpending,
}: AddTransactionDialogProps) {
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(false);

  const formRef = useRef();

  const toggleSubmitButtonDisabled = () => {
    setIsSubmitButtonDisabled((current) => !current);
  };

  const onSubmitForm = () => {
    (formRef.current as any)?.submit();
  };

  return (
    <Dialog open={isAddNewSpending} onClose={closeAddDialog}>
      <DialogTitle>Thêm giao dịch</DialogTitle>
      <DialogContent>
        <AddSpendingForm
          jar={jar}
          onDisableSubmitButton={toggleSubmitButtonDisabled}
          ref={formRef}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAddDialog}>Huỷ</Button>
        <Button disabled={isSubmitButtonDisabled} onClick={onSubmitForm}>
          Hoàn tất
        </Button>
      </DialogActions>
    </Dialog>
  );
}
