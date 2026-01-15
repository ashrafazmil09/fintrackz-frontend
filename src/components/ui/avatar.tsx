import { useState } from "react";

interface AvatarProps {
  profilePictureUrl?: string;
  fullName?: string;
  onFileSelect?: (file: File) => void;
  size?: number;
  editing?: boolean;
}

export default function Avatar({
  profilePictureUrl,
  fullName,
  onFileSelect,
  size = 96,
  editing = false,
}: AvatarProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const words = name.split(" ");
    return words.length > 1
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    setError(null);
    setPreview(URL.createObjectURL(file));

    if (onFileSelect) {
      onFileSelect(file); // notify parent
    }
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        id="avatar-input"
        onChange={handleChange}
        className="hidden"
      />

      {/* Avatar container */}
      <div
        className="rounded-full border-2 border-orange-500 overflow-hidden cursor-pointer flex items-center justify-center"
        style={{ width: size, height: size }}
        onClick={() =>
          editing && document.getElementById("avatar-input")?.click()
        }
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-600 text-sm">Loading...</span>
          </div>
        ) : preview ? (
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-full h-full object-cover"
          />
        ) : profilePictureUrl ? (
          <img
            src={
              profilePictureUrl.startsWith("http")
                ? profilePictureUrl
                : `http://localhost:8080${profilePictureUrl}`
            }
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-3xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}
          >
            {getInitials(fullName || "")}
          </div>
        )}
      </div>

      {/* Small "+" button */}
      {/* Only show + button if editing */}
      {editing && (
        <button
          type="button"
          onClick={() => document.getElementById("avatar-input")?.click()}
          className="absolute bottom-0 right-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm border-4 border-white"
        >
          +
        </button>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
