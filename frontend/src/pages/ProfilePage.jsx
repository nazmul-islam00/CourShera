import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "./../api/api";
import { getNames } from "country-list";
import "./../styles/ProfilePage.css";
import SavedCards from "../components/saved-cards/SavedCards";
import EnrollmentCard from "../components/enrollment-card/EnrollmentCard";

const COUNTRIES = getNames();

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    institute: "",
    country: "",
    date_of_birth: "",
    email: "",
  });

  const [dbImageUrl, setDbImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchUserProfile();

        if (data.success && data.user) {
          setFormData({
            name: data.user.name || "",
            institute: data.user.institute || "",
            country: data.user.country || "",
            date_of_birth: data.user.date_of_birth
              ? data.user.date_of_birth.split("T")[0]
              : "",
            email: data.user.email || "",
          });
          setDbImageUrl(data.user.image_url);
        }
      } catch (error) {
        setMessage({ type: "error", text: "Failed to load profile data." });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("institute", formData.institute);
      submitData.append("country", formData.country);
      if (formData.date_of_birth)
        submitData.append("date_of_birth", formData.date_of_birth);
      if (imageFile) submitData.append("image", imageFile);

      const data = await updateUserProfile(submitData);

      if (data.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setDbImageUrl(data.user.image_url);
        setImageFile(null);
        setPreviewUrl("");

        window.dispatchEvent(
          new CustomEvent("profileUpdated", { detail: data.user }),
        );
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to update profile.",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  const displayName = formData.name || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="profile-container">
      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="profile-card profile-card-sidebar">
            <h3 className="sidebar-title">Personal details</h3>

            <div
              className="avatar-wrapper"
              onClick={() => fileInputRef.current.click()}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              {imageFile ? (
                <img
                  src={previewUrl}
                  alt="Avatar Preview"
                  className="profile-avatar"
                />
              ) : dbImageUrl ? (
                <img
                  src={dbImageUrl}
                  alt="User Avatar"
                  className="profile-avatar"
                />
              ) : (
                <div
                  className="fallback-avatar-circle"
                  style={{
                    backgroundColor: "#e65100",
                    color: "white",
                    fontSize: "40px",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  {initial}
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  color: "#0056d2",
                  marginTop: "12px",
                  fontWeight: "600",
                }}
              >
                Change photo
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/webp"
              style={{ display: "none" }}
            />

            <h2
              className="sidebar-name"
              style={{
                textAlign: "center",
                marginTop: "16px",
                marginBottom: "20px",
              }}
            >
              {displayName}
            </h2>
          </div>
        </div>

        <div className="profile-main-content">
          {message.text && (
            <div className={`profile-message ${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-form-card profile-card">
              <h2 className="section-header">Account Details</h2>
              <div className="input-group">
                <label htmlFor="email">Email (Read-only)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="readonly-input"
                  style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="profile-form-card profile-card">
              <h2 className="section-header">Basic Information</h2>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div
                className="form-row"
                style={{ display: "flex", gap: "20px" }}
              >
                <div className="input-group" style={{ flex: 1 }}>
                  <label htmlFor="institute">Institute / Organization</label>
                  <input
                    type="text"
                    id="institute"
                    name="institute"
                    value={formData.institute}
                    onChange={handleChange}
                    placeholder="e.g. University of Science"
                  />
                </div>

                <div className="input-group" style={{ flex: 1 }}>
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    style={{
                      padding: "10px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "15px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      width: "100%",
                      fontFamily: "inherit",
                    }}
                  >
                    <option value="" disabled>
                      Select a country
                    </option>
                    {COUNTRIES.map((countryName) => (
                      <option key={countryName} value={countryName}>
                        {countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="profile-form-card profile-card">
              <h2 className="section-header">Additional Details</h2>
              <div className="input-group">
                <label htmlFor="date_of_birth">Date of Birth</label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              className="profile-actions"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                type="submit"
                className="profile-save-btn primary-btn"
                disabled={saving}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#0056d2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        <div className="profile-right-column">
          <div style={{ marginTop: "0px" }}>
            <SavedCards />
          </div>

          <div style={{ marginTop: "16px" }}>
            <EnrollmentCard />
          </div>
        </div>
      </div>
    </div>
  );
}
