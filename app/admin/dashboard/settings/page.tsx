"use client";

import { useState, useEffect } from "react";
import { getLogo, updateLogo } from "@/lib/actions";
import { AdminNav } from "@/components/admin/AdminNav";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      const currentLogo = await getLogo();
      setLogo(currentLogo);
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleUpload = async (url: string) => {
    setLogo(url);
    await updateLogo(url);
  };

  const handleDelete = async () => {
    setLogo(null);
    await updateLogo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 bg-primary text-white border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium">Site Settings</h3>
            <p className="mt-1 max-w-2xl text-sm opacity-90">Manage global website configurations.</p>
          </div>
          
          <div className="p-6">
            <div className="max-w-xl">
              <h4 className="text-md font-bold text-gray-900 mb-4">Website Logo</h4>
              <p className="text-sm text-gray-500 mb-6">
                Upload a custom logo to display in the menu bar and footer. If no logo is set, the text "Syon Enterprises" will be displayed.
              </p>
              
              {loading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="bg-gray-200 h-20 w-48 rounded"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  {logo ? (
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-md p-4 bg-gray-50 inline-block">
                        <img src={logo} alt="Current Logo" className="max-h-16 object-contain" />
                      </div>
                      <div className="flex space-x-4">
                        <CloudinaryUpload
                          onUpload={handleUpload}
                          buttonText="Replace Logo"
                          folder="waterproofing/settings"
                        />
                        <Button variant="outline" onClick={handleDelete} className="text-red-600 border-red-200 hover:bg-red-50">
                          Remove Logo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4 text-sm font-medium text-gray-900">Current Logo: <span className="font-bold text-primary italic">Syon Enterprises (Text)</span></div>
                      <CloudinaryUpload
                        onUpload={handleUpload}
                        buttonText="Upload Image Logo"
                        folder="waterproofing/settings"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
