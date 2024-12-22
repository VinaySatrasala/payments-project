"use client";

import { useState, useEffect } from "react";
import { Card } from "@repo/ui/CardTable";
import { Center } from "@repo/ui/Center";
import { Button } from "@repo/ui/Button";
import { Input } from "@repo/ui/Input";
import userFetch from "../app/lib/actions/UserFetch";
import { userUpdate } from "../app/lib/actions/UserUpdate";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string | null;
  email: string | null;
  number: string;
}

export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Partial<User>>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const response = await userFetch();
      setUser(response);
      if (response) {
        setFormValues(response);
      }
    }
    fetchUser();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (user) {
      const updatedUser = { ...user, ...formValues };
      await userUpdate(updatedUser);
      setUser(updatedUser);
      setEditingField(null);
    }
  };

  return (
    <div className="w-full min-h-screen p-8">
      <Center>
        <Card className="w-full max-w-2xl p-6 bg-gray-800 shadow-md rounded-lg">
          <div className="flex items-start space-x-6">
            {/* Avatar */}
            <Avatar />
            {/* Profile Content */}
            <div className="flex-1 space-y-4">
              <h1 className="text-2xl font-semibold text-white">User Profile</h1>

              {["name", "email", "number"].map((field) => (
                <div key={field} className="flex items-center justify-between">
                  <span className="text-gray-300 capitalize">{field}:</span>
                  {editingField === field ? (
                    <Input
                      type={field === "email" ? "email" : "text"}
                      value={formValues[field as keyof User] || ""}
                      onchange={(e) => handleInputChange(field, e.target.value)}
                      className="flex-1 mx-2 bg-gray-700 text-white"
                    />
                  ) : (
                    <span className="text-white">
                      {user?.[field as keyof User] || "N/A"}
                    </span>
                  )}
                  <Button
                    onClick={() =>
                      setEditingField((prev) => (prev === field ? null : field))
                    }
                    className="text-black bg-white hover:bg-green-300 px-3"
                  >
                    {editingField === field ? "Cancel" : "Edit"}
                  </Button>
                </div>
              ))}

              {editingField && (
                <div className="text-right">
                  <Button
                    onClick={handleSave}
                    className="bg-green-500 text-black px-4 py-2 rounded shadow hover:bg-green-600"
                  >
                    Save
                  </Button>
                </div>
              )}

              {/* Change Password Button */}
              <div className="mt-6">
                <Button
                  onClick={() => router.push("/change-password")}
                  className="bg-red-500 text-black px-4 py-2 rounded shadow hover:bg-red-600"
                >
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

function Avatar(): JSX.Element {
  return (
    <div className="w-24 h-24 flex-shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="white"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
  );
}
