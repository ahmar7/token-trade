import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";
import { getsignUserApi } from "../../Api/Service";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
const Swap = () => {
  const [Active, setActive] = useState(false);
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const authUser = useAuthUser();
  const Navigate = useNavigate();
  const [offers, setoffers] = useState(false);
  setTimeout(() => {
    setoffers(true);
  }, 1500);
  useEffect(() => {
    if (authUser().user.role === "user") {
      return;
    } else if (authUser().user.role === "admin") {
      Navigate("/admin/dashboard");
      return;
    }
  }, []);
  return (
    <div className="dark user-bg">
      <div>
        <div className="pb-20">
          <SideBar state={Active} toggle={toggleBar} />
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
          <div className="relative min-h-screen w-full fall overflow-x-hidden pe-4 transition-all duration-300 xl:px-10 lg:max-w-[calc(100%_-_250px)] lg:ms-[250px]">
            <div
              className="styles__Row-sc-gdoee2-3 cHzJyq main-page__exchange-form"
              bis_skin_checked={1}
            >
              <h1 className="styles__Title-sc-gdoee2-4 hPKzUi">
                Crypto Exchange
              </h1>
              <p className="styles__SubTitle-sc-gdoee2-5 cjggAc">
                Free from sign-up, limits, complications
              </p>
              <div
                className="styles__Layout-sc-1nylueb-0 hhzarz"
                bis_skin_checked={1}
              >
                <div
                  className="styles__Layout-sc-y0viyd-0 MbtXp main-form"
                  bis_skin_checked={1}
                >
                  <div
                    className="styles__Tab-sc-1gnwpkl-0 gcuZFM main-page__tabs"
                    bis_skin_checked={1}
                  >
                    <div
                      className="styles__TabLeft-sc-1gnwpkl-1 hIXdPM main-page__tab-crypto"
                      bis_skin_checked={1}
                    >
                      <span>Crypto Exchange</span>
                    </div>
                    <div
                      className="styles__TabRight-sc-1gnwpkl-2 bDjdNq main-page__tab-fiat"
                      bis_skin_checked={1}
                    >
                      <span>Buy/Sell Crypto</span>
                    </div>
                  </div>
                  <div
                    className="styles__Main-sc-pjjdwd-0 bNkCSW"
                    bis_skin_checked={1}
                  >
                    <div
                      className="styles__Row-sc-yro9np-0 dyUeOw main-page__exchange-group main-page__exchange-from"
                      bis_skin_checked={1}
                    >
                      <div
                        className="styles__InputGroup-sc-yro9np-2 gocmbd"
                        bis_skin_checked={1}
                      >
                        <label
                          htmlFor="exchange_form_from_field"
                          className="styles__InputLabel-sc-yro9np-1 bGyWBM"
                        >
                          You send
                        </label>
                        <input
                          inputMode="decimal"
                          id="exchange_form_from_field"
                          className="styles__Input-sc-yro9np-3 hoYCOf"
                          type="text"
                          defaultValue="0.1"
                        />
                      </div>
                      <div
                        className="styles__DropdownGroup-sc-yro9np-8 fiMYjp"
                        bis_skin_checked={1}
                      >
                        <div
                          className="styles__DropdownTickerIcon-sc-yro9np-9 jqzPyT"
                          bis_skin_checked={1}
                        >
                          <img
                            alt="btc"
                            src="https://static.simpleswap.io/images/currencies-logo/btc.svg"
                            className="styles__StyledImage-sc-7mvgp0-0 fayLXv"
                          />
                        </div>
                        <span className="styles__DropdownTickerName-sc-yro9np-10 fA-DWNq">
                          BTC
                        </span>
                        <div
                          className="styles__DropdownArrow-sc-yro9np-7 dSwoFE"
                          bis_skin_checked={1}
                        />
                      </div>
                    </div>
                    <div
                      className="styles__Controls-sc-rj1sl4-0 iKJQUd"
                      bis_skin_checked={1}
                    >
                      <div
                        className="styles__FloatingRow-sc-rj1sl4-3 cODnKT"
                        bis_skin_checked={1}
                      >
                        <div
                          className="styles__FloatingButton-sc-rj1sl4-1 fPJbUv"
                          bis_skin_checked={1}
                        >
                          <div
                            className="styles__FloatingIcon-sc-rj1sl4-2 bBvjxI main-exchange__floating-icon"
                            bis_skin_checked={1}
                          />
                        </div>
                        <div
                          className="styles__FloatingText-sc-rj1sl4-4 wmIOX"
                          bis_skin_checked={1}
                        >
                          Floating rate
                        </div>
                      </div>
                      <div
                        className="styles__SwapRow-sc-rj1sl4-15 gkyJyG"
                        bis_skin_checked={1}
                      >
                        <div
                          className="styles__SwapIcon-sc-rj1sl4-14 fbyucl"
                          bis_skin_checked={1}
                        />
                      </div>
                    </div>
                    <div
                      className="styles__Row-sc-yro9np-0 dyUeOw main-page__exchange-group main-page__exchange-to"
                      bis_skin_checked={1}
                    >
                      <div
                        className="styles__InputGroup-sc-yro9np-2 EBloy"
                        bis_skin_checked={1}
                      >
                        <label
                          htmlFor="exchange_form_to_field"
                          className="styles__InputLabel-sc-yro9np-1 bGyWBM"
                        >
                          You get
                        </label>
                        <div
                          className="styles__InputTo-sc-yro9np-5 bwuFSW"
                          bis_skin_checked={1}
                        >
                          <div
                            className="styles__InputToTilda-sc-yro9np-6 gZEATK"
                            bis_skin_checked={1}
                          />
                          <span className="styles__InputText-sc-yro9np-4 hmwndh">
                            2.01742451
                          </span>
                        </div>
                      </div>
                      <div
                        className="styles__DropdownGroup-sc-yro9np-8 fiMYjp"
                        bis_skin_checked={1}
                      >
                        <div
                          className="styles__DropdownTickerIcon-sc-yro9np-9 jqzPyT"
                          bis_skin_checked={1}
                        >
                          <img
                            alt="eth"
                            src="https://static.simpleswap.io/images/currencies-logo/eth.svg"
                            className="styles__StyledImage-sc-7mvgp0-0 fayLXv"
                          />
                        </div>
                        <span className="styles__DropdownTickerName-sc-yro9np-10 fA-DWNq">
                          ETH
                        </span>
                        <div
                          className="styles__DropdownArrow-sc-yro9np-7 dSwoFE"
                          bis_skin_checked={1}
                        />
                      </div>
                    </div>
                    <button className="styles__Button-sc-pjjdwd-1 gngNIH">
                      Exchange
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
