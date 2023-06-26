import { useTranslation } from "next-i18next";
interface Props {
  message?: string | undefined;
}

export const Error = ({ message }: Props) => {
  const { t } = useTranslation("common");
  return <p className="my-2 text-xs text-red-500 text-start">{t(message!)}</p>;
};

const ErrorMessage = ({ message }: Props) => {
  const { t } = useTranslation("common");
  return (
    <p className="mx-auto mt-16 min-w-min max-w-sm rounded bg-red-400 p-5 text-center text-lg font-semibold text-light">
      {t(message!)}
    </p>
  );
};

export default ErrorMessage;
