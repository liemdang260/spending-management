import { useEffect, useRef } from "react";

type FormObserverProps = {
  callBack: () => void;
  trigger: any;
};

function FormObserver({ callBack, trigger }: FormObserverProps) {
  const isFirstValidate = useRef(true);
  useEffect(() => {
    if (isFirstValidate.current) {
      isFirstValidate.current = false;
      return;
    }
    callBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);
  return null;
}

export default FormObserver;
