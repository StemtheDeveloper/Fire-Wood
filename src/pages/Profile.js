// src/components/Profile.js
import React, { useState, useEffect } from "react";
import { auth, storage } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const response = await axios.get(
            `http://localhost:5000/api/users/${firebaseUser.uid}`
          );
          setMongoUser(response.data);
          setNewUsername(response.data.username || firebaseUser.displayName);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewProfilePic(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      let profilePicUrl = user.photoURL;

      // Upload new profile picture if selected
      if (newProfilePic) {
        const storageRef = ref(
          storage,
          `profile-pics/${user.uid}/${newProfilePic.name}`
        );
        await uploadBytes(storageRef, newProfilePic);
        profilePicUrl = await getDownloadURL(storageRef);
      }

      // Update MongoDB user data
      const response = await axios.put(
        `http://localhost:5050/api/users/${user.uid}`,
        {
          username: newUsername,
          profilePicture: profilePicUrl,
        }
      );

      setMongoUser(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will handle the state update
      window.location.reload();
    } catch (err) {
      console.error("Error signing out:", err);
      setError("Failed to sign out");
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (!user)
    return (
      <div className="profile-error">Please log in to view your profile</div>
    );

  return (
    <div className="profile-container">
      <div className="profile-card">
        {!isEditing ? (
          <>
            <div className="profile-header">
              <img
                src={mongoUser?.profilePicture || user.photoURL}
                alt="Profile"
                className="profile-image"
              />
              <div className="profile-info">
                <h1>{mongoUser?.username || user.displayName}</h1>
                <p>{user.email}</p>
              </div>
            </div>

            {mongoUser && (
              <div className="profile-stats">
                <div className="stat-item">
                  <h3>Wins</h3>
                  <p>{mongoUser.stats.wins}</p>
                </div>
                <div className="stat-item">
                  <h3>Draws</h3>
                  <p>{mongoUser.stats.draws}</p>
                </div>
                <div className="stat-item">
                  <h3>Losses</h3>
                  <p>{mongoUser.stats.losses}</p>
                </div>
              </div>
            )}

            <div className="button-group">
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                Edit Profile
              </button>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdateProfile} className="edit-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="profilePic">Profile Picture</label>
              <input
                type="file"
                id="profilePic"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              {newProfilePic && (
                <p className="file-name">{newProfilePic.name}</p>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="button-group">
              <button
                type="submit"
                className="save-button"
                disabled={updateLoading}
              >
                {updateLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
