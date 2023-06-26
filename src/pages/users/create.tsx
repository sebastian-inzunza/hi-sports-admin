import { GetServerSideProps } from "next";
import {
  allowedRoles,
  getAuthCredentials,
  hasAccess,
  isAuthenticated,
} from "@/utils/auth-utils";
import { Routes } from "@/config/routes";

import Layout from "@/components/layout/admin";
import UserCreateForm from "@/components/user/user-form";

export default function CreateUser() {
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">Crear Usuario</h1>
      </div>

      <UserCreateForm />
    </>
  );
}

CreateUser.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, permissions } = getAuthCredentials(ctx);
  if (
    !isAuthenticated({ token, permissions }) ||
    !hasAccess(allowedRoles, permissions)
  ) {
    return {
      redirect: {
        destination: Routes.login,
        permanent: false,
      },
    };
  }
  return {
    props: {
      userPermissions: permissions,
    },
  };
};
