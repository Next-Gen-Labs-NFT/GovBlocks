import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useAccount } from "wagmi";

const MenuDrop = () => {
	const { isConnected } = useAccount();

	return (
		<div className="flex flex-row justify-end items-center">
			{isConnected && (
				<Menu as="div" className="flex-shrink-0 relative">
					<Menu.Button className="w-[42px] h-[42px] flex justify-center items-center text-2xl border border-gray-700 hover:border-gray-500 rounded-full">
						<BsThreeDots className="w-5 h-5" />
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
							<div className="p-4 w-56 flex flex-col justify-center items-start space-y-2 font-semibold hover:font-bold">
								<Link
									href="/dashboard"
									className="text-gray-200 hover:text-white"
								>
									Dashboard
								</Link>
								<Link
									href="/settings"
									className="text-gray-200 hover:text-white"
								>
									Settings
								</Link>
								<Link
									href="/dashboard/proposals/create"
									className="text-gray-200 hover:text-white"
								>
									Create Proposal
								</Link>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			)}
		</div>
	);
};

export { MenuDrop };
