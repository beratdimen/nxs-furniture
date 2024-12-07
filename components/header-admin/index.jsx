import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="welcome-text">Welcome, Admin!</div>
      <div className="user-actions">
        <button>Notifications</button>
        <button>Profile</button>
      </div>
    </header>
  );
}
