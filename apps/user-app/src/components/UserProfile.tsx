"use client";

import { Card } from "@repo/ui/CardTable";
import { Center } from "@repo/ui/Center";
import { useEffect, useState } from "react";
import userFetch from "../app/lib/actions/UserFetch";
import { Button } from "@repo/ui/Button";
import { Input } from "@repo/ui/Input";

interface User {
  number: string;
  id: number;
  email: string | null;
  name: string | null;
}

export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Partial<User>>({});
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    async function fetchUser() {
      const response = await userFetch();
      setUser(response);
      if (response) {
        setFormValues(response); // Pre-fill form values
      }
    }
    fetchUser();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Save updated user data (call an API here if needed)
    console.log("Saving user data:", formValues);
    setUser((prev) => ({ ...prev, ...formValues } as User));
    setEditingField(null);
  };

  const handlePasswordChange = async () => {
    // Update password (call an API here if needed)
    console.log("Updating password:", password);
    setPassword(""); // Clear password field after update
  };

  return (
    <div className="w-full ">
      <Center>
        <Card className="">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">User Profile</h1>
          {user ? (
            <div className="space-y-4">
              {/* Name Field */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Name:</span>
                {editingField === "name" ? (
                  <Input
                    type="text"
                    value={formValues.name || ""}
                    onchange={(e) => handleInputChange("name", e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ) : (
                  <span className="text-gray-800">{user.name || "N/A"}</span>
                )}
                <Button
                  onClick={() =>
                    setEditingField((prev) => (prev === "name" ? null : "name"))
                  }
                  className="text-green-500 hover:underline ml-2"
                >
                  {editingField === "name" ? "Cancel" : "Edit"}
                </Button>
              </div>

              {/* Email Field */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email:</span>
                {editingField === "email" ? (
                  <Input
                    type="email"
                    value={formValues.email || ""}
                    onchange={(e) => handleInputChange("email", e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ) : (
                  <span className="text-gray-800">{user.email || "N/A"}</span>
                )}
                <Button
                  onClick={() =>
                    setEditingField((prev) => (prev === "email" ? null : "email"))
                  }
                  className="text-green-500 hover:underline ml-2"
                >
                  {editingField === "email" ? "Cancel" : "Edit"}
                </Button>
              </div>

              {/* Phone Number Field */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phone:</span>
                {editingField === "number" ? (
                  <Input
                    type="text"
                    value={formValues.number || ""}
                    onchange={(e) => handleInputChange("number", e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                ) : (
                  <span className="text-gray-800">{user.number || "N/A"}</span>
                )}
                <Button
                  onClick={() =>
                    setEditingField((prev) => (prev === "number" ? null : "number"))
                  }
                  className="text-green-500 hover:underline ml-2"
                >
                  {editingField === "number" ? "Cancel" : "Edit"}
                </Button>
              </div>

              {/* Save Button */}
              {editingField && (
                <div className="text-right">
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition duration-200"
                  >
                    Save
                  </Button>
                </div>
              )}

              {/* Password Change Section */}
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-800 mb-2">
                  Change Password
                </h2>
                <div className="flex items-center space-x-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400 flex-1"
                  />
                  <Button
                    onClick={handlePasswordChange}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Loading user data...</div>
          )}
        </Card>
      </Center>
    </div>
  );
};
