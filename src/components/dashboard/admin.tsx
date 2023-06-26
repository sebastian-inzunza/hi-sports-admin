import { useTranslation } from "next-i18next";

import StickerCard from "../widgets/sticker-card";
import { DollarIcon } from "../icons/shops/dollar";
import { CartIconBig } from "../icons/cart-icon-bag";
import { CoinIcon } from "../icons/coin-icon";
import ColumnChart from "../widgets/column-chart";
import { useAnalyticsQuery } from "@/data/analytics";
import Loader from "../ui/loader/loader";
const Dashboard = () => {
  const { t } = useTranslation();
  const { data, isLoading: loading } = useAnalyticsQuery();

  if (loading) {
    return <Loader text={t("common:text-loading") ?? ""} />;
  }

  return (
    <>
      <div className="mb-6 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="w-full">
          <StickerCard
            titleTransKey="sticker-card-title-rev"
            subtitleTransKey="sticker-card-subtitle-rev"
            icon={<DollarIcon className="h-7 w-7" color="#047857" />}
            iconBgStyle={{ backgroundColor: "#A7F3D0" }}
            price={data.usersCount}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-order"
            subtitleTransKey="sticker-card-subtitle-order"
            icon={<CartIconBig />}
            price={data.alertsCount}
          />
        </div>
        <div className="w-full ">
          <StickerCard
            titleTransKey="sticker-card-title-today-rev"
            icon={<CoinIcon />}
            price={data.notesCount}
          />
        </div>
      </div>

      <div className="mb-6 flex w-full flex-wrap md:flex-nowrap">
        <ColumnChart
          widgetTitle={t("common:sale-history")}
          colors={["#03D3B5"]}
          series={10}
          categories={[
            t("common:january"),
            t("common:february"),
            t("common:march"),
            t("common:april"),
            t("common:may"),
            t("common:june"),
            t("common:july"),
            t("common:august"),
            t("common:september"),
            t("common:october"),
            t("common:november"),
            t("common:december"),
          ]}
        />
      </div>

      <div className="mb-6 flex w-full flex-wrap space-y-6 rtl:space-x-reverse xl:flex-nowrap xl:space-x-5 xl:space-y-0">
        <div className="w-full xl:w-1/2">
          {/* <RecentOrders
            orders={orderData}
            title={t('table:recent-order-table-title')}
          /> */}
        </div>

        <div className="w-full xl:w-1/2">
          {/* <WithdrawTable
            withdraws={withdraws}
            title={t('table:withdraw-table-title')}
          /> */}
        </div>
      </div>
      <div className="mb-6 w-full xl:mb-0">
        {/* <PopularProductList
          products={popularProductData}
          title={t('table:popular-products-table-title')}
        /> */}
      </div>
    </>
  );
};
export default Dashboard;
