import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { LangSwitcherIcon } from "@/components/icons/lang-switcher-icon";
import { languageMenu } from "@/utils/locals";
import Cookies from "js-cookie";

export default function LanguageSwitcher() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { asPath, locale, locales } = router;

  let filterItem = languageMenu?.filter((element) =>
    locales?.includes(element?.id)
  );

  const currentSelectedItem = locale
    ? filterItem?.find((o) => o?.value === locale)!
    : filterItem[2];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

  function handleItemClick(values: any) {
    Cookies.set("NEXT_LOCALE", values?.value, { expires: 365 });
    setSelectedItem(values);
    router.push(asPath, undefined, {
      locale: values?.value,
    });
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative z-10 w-[120px] ms-2 lg:ms-0 xl:w-[130px]">
          <Listbox.Button className="relative w-full cursor-pointer rounded border border-solid border-[#CFD3DA] bg-white py-2 text-[13px] font-semibold text-heading focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 ltr:pl-3 ltr:pr-7 rtl:pl-7 rtl:pr-3 xl:text-sm">
            <span className="flex items-center truncate">
              <span className="ltr:ml-0 ltr:mr-3 rtl:ml-3 rtl:mr-0">
                {selectedItem.icon}
              </span>{" "}
              {t(selectedItem.name)}
            </span>
            <span className="pointer-events-none absolute inset-y-0 flex items-center ltr:left-auto ltr:right-0 ltr:pr-2 rtl:left-0 rtl:right-auto rtl:pl-2">
              <LangSwitcherIcon className="text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {filterItem?.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `${active ? "bg-gray-100 text-amber-900" : "text-gray-900"}
												relative cursor-pointer select-none px-3 py-2`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className="flex items-center">
                      {option.icon}
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate ltr:ml-1.5 rtl:mr-1.5`}
                      >
                        {t(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && "text-amber-600"}
                                 absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3`}
                        />
                      ) : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
