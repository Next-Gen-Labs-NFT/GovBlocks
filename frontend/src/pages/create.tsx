import { useState, useEffect } from "react";

import { useAccount } from "wagmi";
import { useSigner } from "wagmi";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { Input } from "@/components/input";
import { TextArea } from "@/components/input/textarea";
import { Wallet } from "@/components/wallet";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";

import { setBrandUri } from "@/utils/web3";
import { getClassNames } from "@/utils/classnames";

const Index = () => {
  const { isConnected } = useAccount();

  const [currentStep, setCurrentStep] = useState(0);
  const [membershipType, setMembershipType] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  const { data: signer } = useSigner();

  useEffect(() => {
    if (isConnected) {
      if (currentStep == 0) setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [isConnected]);

  const steps = [
    {
      id: 0,
      name: "Connect Wallet",
    },
    {
      id: 1,
      name: "Community",
    },
    {
      id: 2,
      name: "Roles",
    },
    {
      id: 3,
      name: "Membership",
    },
    {
      id: 4,
      name: "Governaance",
    },
    {
      id: 5,
      name: "Participation",
    },
  ];

  return (
    <Main
      meta={<Meta title="ETHDenver 2023 Buidlathon Bounties" description="" />}
    >
      <>
        <div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
          <div className="w-full flex flex-row justify-between items-start gap-8">
            <div className="px-8 py-8 w-1/4 flex flex-col justify-center items-center border border-gray-700 rounded-3xl flow-root">
              <ol
                role="list"
                className="flex flex-col justify-center items-center space-y-4"
              >
                {steps.map((step, index) => (
                  <li
                    key={index}
                    className="w-full flex justify-start items-center space-x-4"
                    aria-current="step"
                  >
                    <div
                      className={getClassNames(
                        "w-8 h-8 flex justify-center items-center font-bold rounded-full",
                        currentStep >= step.id ? "bg-primary" : "bg-gray-700"
                      )}
                    >
                      <span>{step.id + 1}</span>
                    </div>
                    <span
                      className={getClassNames(
                        "text-base",
                        currentStep >= step.id
                          ? "text-white font-medium"
                          : "text-gray-700"
                      )}
                    >
                      {step.name}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-8 w-3/4 flex flex-col justify-start items-start space-y-4 border border-gray-700 rounded-3xl">
              {currentStep == 0 && (
                <div className="flex flex-col items-start justify-start space-y-4">
                  <div className="">To get started, connect your wallet.</div>
                  <Wallet />
                </div>
              )}

              {currentStep == 1 && (
                <>
                  <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <label>Name</label>

                    <Input
                      id="name"
                      name="name"
                      outerClassName="w-full"
                      className="w-full bg-transparent text-white focus:outline-none"
                      value={name}
                      onChange={(event: any) => {
                        setName(event.target.value);
                      }}
                      placeholder="e.g. CityDAO"
                    />
                  </div>

                  <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <label>Description</label>
                    <TextArea
                      id="description"
                      name="description"
                      outerClassName="w-full"
                      className="w-full bg-transparent text-white focus:outline-none"
                      rows={6}
                      value={description}
                      onChange={(event: any) => {
                        setDescription(event.target.value);
                      }}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-start space-y-2">
                    <label>Url</label>
                    <Input
                      id="name"
                      name="name"
                      outerClassName="w-80"
                      className="w-full bg-transparent text-white font-bold focus:outline-none text-right"
                      value={url}
                      onChange={(event: any) => {
                        setUrl(event.target.value);
                      }}
                      placeholder="e.g. citydao"
                      preValue="https://"
                      postValue=".govblocks.xyz"
                    />
                  </div>

                  <div className="w-full flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {currentStep == 2 && (
                <>
                  <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <label>Address</label>
                    <Input
                      id="address"
                      name="address"
                      outerClassName="w-full"
                      className="w-full bg-transparent text-white focus:outline-none"
                      value={name}
                      onChange={(event: any) => {
                        setName(event.target.value);
                      }}
                      placeholder="e.g. 0xfdc148069AB770f56b762b508384d515583576a8"
                    />
                  </div>

                  <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <label>Address</label>
                    <Input
                      id="address"
                      name="address"
                      outerClassName="w-full"
                      className="w-full bg-transparent text-white focus:outline-none"
                      value={name}
                      onChange={(event: any) => {
                        setName(event.target.value);
                      }}
                      placeholder="e.g. 0xfdc148069AB770f56b762b508384d515583576a8"
                    />
                  </div>
                </>
              )}

              {currentStep == 3 && (
                <>
                  <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <label className="pb-2 font-semibold">
                      Select membership block
                    </label>

                    <div className="w-full grid grid-cols-4 gap-4">
                      <button
                        type="button"
                        onClick={() => setMembershipType("erc721")}
                        className={getClassNames(
                          "p-4 h-32 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",
                          membershipType == "erc721"
                            ? "border-gray-500"
                            : "border-gray-700"
                        )}
                      >
                        <div className="text-lg font-semibold">NFT</div>
                        <div className="text-sm">ERC 721</div>
                      </button>

                      {membershipType != "" ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setMembershipType("")}
                            className="p-4 h-32 flex flex-col justify-center items-start text-gray-400 border border-gray-800 rounded-3xl"
                          >
                            <div className="text-base font-semibold text-left">
                              I changed my mind
                            </div>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="p-4 h-32 flex flex-col justify-center items-start text-gray-400 border border-gray-800 rounded-3xl">
                            <div className="text-lg font-semibold">NFT</div>
                            <div className="text-sm">ERC 1155</div>
                            <div className="text-xxs">(Coming soon)</div>
                          </div>

                          <div className="p-4 h-32 flex flex-col justify-center items-start text-gray-400 border border-gray-800 rounded-3xl">
                            <div className="text-lg font-semibold">Token</div>
                            <div className="text-sm">ERC 20</div>
                            <div className="text-xxs">(Coming soon)</div>
                          </div>

                          <div className="p-4 h-32 flex flex-col justify-center items-start text-gray-400 border border-gray-800 rounded-3xl">
                            <div className="text-lg font-semibold">
                              Subscription
                            </div>
                            <div className="text-sm">ERC 5643</div>
                            <div className="text-xxs">(Coming soon)</div>
                          </div>

                          <div className="p-4 h-32 flex flex-col justify-center items-start text-gray-400 border border-gray-800 rounded-3xl">
                            <div className="text-lg font-semibold">Lease</div>
                            <div className="text-sm">ERC 4907</div>
                            <div className="text-xxs">(Coming soon)</div>
                          </div>

                          <div className="p-4 h-32 flex flex-col justify-center items-start text-gray-400 border border-gray-800 rounded-3xl">
                            <div className="text-lg font-semibold">
                              Harberger Taxes
                            </div>
                            <div className="text-sm">ERC 5320</div>
                            <div className="text-xxs">(Coming soon)</div>
                          </div>
                        </>
                      )}
                    </div>

                    {membershipType != "" && (
                      <div className="pt-8 w-full flex flex-col justify-start items-start space-y-4">
                        <label className="pb-2 font-semibold">
                          NFT Details
                        </label>

                        <div className="w-full flex flex-col items-start justify-start space-y-2">
                          <label>Image</label>

                          <Input
                            id="name"
                            name="name"
                            outerClassName="w-full"
                            className="w-full bg-transparent text-white focus:outline-none"
                            value={name}
                            onChange={(event: any) => {
                              setName(event.target.value);
                            }}
                            placeholder="e.g. CityDAO Citizen"
                          />
                        </div>

                        <div className="w-full flex flex-col items-start justify-start space-y-2">
                          <label>Name</label>

                          <Input
                            id="name"
                            name="name"
                            outerClassName="w-full"
                            className="w-full bg-transparent text-white focus:outline-none"
                            value={name}
                            onChange={(event: any) => {
                              setName(event.target.value);
                            }}
                            placeholder="e.g. CityDAO Citizen"
                          />
                        </div>

                        <div className="w-full flex flex-col items-start justify-start space-y-2">
                          <label>Description</label>

                          <TextArea
                            id="description"
                            name="description"
                            outerClassName="w-full"
                            className="w-full bg-transparent text-white focus:outline-none"
                            rows={6}
                            value={description}
                            onChange={(event: any) => {
                              setDescription(event.target.value);
                            }}
                          />
                        </div>

                        <div className="w-full flex flex-col items-start justify-start space-y-2">
                          <label>Quantity</label>

                          <Input
                            id="name"
                            name="name"
                            outerClassName="w-64"
                            className="w-full bg-transparent text-white focus:outline-none"
                            value={name}
                            onChange={(event: any) => {
                              setName(event.target.value);
                            }}
                            placeholder="e.g. 10,000"
                          />
                        </div>

                        <div className="w-full flex flex-col items-start justify-start space-y-2">
                          <label>Price</label>

                          <Input
                            id="name"
                            name="name"
                            outerClassName="w-64"
                            className="w-full bg-transparent text-white focus:outline-none"
                            value={name}
                            onChange={(event: any) => {
                              setName(event.target.value);
                            }}
                            placeholder="e.g. 0.5"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {currentStep == 4 && (
                <>
                  <div className="w-full flex flex-col items-start justify-start space-y-2">
                    <label className="pb-2 font-semibold">
                      Select governance block
                    </label>

                    <div className="w-full grid grid-cols-4 gap-4">
                      <button
                        type="button"
                        onClick={() => setMembershipType("erc721")}
                        className={getClassNames(
                          "p-4 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",
                          membershipType == "erc721"
                            ? "border-gray-500"
                            : "border-gray-700"
                        )}
                      >
                        <div className="text-lg font-semibold">NFT Votes</div>
                        <div className="text-sm">1 NFT = 1 Vote</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMembershipType("erc721")}
                        className={getClassNames(
                          "px-4 py-8 flex flex-col justify-center items-start border border-gray-700 rounded-3xl",
                          membershipType == "erc721"
                            ? "border-gray-500"
                            : "border-gray-700"
                        )}
                      >
                        <div className="text-lg font-semibold text-left">
                          NFT & Participation Votes
                        </div>
                        <div className="text-sm text-left">
                          1 NFT + 10 Participation = 2 Votes
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentStep > 1 && (
                <div className="w-full flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="mt-8 px-12 py-2 border border-gray-700 hover:border-gray-500 rounded-full text-base font-bold"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="mt-8 px-12 py-2 bg-primary hover:bg-primary-600 rounded-full text-base font-bold"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </Main>
  );
};

export default Index;
