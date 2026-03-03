import { useCallback, useState } from "react";

export function useToggle(initialState: boolean = false) {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback((): void => {
    setState(prevState => !prevState);
  }, []);


  return {
   toggle,
   isToggled:state,
  };
}