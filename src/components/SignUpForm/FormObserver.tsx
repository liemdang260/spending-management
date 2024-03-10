import { useEffect, useRef } from "react";

type FormObserverProps = {
  callBack: () => void;
  trigger: any;
};

function FormObserver({ callBack, trigger }: FormObserverProps) {
  const isFirstValidate = useRef(false);

  useEffect(() => {
    if (trigger && trigger !== isFirstValidate.current) {
      isFirstValidate.current = false;
      return;
    }
    callBack();
    isFirstValidate.current = trigger;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return null;
}

export default FormObserver;
