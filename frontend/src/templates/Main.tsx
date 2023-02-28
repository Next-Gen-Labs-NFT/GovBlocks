/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactNode } from "react";

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full bg-black px-1 text-white antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-xl">
      <header>
        <div className="pt-16 pb-8">
          <h1 className="text-4xl font-bold">
            ETHDenver 2023 Buidlathon 
          </h1>
        </div>
      </header>

      <main className="content py-5 text-xl">{props.children}</main>
    </div>
  </div>
);

export { Main };
