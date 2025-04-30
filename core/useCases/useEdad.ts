import { useEffect, useState } from "react";

export function useEdad(edad: number) {
  const [isEdad, setIsEdad] = useState<boolean>(false);

  useEffect(() => {
    setIsEdad(edad <= 18 && edad >= 5);
  }, [edad]);

  return { isEdad };
}