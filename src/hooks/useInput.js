import { useCallback, useState } from "react";

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const handler = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [value]
  );
  return [value, handler];
};

export default useInput;
