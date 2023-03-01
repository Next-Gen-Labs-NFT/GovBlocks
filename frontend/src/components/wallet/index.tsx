import { Fragment } from "react";
import Link from "next/link";
import { useWeb3ModalTheme } from "@web3modal/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import truncateEthAddress from "truncate-eth-address";
import { Menu, Transition } from "@headlessui/react";

import { CiWallet } from "react-icons/ci";

const Wallet = () => {
  const { theme, setTheme } = useWeb3ModalTheme();
  const { address, isConnecting, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  theme;
  setTheme({
    themeMode: "dark",
    themeColor: "blue",
    themeBackground: "gradient",
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
            <span>{truncateEthAddress(address ? address : "")}</span>
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
              <div className="p-4 w-full flex flex-col justify-center items-start">
                <button
                  type="button"
                  onClick={() => disconnect()}
                  className="text-base"
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
          onClick={() => connect()}
          className="px-8 py-2 flex items-center space-x-2 border border-gray-700 hover:border-gray-500 rounded-full"
        >
          <CiWallet className="w-6 h-6" />
          <span>{isConnecting ? "Connecting" : "Connect Wallet"}</span>
        </button>
      )}
    </div>
  );
};

export { Wallet };
