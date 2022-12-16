import { useCallback, useState } from "react";

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const handler = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [value]
  );
  return [value, setValue, handler];
};

export default useInput;
