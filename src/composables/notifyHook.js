import { useQuasar } from "quasar";

export const useNotify = () => {
  const $q = useQuasar();

  const successNotify = (message, position, timeout) => {
    $q.notify({
      type: "positive",
      message,
      position,
      timeout,
    });
  };

  const failNotify = (message, position, timeout) => {
    $q.notify({
      type: "negative",
      message,
      position,
      timeout,
    });
  };

  return { successNotify, failNotify };
};
