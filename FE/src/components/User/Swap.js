import React, { useEffect, useState } from "react";
import SideBar from "../../layout/UserSidebar/SideBar";
import { getsignUserApi } from "../../Api/Service";
import { toast } from "react-toastify";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import UserHeader from "./UserHeader";
import "./style.css";
import axios from "axios";
const Swap = () => {
  const [Active, setActive] = useState(false);
  let toggleBar = () => {
    if (Active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  const [UserData, setUserData] = useState(true);

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
  //
  //

  const [isLoading, setisLoading] = useState(true);

  const [liveBtc, setliveBtc] = useState(null);
  const [btcBalance, setbtcBalance] = useState(0);

  // const getCoins = async (data) => {
  //   let id = data._id;
  //   try {
  //     const response = await axios.get(
  //       "https://api.coindesk.com/v1/bpi/currentprice.json"
  //     );
  //     const userCoins = await getCoinsUserApi(id);

  //     if (response && userCoins.success) {
  //       setUserData(userCoins.getCoin);
  //       // setUserTransactions;
  //       let val = response.data.bpi.USD.rate.replace(/,/g, "");
  //       console.log("val: ", val);
  //       setliveBtc(val);
  //       setisLoading(false);
  //       // tx
  //       const btc = userCoins.getCoin.transactions.filter((transaction) =>
  //         transaction.trxName.includes("bitcoin")
  //       );
  //       const btccomplete = btc.filter((transaction) =>
  //         transaction.status.includes("completed")
  //       );
  //       let btcCount = 0;
  //       let btcValueAdded = 0;
  //       for (let i = 0; i < btccomplete.length; i++) {
  //         const element = btccomplete[i];
  //         btcCount = element.amount;
  //         btcValueAdded += btcCount;
  //       }
  //       setbtcBalance(btcValueAdded);
  //       // tx
  //       // tx
  //       const eth = userCoins.getCoin.transactions.filter((transaction) =>
  //         transaction.trxName.includes("ethereum")
  //       );
  //       const ethcomplete = eth.filter((transaction) =>
  //         transaction.status.includes("completed")
  //       );
  //       let ethCount = 0;
  //       let ethValueAdded = 0;
  //       for (let i = 0; i < ethcomplete.length; i++) {
  //         const element = ethcomplete[i];
  //         ethCount = element.amount;
  //         ethValueAdded += ethCount;
  //       }
  //       setethBalance(ethValueAdded);
  //       // tx
  //       // tx
  //       const usdt = userCoins.getCoin.transactions.filter((transaction) =>
  //         transaction.trxName.includes("tether")
  //       );
  //       const usdtcomplete = usdt.filter((transaction) =>
  //         transaction.status.includes("completed")
  //       );
  //       let usdtCount = 0;
  //       let usdtValueAdded = 0;
  //       for (let i = 0; i < usdtcomplete.length; i++) {
  //         const element = usdtcomplete[i];
  //         usdtCount = element.amount;
  //         usdtValueAdded += usdtCount;
  //       }
  //       setusdtBalance(usdtValueAdded);
  //       // tx

  //       const totalValue = (
  //         btcValueAdded * liveBtc +
  //         ethValueAdded * 2241.86 +
  //         usdtValueAdded
  //       ).toFixed(2);

  //       //
  //       const [integerPart, fractionalPart] = totalValue.split(".");

  //       const formattedTotalValue = parseFloat(integerPart).toLocaleString(
  //         "en-US",
  //         {
  //           style: "currency",
  //           currency: "USD",
  //           minimumFractionDigits: 0,
  //           maximumFractionDigits: 0,
  //         }
  //       );

  //       //
  //       setfractionBalance(fractionalPart);
  //       return;
  //     } else {
  //       toast.dismiss();
  //       toast.error(userCoins.msg);
  //     }
  //   } catch (error) {
  //     toast.dismiss();
  //     toast.error(error);
  //   } finally {
  //   }
  // };
  //
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
            <div className="col-xxl-3 col-xl-6" bis_skin_checked={1}>
              <div className="card card-f" bis_skin_checked={1}>
                <div className="card-header" bis_skin_checked={1}>
                  <h4 className="card-title">Convert </h4>
                </div>
                <div className="card-body" bis_skin_checked={1}>
                  <form
                    method="post"
                    name="myform"
                    className="currency_validate trade-form row g-3"
                  >
                    <div className="col-12" bis_skin_checked={1}>
                      <label className="form-label">From</label>
                      <div className="input-group" bis_skin_checked={1}>
                        <select className="form-control" name="method">
                          <option value="bank">USDT</option>
                          <option value="master">ETH</option>
                          <option value="master">BTC</option>
                        </select>
                        <input
                          type="text"
                          name="currency_amount"
                          className="form-control"
                          placeholder="0.0214 BTC"
                        />
                      </div>
                    </div>
                    <div className="col-12" bis_skin_checked={1}>
                      <label className="form-label">To</label>
                      <div className="input-group" bis_skin_checked={1}>
                        <select className="form-control" name="method">
                          <option value="bank">USDT</option>
                          <option value="master">ETH</option>
                          <option value="master">BTC</option>
                        </select>
                        <input
                          type="text"
                          name="currency_amount"
                          className="form-control"
                          placeholder="0.0214 BTC"
                        />
                      </div>
                    </div>
                    <p className="mb-0">
                      1 USD ~ 0.000088 BTC{" "}
                      <a href="#">
                        Expected rate <br />
                        No extra fees
                      </a>
                    </p>
                    <button
                      type="button"
                      className="btn btn-success btn-block"
                      data-toggle="modal"
                      data-target="#convertModal"
                    >
                      Convert Now
                    </button>
                  </form>
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
