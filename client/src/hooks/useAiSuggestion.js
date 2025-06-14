import { useState } from "react";

export const useAiSuggestion = () => {
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async (text) => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("AI response error");

      const result = await response.json();
      return result.suggestion;
    } catch (err) {
      console.error("AI Suggestion Error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchSuggestion, loading };
};
