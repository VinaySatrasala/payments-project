"use client";

import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/CardTable";
import { Input } from "@repo/ui/Input";
import { Label } from "@repo/ui/Label";
import { ChangeEvent, useState } from "react";
import { passwordChange } from "../app/lib/actions/PasswordChange";

export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    // Call PasswordChange action
    const response = await passwordChange({ oldPassword, newPassword });

  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-gray-800 shadow-lg rounded-lg">
      <div className="m-4 space-y-2">
        <div className="text-white text-lg font-semibold">
          <Label>Enter Old Password</Label>
        </div>
        <Input
          type="password"
          placeholder="Old Password"
          onchange={(event: ChangeEvent<HTMLInputElement>) =>
            setOldPassword(event.target.value)
          }
          className="bg-gray-700 text-white"
        />
      </div>
      <div className="m-4 space-y-2">
        <div className="text-white text-lg font-semibold">
          <Label>Enter New Password</Label>
        </div>
        <Input
          type="password"
          placeholder="New Password"
          onchange={(event: ChangeEvent<HTMLInputElement>) =>
            setNewPassword(event.target.value)
          }
          className="bg-gray-700 text-white"
        />
      </div>
      <div className="m-4 space-y-2">
        <div className="text-white text-lg font-semibold">
          <Label>Confirm New Password</Label>
        </div>
        <Input
          type="password"
          placeholder="Confirm New Password"
          onchange={(event: ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(event.target.value)
          }
          className="bg-gray-700 text-white"
        />
      </div>
      <div className="text-center">
        <Button
          onClick={handlePasswordChange}
          className="w-1/2 p-2 bg-red-500 text-black hover:bg-red-600 m-2"
        >
          Change Password
        </Button>
      </div>
    </Card>
  );
};
