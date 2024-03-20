import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";

import {
  PaymentsApi,
  deletePaymentApi,
  getCoinsUserApi,
  getsignUserApi,
} from "../../Api/Service";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate, Link, NavLink } from "react-router-dom";

const Account = () => {
  const [Active, setActive] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isDisable, setisDisable] = useState(false);
  const [isDisable1, setisDisable1] = useState(false);

  const [UserData, setUserData] = useState(true);
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const authUser = useAuthUser();
  const Navigate = useNavigate();
  const [isUser, setIsUser] = useState({});
  const getsignUser = async () => {
    try {
      const formData = new FormData();
      formData.append("id", authUser().user._id);
      const userCoins = await getsignUserApi(formData);

      if (userCoins.success) {
        setIsUser(userCoins.signleUser);

        return;
      } else {
        toast.dismiss();
        toast.error(userCoins.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisLoading(false);
    }
  };
  const deletePayment = async (pId) => {
    try {
      setisDisable1(true);
      let id = authUser().user._id;
      const deleteAccount = await deletePaymentApi(id, pId);

      if (deleteAccount.success) {
        toast.success(deleteAccount.msg);
        getsignUser();

        return;
      } else {
        toast.dismiss();
        toast.error(deleteAccount.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisDisable1(false);
    }
  };
  //

  //

  useEffect(() => {
    getsignUser();
    if (authUser().user.role === "user") {
      return;
    } else if (authUser().user.role === "admin") {
      Navigate("/admin/dashboard");
      return;
    }
  }, []);
  // withdraw
  const [modal3, setModal3] = useState(false);

  const [accountDetail, setaccountDetail] = useState({
    accountName: "",
    accountNumber: "",
    accountNotes: "",
  });
  let handleTransactionId = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setaccountDetail({ ...accountDetail, [name]: value });
  };

  let closeDeposit = () => {
    setModal3(false);
  };
  const addAccount = async () => {
    try {
      let id = authUser().user._id;
      setisDisable(true);

      let body = {
        accountName: accountDetail.accountName,
        accountNumber: accountDetail.accountNumber,
        accountNotes: accountDetail.accountNotes,
      };

      if (!body.accountName || !body.accountNumber || !body.accountNotes) {
        toast.dismiss();
        toast.error("Fill all the required fields");
        return;
      }
      const newAccount = await PaymentsApi(id, body);

      if (newAccount.success) {
        toast.dismiss();
        toast.success(newAccount.msg);
        getsignUser();

        closeDeposit();
      } else {
        toast.dismiss();
        toast.error(newAccount.msg);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setisDisable(false);
    }
  };

  return (
    <div className="dark user-bg">
      <div>
        <div className="pb-20">
          <SideBar state={Active} toggle={toggleBar} />{" "}
          <button
            onClick={toggleBar}
            type="button"
            className="flex for-mbl h-10 w-10 items-center justify-center mb- -ms-3 abspain"
          >
            <div className="relative h-5 w-5">
              <span className="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 top-0.5 top-0.5" />
              <span className="bg-primary-500 absolute top-1/2 block h-0.5 w-full max-w-[50%] transition-all duration-300" />
              <span className="bg-primary-500 absolute block h-0.5 w-full transition-all duration-300 bottom-0 bottom-0" />
            </div>
          </button>
          <div className=" relative min-h-screen w-full fall overflow-x-hidden pe-4 transition-all duration-300 xl:px-10 lg:max-w-[calc(100%_-_250px)] lg:ms-[250px]">
            <div className="mx-auto w-full max-w-7xl">
              {isLoading ? (
                <div className="mx-auto loading-pg w-full text-center max-w-xs">
                  <div className="mx-auto max-w-xs">
                    <svg
                      data-v-cd102a71
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      className="icon h-12 w-12 text-primary-500"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                        opacity=".25"
                      />
                      <path
                        fill="currentColor"
                        d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                      >
                        <animateTransform
                          attributeName="transform"
                          dur="0.75s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        />
                      </path>
                    </svg>
                  </div>
                  <div className="mx-auto max-w-sm">
                    <h4 className="font-heading text-xl font-medium leading-normal leading-normal text-muted-800 mb-1 mt-4 dark:text-white">
                      Loading Account
                    </h4>
                    <p className="text-muted-400 font-sans text-sm">
                      Please wait while we load your Account.
                    </p>
                  </div>
                </div>
              ) : UserData === null || !UserData ? (
                <div className="mx-auto loading-pg w-full text-center max-w-xs">
                  <div className="mx-auto max-w-sm ">
                    <h4 className="font-heading text-xl font-medium leading-normal leading-normal text-muted-800 mb-1 mt-4 dark:text-white">
                      No Account found!
                    </h4>
                  </div>
                </div>
              ) : (
                <div className=" ptbg relative w-full    transition-all duration-300 ">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p
                        className="font-heading text-white  text-sm font-medium leading-normal leading-normal uppercase tracking-wider"
                        tag="h2"
                      >
                        Payment Methods
                      </p>
                      <p>You can add or remove your payment methods here.</p>
                    </div>
                    <button onClick={() => setModal3(true)} className="add-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v14m-7-7h14"
                        />
                      </svg>
                      Add New
                    </button>
                  </div>
                  <div className="pt-6">
                    <div class="MuiGrid2-root MuiGrid2-container MuiGrid2-direction-xs-row MuiGrid2-spacing-xs-3 css-v57kt1">
                      {isLoading ? (
                        <div>Loading...</div>
                      ) : isUser.payments.length != 0 ? (
                        isUser.payments.map((item, key) => {
                          return (
                            <div
                              key={key}
                              class="MuiGrid2-root MuiGrid2-direction-xs-row MuiGrid2-grid-xs-12 MuiGrid2-grid-sm-6 MuiGrid2-grid-md-4 css-1m1aas1"
                            >
                              <div class="MuiStack-root css-1gq5e6f">
                                <div class="MuiStack-root css-4u2is6">
                                  <div class="MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault css-drtivy">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="none"
                                    >
                                      <path
                                        fill="#fff"
                                        fill-opacity="0.01"
                                        d="M19.4 21c.5601 0 .8401 0 1.054-.109a.9993.9993 0 0 0 .437-.437C21 20.2401 21 19.9601 21 19.4v-.8c0-.56 0-.8401-.109-1.054a1.0003 1.0003 0 0 0-.437-.437C20.2401 17 19.9601 17 19.4 17H4.6c-.56 0-.84 0-1.054.109a1.0005 1.0005 0 0 0-.437.437C3 17.7599 3 18.04 3 18.6v.8c0 .5601 0 .8401.109 1.054a.9994.9994 0 0 0 .437.437C3.76 21 4.04 21 4.6 21h14.8Zm0-12c.5601 0 .8401 0 1.054-.109a1 1 0 0 0 .437-.437C21 8.2401 21 7.96 21 7.4V6.2835c0-.458 0-.687-.0812-.876a.9992.9992 0 0 0-.3343-.4167c-.1668-.1202-.3903-.1699-.8374-.2692l-7.4-1.6444c-.1295-.0288-.1943-.0432-.2597-.049a1.0004 1.0004 0 0 0-.1748 0c-.0654.0058-.1302.0202-.2597.049l-7.4 1.6444c-.447.0993-.6706.149-.8374.2692a1 1 0 0 0-.3344.4168C3 5.5966 3 5.8256 3 6.2835V7.4c0 .56 0 .8401.109 1.054.0959.1882.2489.3411.437.437C3.76 9 4.04 9 4.6 9h14.8Z"
                                      ></path>
                                      <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 9v8m4.5-8v8m5-8v8M19 9v8M3 18.6v.8c0 .5601 0 .8401.109 1.054a.9994.9994 0 0 0 .437.437C3.76 21 4.04 21 4.6 21h14.8c.5601 0 .8401 0 1.054-.109a.9993.9993 0 0 0 .437-.437C21 20.2401 21 19.9601 21 19.4v-.8c0-.56 0-.8401-.109-1.054a1.0003 1.0003 0 0 0-.437-.437C20.2401 17 19.9601 17 19.4 17H4.6c-.56 0-.84 0-1.054.109a1.0005 1.0005 0 0 0-.437.437C3 17.7599 3 18.04 3 18.6Zm8.6529-15.5229-7.4 1.6445c-.447.0993-.6706.149-.8374.2692a1 1 0 0 0-.3344.4168C3 5.5966 3 5.8256 3 6.2835V7.4c0 .56 0 .8401.109 1.054.0959.1882.2489.3411.437.437C3.76 9 4.04 9 4.6 9h14.8c.5601 0 .8401 0 1.054-.109a1 1 0 0 0 .437-.437C21 8.2401 21 7.96 21 7.4V6.2835c0-.458 0-.687-.0812-.876a.9992.9992 0 0 0-.3343-.4167c-.1668-.1202-.3903-.1699-.8374-.2692l-7.4-1.6444c-.1295-.0288-.1943-.0432-.2597-.049a1.0004 1.0004 0 0 0-.1748 0c-.0654.0058-.1302.0202-.2597.049Z"
                                      ></path>
                                    </svg>
                                  </div>
                                  <div class="MuiStack-root css-1msa3n8">
                                    <h6 class="MuiTypography-root MuiTypography-subtitle2 css-15udru3">
                                      Bank Account
                                    </h6>
                                    <h6 class="MuiTypography-root MuiTypography-subtitle1 css-1oklce5">
                                      {item.accountName}
                                    </h6>
                                    <span class="MuiTypography-root MuiTypography-caption css-5d62nz">
                                      {new Date(
                                        item.createdAt
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                                <button
                                  class="MuiButtonBase-root asSA MuiIconButton-root MuiIconButton-sizeSmall css-1s4gov3"
                                  tabindex="0"
                                  type="button"
                                  disabled={isDisable1}
                                  onClick={() => deletePayment(item._id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                  >
                                    <path
                                      fill="#fff"
                                      fill-opacity="0.01"
                                      d="M3 6.6h16.2H3Z"
                                    ></path>
                                    <path
                                      stroke="currentColor"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M14.7 6.6v-.72c0-1.008 0-1.5121-.1962-1.8972a1.8 1.8 0 0 0-.7866-.7866C13.3321 3 12.8281 3 11.82 3h-1.44c-1.008 0-1.5121 0-1.8972.1962a1.8 1.8 0 0 0-.7866.7866C7.5 4.3678 7.5 4.872 7.5 5.88v.72m1.8 4.95v4.5m3.6-4.5v4.5M3 6.6h16.2m-1.8 0v10.08c0 1.5121 0 2.2682-.2943 2.8458a2.6996 2.6996 0 0 1-1.1799 1.1799C15.3482 21 14.5921 21 13.08 21H9.12c-1.5121 0-2.2682 0-2.8458-.2943a2.6998 2.6998 0 0 1-1.18-1.1799C4.8 18.9482 4.8 18.1921 4.8 16.68V6.6"
                                    ></path>
                                  </svg>
                                  <span class="MuiTouchRipple-root css-w0pj6f"></span>
                                </button>
                              </div>
                            </div>
                          ); // Example content
                        })
                      ) : (
                        <div className="px-5 py-4">
                          <h1>No payment methods found</h1>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/**/}
            </div>
          </div>
        </div>
      </div>
      {modal3 && (
        <div>
          <div
            className="relative z-[9999]"
            id="headlessui-dialog-33"
            role="dialog"
            aria-modal="true"
            data-headlessui-state="open"
          >
            <div className="bg-lesf  fixed inset-0" />
            <div className="fixed inset-0 overflow-x-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <div
                  id="headlessui-dialog-panel-36"
                  data-headlessui-state="open"
                  className="line-bg w-full   text-left align-middle shadow-xl transition-all rounded-lg max-w-2xl"
                >
                  <div className="flex w-full items-center justify-between  ">
                    <h3 className=" text-muted-400 font-heading  text-lg font-medium leading-6  ">
                      {" "}
                      Add Payment Method
                    </h3>
                    <button
                      onClick={closeDeposit}
                      type="button"
                      className="flex h-9 w-9 items-center justify-center transition-colors duration-300 disabled:opacity-30 hover:bg-muted-100 dark:hover:bg-muted-700 text-muted-700 dark:text-muted-50 rounded-full"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-current"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 6 6 18M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="py-2">
                    <form
                      action
                      method="POST"
                      className="mx-auto w-full max-w-3xl"
                    >
                      <div className="  border-t p-4 mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-muted-400 font-heading text-base font-medium leading-normal leading-normal">
                              {" "}
                              Bank Account
                            </h3>
                          </div>
                        </div>
                        <div className="mt-5 grid grid-cols-12 gap-4">
                          <div className="col-span-12 flex-a grid-cols-12">
                            <div className="col-span-12 flex flex-col justify-center sm:col-span-3">
                              <label className="mb-1 sm:mb-0 nui-label text-[0.825rem]">
                                Bank Name
                              </label>
                            </div>
                            <div className="col-span-12 sm:col-span-9">
                              <div className="relative">
                                {/**/}
                                <div className="group/nui-input relative">
                                  <input
                                    id="ninja-input-46"
                                    type="text"
                                    onChange={handleTransactionId}
                                    value={accountDetail.accountName}
                                    name="accountName"
                                    className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-2 rounded"
                                    placeholder="Bank Name"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 flex-a grid-cols-12">
                            <div className="col-span-12 flex flex-col justify-center sm:col-span-3">
                              <label className="mb-1 sm:mb-0 nui-label text-[0.825rem]">
                                Account Number
                              </label>
                            </div>
                            <div className="col-span-12 sm:col-span-9">
                              <div className="relative">
                                {/**/}
                                <div className="group/nui-input relative">
                                  <input
                                    id="ninja-input-46"
                                    type="number"
                                    onChange={handleTransactionId}
                                    value={accountDetail.accountNumber}
                                    name="accountNumber"
                                    className="nui-focus border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-2 rounded"
                                    placeholder="Account Number"
                                  />
                                  {/**/}
                                  {/**/}

                                  {/* <span className="text-danger-600 mt-1 block font-sans text-[0.65rem] font-medium leading-none">
                                    Address is required
                                  </span> */}
                                  {/**/}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-12 flex-a grid-cols-12">
                            <div className="col-span-12 flex flex-col justify-center sm:col-span-3">
                              <label className="mb-1 sm:mb-0 nui-label text-[0.825rem]">
                                * We take your privacy seriously. Bank-sensitive
                                data undergoes thorough encryption procedures
                                before being securely stored, thereby
                                guaranteeing robust protection against
                                unauthorized access or breaches.
                              </label>
                            </div>
                            <div className="col-span-12 sm:col-span-9">
                              <div className="relative">
                                {/**/}
                                <div className="group/nui-input relative">
                                  <textarea
                                    type="text"
                                    rows="4"
                                    onChange={handleTransactionId}
                                    value={accountDetail.accountNotes}
                                    name="accountNotes"
                                    cols="5"
                                    className="nui-focus min-aa border-muted-300 text-muted-600 placeholder:text-muted-300 dark:border-muted-700 dark:bg-muted-900/75 dark:text-muted-200 dark:placeholder:text-muted-500 dark:focus:border-muted-700 peer w-full border bg-white font-sans transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-75 px-2 h-10 py-2 text-sm leading-5 pe-4 ps-2 rounded"
                                    placeholder="Notes"
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/**/}
                        </div>
                      </div>
                      <div>{/**/}</div>
                    </form>
                  </div>
                  <div className="flex w-full items-center gap-x-2 justify-end">
                    <div className="pt-4 md:pt-6">
                      <div className="flex gap-x-2">
                        <button
                          onClick={closeDeposit}
                          disabled={isDisable}
                          data-v-71bb21a6
                          type="button"
                          className="is-button rounded is-button-default"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={addAccount}
                          className="is-button px-3  rounded bg-primary-500 dark:bg-primary-500 hover:enabled:bg-primary-400 dark:hover:enabled:bg-primary-400 text-white hover:enabled:shadow-lg hover:enabled:shadow-primary-500/50 dark:hover:enabled:shadow-primary-800/20 focus-visible:outline-primary-400/70 focus-within:outline-primary-400/70 focus-visible:bg-primary-500 active:enabled:bg-primary-500 dark:focus-visible:outline-primary-400 dark:focus-within:outline-primary-400 dark:focus-visible:bg-primary-500 dark:active:enabled:bg-primary-500"
                        >
                          {isDisable ? (
                            <div>
                              <div className="nui-placeload animate-nui-placeload h-4 w-8 rounded mx-auto"></div>
                            </div>
                          ) : (
                            "Create"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
