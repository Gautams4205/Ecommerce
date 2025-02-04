import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import Navbar from "../features/navbar/Navbar";

function UserProfilePage() {
  return (
    <Navbar>
      <h1 className="mx-auto text-2xl">My Profile</h1>
      <UserProfile></UserProfile>
    </Navbar>
  );
}

export default UserProfilePage;
