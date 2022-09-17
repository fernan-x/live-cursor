import { useCallback, useRef, useState } from "react";
import { CursorPosition } from "../types/types";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({
    left: 0,
    top: 0,
  });

  const handleMouseMove = useCallback(
    (
      e: any // TODO : mange this
    ) =>
      setMousePosition({
        left: e.pageX,
        top: e.pageY,
      }),
    []
  );

  const ref = useRef<HTMLDivElement>();

  const callbackRef = useCallback(
    (node: HTMLDivElement) => {
      if (ref.current) {
        ref.current.removeEventListener("mousemove", handleMouseMove);
      }

      ref.current = node;

      if (ref.current) {
        ref.current.addEventListener("mousemove", handleMouseMove);
      }
    },
    [handleMouseMove]
  );

  return [callbackRef, mousePosition] as const;
};

export default useMousePosition;
