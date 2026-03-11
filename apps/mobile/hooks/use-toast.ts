import { type ToastPlacement, type ToastVariant, useToast as useHerouiToast } from "heroui-native";
import { useState } from "react";

type TToast = {
  type?: ToastVariant;
  duration?: number;
  placement?: ToastPlacement;
  title?: string;
  description?: string;
}

const useToast = () => {
  const { toast } = useHerouiToast();
  const [id, setId] = useState<string>();

  const show = ({ type, duration, placement = 'bottom', title, description }: TToast) => {
    const toastId = toast.show({ placement, duration, label: title, description, variant: type });
    setId(toastId);
  };

  const dismiss = () => {
    if (id) {
      toast.hide(id);
      setId(undefined);
      return;
    }

    toast.hide();
  };

  return { toast, show, dismiss };
};

export default useToast;
