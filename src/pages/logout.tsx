import { useEffect } from "react";
import Loader from "@/components/ui/loader/loader";
import { useLogoutMutation } from "@/data/user";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function SignOut() {
  const { t } = useTranslation();
  const { isSuccess } = useLogoutMutation();

  useEffect(() => {
    isSuccess;
  }, []);

  return <Loader text={t("common:signing-out-text") ?? ""} />;
}

export default SignOut;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
