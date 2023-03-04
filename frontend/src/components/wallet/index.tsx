import { Menu, Transition } from "@headlessui/react";
import { useWeb3Modal, useWeb3ModalTheme } from "@web3modal/react";
import Link from "next/link";
import { Fragment } from "react";
import { CiWallet } from "react-icons/ci";
import truncateEthAddress from "truncate-eth-address";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { getClassNames } from "@/utils/classnames";

const magicApiKey = "pk_live_F1E6EA2157085CE7";

type IWalletProps = {
  bigView: boolean;
};

const Wallet = (props: IWalletProps) => {
  const { theme, setTheme } = useWeb3ModalTheme();
  const { address, isConnecting, isConnected } = useAccount();
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  theme;
  setTheme({
    themeMode: "dark",
    themeColor: "teal",
    themeBackground: "themeColor",
  });

  return (
    <div className="flex flex-row justify-end items-center">
      {isConnected && (
        <Menu as="div" className="flex-shrink-0 relative">
          <Menu.Button className="px-8 py-2 flex items-center space-x-2 border border-gray-700 hover:border-gray-500 font-bold rounded-full">
            <img
              src={`https://cdn.stamp.fyi/avatar/${address}?s=140`}
              className="rounded-full w-6 h-6 object-cover"
            />
            <span>{truncateEthAddress(address || "")}</span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 p-1 shadow-xl bg-gray-900 border border-gray-800 rounded-3xl shadow-xl">
              <div className="p-4 w-44 flex flex-col justify-center items-start">
                <button
                  type="button"
                  onClick={() => disconnect()}
                  className="font-semibold hover:font-bold text-gray-200 hover:text-white"
                >
                  Disconnect
                </button>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}

      {!isConnected && (
        <button
          type="button"
          onClick={() => open()}
          className={getClassNames(
            "flex flex-col justify-center items-center space-y-4 border border-gray-700 hover:border-gray-500 ",
            props.bigView ? "px-32 py-12 rounded-3xl" : "px-8 py-2 rounded-full"
          )}
        >
          {props.bigView && (
            <div className="">
              To view data or get started, please connect your wallet
            </div>
          )}
          <div className="flex items-center font-semibold space-x-2">
            <CiWallet className="w-6 h-6" />
            <span>{isConnecting ? "Connecting" : "Connect Wallet"}</span>
          </div>
        </button>
      )}
    </div>
  );
};

export { Wallet };
