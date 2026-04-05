import { useState, useEffect } from "react";
import {
  fetchSavedCards,
  addSavedCard,
  deleteSavedCard,
} from "./../../api/api";

export default function SavedCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  // ✨ New state for the custom confirmation modal
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // To show a loading state while deleting

  const loadCards = () => {
    fetchSavedCards()
      .then((data) => {
        if (data.success) setCards(data.cards);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSavedCard(newCard);
      setIsAdding(false);
      setNewCard({ cardNumber: "", expiryDate: "", cvc: "" });
      loadCards();
    } catch (error) {
      alert("Failed to add card");
    }
  };

  // ✨ Step 1: Just open the modal and set the target ID
  const initiateDelete = (cardId) => {
    setCardToDelete(cardId);
  };

  // ✨ Step 2: Actually execute the deletion when "Confirm" is clicked
  const confirmDelete = async () => {
    if (!cardToDelete) return;
    setIsDeleting(true);
    try {
      await deleteSavedCard(cardToDelete);
      setCardToDelete(null); // Close modal on success
      loadCards();
    } catch (error) {
      alert("Failed to delete card");
    } finally {
      setIsDeleting(false);
    }
  };

  // ✨ Step 3: Cancel deletion
  const cancelDelete = () => {
    setCardToDelete(null);
  };

  if (loading) return <p>Loading cards...</p>;

  return (
    <div className="profile-form-card profile-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="section-header">Saved Payment Methods</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="profile-save-btn primary-btn"
          style={{
            padding: "5px 10px",
            fontSize: "14px",
            marginBottom: "15px",
          }}
        >
          {isAdding ? "Cancel" : "+ Add Card"}
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="add-card-form"
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          {/* ... Your exact same Add Card Form inputs ... */}
          <div className="input-group">
            <label>Card Number</label>
            <input
              type="text"
              maxLength="16"
              required
              placeholder="1234567890123456"
              value={newCard.cardNumber}
              onChange={(e) =>
                setNewCard({ ...newCard, cardNumber: e.target.value })
              }
            />
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label>Expiry Date</label>
              <input
                type="date"
                required
                value={newCard.expiryDate}
                onChange={(e) =>
                  setNewCard({ ...newCard, expiryDate: e.target.value })
                }
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label>CVC</label>
              <input
                type="text"
                maxLength="4"
                required
                placeholder="123"
                value={newCard.cvc}
                onChange={(e) =>
                  setNewCard({ ...newCard, cvc: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            className="profile-save-btn primary-btn"
            style={{ width: "100%", marginTop: "10px" }}
          >
            Save Card Safely
          </button>
        </form>
      )}

      <div className="cards-list">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.card_info_id} className="payment-card-item">
              <button
                onClick={() => initiateDelete(card.card_info_id)} // ✨ Changed to open modal
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                title="Remove Card"
              >
                ✕
              </button>
              <div className="card-chip"></div>
              <div className="card-details">
                <span className="card-number-display">{card.card_number}</span>
                <span className="card-expiry">
                  Exp:{" "}
                  {new Date(card.card_expiration_date).toLocaleDateString(
                    undefined,
                    { month: "2-digit", year: "2-digit" },
                  )}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-cards">No saved cards found.</p>
        )}
      </div>

      {/* ✨ Custom Confirmation Modal Overlay ✨ */}
      {cardToDelete && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              color: "#333",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#d9534f" }}>Remove Card?</h3>
            <p style={{ fontSize: "14px", color: "#555" }}>
              Are you sure you want to delete this payment method? This action cannot be undone.
            </p>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #ccc",
                  background: "transparent",
                  borderRadius: "4px",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  background: "#d9534f",
                  color: "white",
                  borderRadius: "4px",
                  cursor: isDeleting ? "not-allowed" : "pointer",
                  fontWeight: "bold"
                }}
              >
                {isDeleting ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}