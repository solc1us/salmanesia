import React, { useState } from "react";
import { useAppData } from "../context/AppDataContext.jsx";

export default function TicketValidationModal({ activeEventId, onClose }) {
  const { checkInTicket } = useAppData();
  const [ticketInput, setTicketInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleValidation = (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!ticketInput.trim()) {
      setFeedback({ success: false, message: "Masukkan ID / Kode Tiket!" });
      return;
    }

    try {
      const updatedRegistration = checkInTicket(activeEventId, ticketInput.trim());
      setFeedback({
        success: true,
        message: `Verifikasi Berhasil! Peserta: ${updatedRegistration.participantName}`,
      });
      setTicketInput("");
    } catch (err) {
      setFeedback({ success: false, message: err.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold text-lg">Validasi Tiket Manual</h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-gray-500 hover:text-black font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleValidation} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Kode Tiket (Ticket ID)
            </label>
            <input
              type="text"
              placeholder="Contoh: tkt-001 atau UUID"
              value={ticketInput}
              onChange={(e) => setTicketInput(e.target.value)}
              className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700"
          >
            Verifikasi & Check-In
          </button>
        </form>

        {feedback && (
          <div
            className={`p-3 rounded text-sm ${
              feedback.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
}