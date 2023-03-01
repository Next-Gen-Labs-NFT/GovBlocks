/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactNode } from "react";
import Link from "next/link";

import { Wallet } from "@/components/wallet";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  return (
    <div className="w-full px-1 text-white antialiased">
      {props.meta}

      <div className="min-h-screen flex flex-col">
        <header className="py-3 border-b border-gray-700">
          <div className="mx-auto max-w-screen-lg flex flex-row justify-between items-center">
            <Link href="/" className="text-2xl font-semibold text-primary-200">
              GovBlocks
            </Link>
            <div className="flex flex-row justify-end items-center">
              <Wallet />
            </div>
          </div>
        </header>

        <main className="py-8 flex flex-col grow">{props.children}</main>
      </div>
    </div>
  );
};

export { Main };
