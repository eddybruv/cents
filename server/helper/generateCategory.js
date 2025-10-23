export const generateCategory = async (tx) => {
  let systemPrompt = `You are an expert budgeting assistant.  
  Your ONLY task is to categorize a bank transaction based on its description.  

  You will be given:
  - A list of valid categories (below)
  - A single transaction description  

  You MUST:
  1. Return exactly ONE JSON object.  
  2. Include only the matching category name and its numeric ID.  
  3. Output NOTHING except the JSON. No explanations, text, or formatting.  

  Valid Categories:
  1 - Groceries  
  2 - Dining Out  
  3 - Transport  
  4 - Shopping  
  5 - Bills & Utilities  
  6 - Entertainment  
  7 - Health  
  8 - Income  
  9 - Other  
  10 - Travel  

  ---

  **Examples**

  Transaction: "TRADER JOES #501"  
  {"category": "Groceries", "id": 1}

  Transaction: "NETFLIX.COM"  
  {"category": "Entertainment", "id": 6}

  Transaction: "PG&E BILL"  
  {"category": "Bills & Utilities", "id": 5}

  ---

  STRICT RULES:
  - Respond ONLY with valid JSON (no code blocks, no markdown).  
  - Use the closest category match based on common sense.  
  - If unsure, always default to {"category": "Other", "id": 9}.
`;

  const userPrompt = `Transaction: "${tx.name}, Amount: ${tx.amount}, Merchant: ${tx.merchant_name || "N/A"}"`;

  const endpoint = "http://localhost:11434/api/generate";

  const payload = {
    model: "phi3:mini",
    format: "json",
    system: systemPrompt,
    prompt: userPrompt,
    stream: false,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Error from LLM API:", response.statusText);
      return { category: "Other", id: 9 };
    }

    const data = await response.json();
    const categoryJson = data.response;

    return JSON.parse(categoryJson);
  } catch (error) {
    console.error("Error generating category:", error);
    return { category: "Other", id: 9 };
  }
};
