import Link from "next/link";

import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const Settings = () => {
  const modules = [
    {
      id: "BrandFacet",
      url: "/settings/brand",
      name: "Brand",
      description: "Brand related description",
      active: true,
    },
    {
      id: "RoleFacet",
      url: "/settings/roles",
      name: "Roles",
      description: "Roles related description",
      active: true,
    },
    {
      id: "MembershipFacet",
      url: "/settings/memberships",
      name: "Membership",
      description: "Membership related description",
      active: true,
    },
    {
      id: "GovernanceFacet",
      url: "/settings/governance",
      name: "Governance",
      description: "Governance related description",
      active: true,
    },
    {
      id: "ParticipationFacet",
      url: "/settings/participation",
      name: "Participation",
      description: "Participation related description",
      active: true,
    },
  ];
  return (
    <Main meta={<Meta title="" description="" />}>
      <div className="mx-auto max-w-screen-lg w-full flex flex-col justify-start items-center grow">
        <div className="pt-6 pb-4 w-full">
          <label className="text-xl font-semibold">Modules</label>
        </div>
        <div className="py-2 w-full grid grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <Link
              key={index}
              href={module.url}
              className="p-4 border border-gray-700 hover:border-gray-400 rounded-3xl"
            >
              <div className="font-semibold text-left">{module.name}</div>
              <div className="pt-4 text-sm text-left overflow-hidden line-clamp-6">
                {module.description}
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-8 pb-2 w-full">
          <label className="pt-4 pb-2 text-xl font-semibold">
            Module Store
          </label>
        </div>
        <div className="py-2 w-full">
          <div className="p-4 text-gray-400 border border-gray-700 rounded-3xl">
            <div className="font-semibold text-left">
              More modules coming soon
            </div>
            <div className="pt-4 text-sm text-left overflow-hidden line-clamp-6">
              Once the module store is live, DAOs will be able to switch modules
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Settings;
