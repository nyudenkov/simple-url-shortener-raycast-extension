// src/commands/ShortenLink.tsx

import { useState } from "react";
import { ActionPanel, Form, Action, showToast, Toast } from "@raycast/api";
import { shortenLink } from "./api-link-service";

export default function ShortenLink() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortCode, setShortCode] = useState("");

  const handleShortenLink = async () => {
    if (!originalUrl) {
      showToast({ title: "Error", message: "Original URL is required", style: Toast.Style.Failure });
      return;
    }

    try {
      const response = await shortenLink({ original_url: originalUrl, short_code: shortCode });
      showToast({ title: "Success", message: `Shortened URL: ${response.short_code}`, style: Toast.Style.Success });
    } catch (error) {
      console.log(error);
      showToast({ title: "Error", message: "Failed to shorten URL", style: Toast.Style.Failure });
    }
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action title="Shorten URL" onAction={handleShortenLink} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="url"
        title="Original URL"
        placeholder="Enter the URL to shorten"
        value={originalUrl}
        onChange={setOriginalUrl}
      />
      <Form.TextField
        id="code"
        title="Short Code (Optional)"
        placeholder="Enter a custom short code"
        value={shortCode}
        onChange={setShortCode}
      />
    </Form>
  );
}
