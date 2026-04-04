import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ProfilePage.css";

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
    image_url: "",
    email: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/me`, {
          credentials: "include",
        });

        if (response.status === 401) {
          return navigate("/");
        }

        const data = await response.json();
        if (data.success && data.user) {
          setFormData({
            name: data.user.name || "",
            institute: data.user.institute || "",
            country: data.user.country || "",

            date_of_birth: data.user.date_of_birth
              ? data.user.date_of_birth.split("T")[0]
              : "",
            image_url: data.user.image_url || "",
            email: data.user.email || "",
          });
        }
      } catch (error) {
        setMessage({ type: "error", text: "Failed to load profile data." });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [apiUrl, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`${apiUrl}/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          institute: formData.institute,
          country: formData.country,
          date_of_birth: formData.date_of_birth || null,
          image_url: formData.image_url,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
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

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Personal Information</h1>
        <p className="profile-subtitle">
          Update your profile details and public information.
        </p>

        {message.text && (
          <div className={`profile-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-avatar-section">
            <img
              src={
                formData.image_url || "https://placehold.co/150x150?text=Avatar"
              }
              alt="User Avatar"
              className="profile-avatar"
            />
            <div className="input-group">
              <label htmlFor="image_url">Profile Image URL</label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/your-image.jpg"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email (Read-only)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="readonly-input"
            />
          </div>

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

          <div className="form-row">
            <div className="input-group">
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

            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="e.g. Bangladesh"
              />
            </div>
          </div>

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

          <div className="profile-actions">
            <button
              type="submit"
              className="profile-save-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
