import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/auth";
import { formatDate } from "../components/ui/dateformat";
import {
  EnvelopeIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  IdentificationIcon,
  UserIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import Avatar from "../components/ui/avatar";

interface ProfileData {
  username: string;
  email: string;
  role?: string;
  fullName?: string;
  dob?: string;
  phone?: string;
  address?: string;
  companyName?: string;
  joinDate?: string;
  profilePictureUrl?: string;
}

export default function Profile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setData({
          username: profile.username,
          email: profile.email,
          role: profile.role,
          fullName: profile.fullName,
          dob: profile.dateOfBirth,
          phone: profile.phoneNumber,
          address: profile.address,
          companyName: profile.companyName,
          joinDate: profile.createdAt,
          profilePictureUrl: profile.profilePictureUrl,
        });
      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!data) return <p>Failed to load profile.</p>;

  const roleColor = data.role === "ADMIN" ? "bg-orange-500" : "bg-gray-400";

  const getInitials = (name: string) => {
    const words = name.split(" ");
    return words.length > 1
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  const handleChange = (field: keyof ProfileData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (data?.fullName) formData.append("fullName", data.fullName);
      if (data?.dob) formData.append("dateOfBirth", data.dob);
      if (data?.phone) formData.append("phoneNumber", data.phone);
      if (data?.address) formData.append("address", data.address);
      if (data?.companyName) formData.append("companyName", data.companyName);
      if (selectedImage) formData.append("profilePicture", selectedImage);

      await updateProfile(formData);

      setEditing(false);
      setSelectedImage(null);
      setPreviewImage(null);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-gray-800">Profile</h1>

      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center gap-2">
        {/* Avatar */}
        <Avatar
          profilePictureUrl={data.profilePictureUrl}
          fullName={data.fullName}
          onFileSelect={(file) => setSelectedImage(file)}
          size={220}
          editing={editing}
        />

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

        {/* Edit / Save Button */}
        {!editing ? (
          <button
            className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-4 mt-6">
            <button
              className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-6 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}

        <hr className="w-full border-gray-200 my-6" />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Full Name */}
          <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Full Name</p>
            {editing ? (
              <input
                className="border p-2 rounded-md w-full"
                value={data.fullName || ""}
                onChange={(e) => handleChange("fullName", e.target.value)}
              />
            ) : (
              <p className="text-gray-800 font-medium">
                {data.fullName || "-"}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Date of Birth</p>
            {editing ? (
              <input
                type="date"
                className="border p-2 rounded-md w-full"
                value={data.dob?.split("T")[0] || ""}
                onChange={(e) => handleChange("dob", e.target.value)}
              />
            ) : (
              <p className="text-gray-800 font-medium">
                {formatDate(data.dob, "date")}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Phone Number</p>
            {editing ? (
              <input
                type="tel"
                className="border p-2 rounded-md w-full"
                value={data.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            ) : (
              <p className="text-gray-800 font-medium">{data.phone || "-"}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Address</p>
            {editing ? (
              <input
                className="border p-2 rounded-md w-full"
                value={data.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            ) : (
              <p className="text-gray-800 font-medium">{data.address || "-"}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Company Name</p>
            {editing ? (
              <input
                className="border p-2 rounded-md w-full"
                value={data.companyName || ""}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
            ) : (
              <p className="text-gray-800 font-medium">
                {data.companyName || "-"}
              </p>
            )}
          </div>

          {/* Join Date (read-only) */}
          <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Join Date</p>
            <p className="text-gray-800 font-medium">
              {formatDate(data.joinDate, "date")}
            </p>
          </div>

          {/* Email (read-only) */}
          <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-gray-800 font-medium">{data.email}</p>
          </div>

          {/* Role (read-only) */}
          <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Role</p>
            <p className="text-gray-800 font-medium">{data.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
