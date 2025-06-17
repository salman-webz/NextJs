"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from '../../components/Sidebar';

interface ProfileData {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }
        const response = await axios.get<ProfileData>(
          "https://dummyjson.com/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Profile</h2>
              {loading && (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              {profile && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 font-medium">Profile</td>
                        <td className="px-6 py-4">
                          <div className="h-16 w-16 relative">
                            <Image
                              src={profile.image}
                              alt={profile.username}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Username</td>
                        <td className="px-6 py-4">{profile.username}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">First Name</td>
                        <td className="px-6 py-4">{profile.firstName}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Last Name</td>
                        <td className="px-6 py-4">{profile.lastName}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Email</td>
                        <td className="px-6 py-4">{profile.email}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Gender</td>
                        <td className="px-6 py-4">{profile.gender}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </ProtectedRoute>
      </main>
    </div>
  );
} 