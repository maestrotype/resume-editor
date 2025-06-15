import { useState } from "react";

export function useAIAutogen() {
    const [loading, setLoading] = useState(false);

    const fetchAutogen = async ({ title, position, skills }) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/api/autogen", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, position, skills })
            });

            const result = await response.json();

            if (!response.ok || result?.error) {
                throw new Error(result?.error || "Autogen API error");
            }

            return result;
        } catch (error) {
            console.error("Autogen error:", error);
            return undefined;
        } finally {
            setLoading(false);
        }
    };

    return [fetchAutogen, loading];
}  
