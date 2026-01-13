import { useEffect, useState } from "react";
import api from "../api/api";
import {
  EnvelopeIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  IdentificationIcon,
  UserIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

interface ProfileData {
  username: string;
  email: string;
  role?: string;
  fullName?: string;
  dob?: string;
  phone?: string;
  address?: string;
  department?: string;
  joinDate?: string;
}

export default function Profile() {
  const defaultData: ProfileData = {
    username: "johndoe",
    email: "johndoe@example.com",
    role: "ROLE_ADMIN",
    fullName: "John Doe",
    dob: "1990-05-15",
    phone: "+60 123 456 789",
    address: "123 Main Street, Kuala Lumpur, Malaysia",
    department: "Finance Department",
    joinDate: "2022-01-10",
  };

  const [data, setData] = useState<ProfileData>(defaultData);

  useEffect(() => {
    api
      .get("/me")
      .then((res) =>
        setData({
          ...defaultData,
          ...res.data,
        }),
      )
      .catch(() => setData(defaultData));
  }, []);

  const roleColor =
    data.role === "ROLE_ADMIN" ? "bg-orange-500" : "bg-gray-400";

  // Get initials for avatar
  const getInitials = (name: string) => {
    const words = name.split(" ");
    return words.length > 1
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  const infoItems = [
    { icon: UserIcon, label: "Full Name", value: data.fullName },
    { icon: CalendarIcon, label: "Date of Birth", value: data.dob },
    { icon: PhoneIcon, label: "Phone", value: data.phone },
    { icon: MapPinIcon, label: "Address", value: data.address },
    { icon: BuildingOfficeIcon, label: "Department", value: data.department },
    { icon: CalendarIcon, label: "Join Date", value: data.joinDate },
    { icon: EnvelopeIcon, label: "Email", value: data.email },
    {
      icon: IdentificationIcon,
      label: "Role",
      value: data.role?.replace("ROLE_", ""),
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-gray-800">Profile</h1>

      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center gap-6">
        {/* Top Circular Avatar */}
        <div
          className="w-24 h-24 flex items-center justify-center rounded-full text-3xl font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #f97316, #fb923c)",
          }}
        >
          {data.fullName ? getInitials(data.fullName) : "U"}
        </div>

        {/* Username / Email / Role */}
        <span className="text-2xl font-bold text-gray-800">
          {data.username}
        </span>
        <span className="text-gray-600">{data.email}</span>
        {data.role && (
          <span
            className={`inline-block text-sm text-white px-3 py-1 rounded-full ${roleColor}`}
          >
            {data.role.replace("ROLE_", "")}
          </span>
        )}

        {/* Edit Profile Button */}
        <button className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition">
          Edit Profile
        </button>

        {/* Divider */}
        <hr className="w-full border-gray-200 my-6" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {infoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition cursor-default"
              >
                <Icon className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <p className="text-gray-800 font-medium">
                    {item.value || "-"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-gray-400 text-sm text-center">
          All information is confidential and visible only to you.
        </p>
      </div>
    </div>
  );
}
