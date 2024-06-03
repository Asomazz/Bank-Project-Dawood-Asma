import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext";
import { getProfile, updateProfile } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = React.createRef();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: profileData, refetch } = useQuery({
    queryKey: ["profile", user],
    queryFn: () => getProfile(user),
  });

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
      setPreviewImage(
        profileData.image
          ? `https://react-bank-project.eapi.joincoded.com/${profileData.image}`
          : null
      );
    }
  }, [profileData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleClear = () => {
    setProfileImage(null);
    setPreviewImage(
      profile.image
        ? `https://react-bank-project.eapi.joincoded.com/${profile.image}`
        : null
    );
    fileInputRef.current.value = null;
  };

  const updateProfileMutation = useMutation({
    mutationFn: (formData) => updateProfile(formData, user),
    onSuccess: async (updatedUser) => {
      setUser(updatedUser);
      setProfile(updatedUser);
      setProfileImage(null);
      setPreviewImage(
        updatedUser.image
          ? `https://react-bank-project.eapi.joincoded.com/${updatedUser.image}`
          : null
      );
      handleClear();
      toast.success(t("profileUpdated"));
      refetch();
    },
    onError: () => {
      toast.error(t("updateFailed"));
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSave = async () => {
    if (profileImage) {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("image", profileImage);
      updateProfileMutation.mutate(formData);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700 font-lively">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-80 text-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-48 h-48 rounded-full mx-auto mb-4"
            />
          ) : (
            <div className="w-48 h-48 rounded-full mx-auto mb-4 bg-gray-300" />
          )}
          <h2 className="text-2xl mb-2 text-orange-600">{profile.username}</h2>
          <p className="text-lg text-gray-600">
            {t("balance")}: {profile.balance}{" "}
            <span className="text-orange-600">BTC</span>
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("uploadProfilePicture")}
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
            />
          </div>
          <div className="mt-4 flex justify-between space-x-2">
            <button
              onClick={handleSave}
              className={`mt-4 w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none flex items-center justify-center ${
                !profileImage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!profileImage || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4zm2 5.292A7.962 7.962 0 014 12h2c0 1.105.289 2.145.812 3.071l-1.562 2.221z"
                    ></path>
                  </svg>
                  {t("processing")}
                </>
              ) : (
                t("save")
              )}
            </button>
            {previewImage && (
              <button
                onClick={handleClear}
                className="mt-4 w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none ml-2"
              >
                {t("clear")}
              </button>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <a href="/about" className="text-gray-700 hover:text-orange-600">
              {t("about")}
            </a>
            <a href="/privacy" className="text-gray-700 hover:text-orange-600">
              {t("privacyPolicy")}
            </a>
            <a
              href="/licensing"
              className="text-gray-700 hover:text-orange-600"
            >
              {t("licensing")}
            </a>
            <a href="/contact" className="text-gray-700 hover:text-orange-600">
              {t("contact")}
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          {t("allRightsReserved")}
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
