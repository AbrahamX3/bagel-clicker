import { useEffect, useState } from "react";
import { type SaveBagel } from "bagel";
import ls from "localstorage-slim";
import { toast } from "sonner";

export const STORAGE_NAME = "bagel-clicker";

export default function useBagelStorage({ bagels, buildings }: SaveBagel) {
  const [loadStorage, setStorage] = useState(() => {
    const storage = ls.get<SaveBagel>(STORAGE_NAME, { decrypt: true });
    return storage;
  });

  const saveBagels = () => {
    ls.set(
      STORAGE_NAME,
      { bagels, buildings },
      {
        encrypt: true,
      },
    );
    setStorage({ bagels, buildings });
    toast.success("Bagels have been stored in the freezer!");
  };

  useEffect(() => {
    const storage = ls.get<SaveBagel>(STORAGE_NAME, { decrypt: true });
    setStorage(storage);
  }, [setStorage]);

  return { loadBagels: loadStorage, saveBagels };
}
