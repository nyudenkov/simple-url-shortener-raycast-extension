// src/commands/ModifyLink.tsx

import { useState } from "react";
import { Form, ActionPanel, Action, showToast, Toast } from "@raycast/api";
import { modifyLink } from "./api-link-service";

interface ModifyLinkProps {
  id: string;
  originalUrl: string;
  shortCode: string;
}

export default function ModifyLink({ id, originalUrl, shortCode }: ModifyLinkProps) {
  const [newOriginalUrl, setNewOriginalUrl] = useState(originalUrl);
  const [newShortCode, setNewShortCode] = useState(shortCode);

  const handleModifyLink = async () => {
    if (!newOriginalUrl || !newShortCode) {
      showToast({ title: "Error", message: "Both URL and short code are required", style: Toast.Style.Failure });
      return;
    }

    try {
      await modifyLink(id, { original_url: newOriginalUrl, short_code: newShortCode });
      showToast({ title: "Success", message: "Link modified successfully", style: Toast.Style.Success });
    } catch (error) {
      showToast({ title: "Error", message: "Failed to modify link", style: Toast.Style.Failure });
    }
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action title="Modify Link" onAction={handleModifyLink} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="newOriginalUrl"
        title="New Original URL"
        placeholder="Enter the new URL"
        value={newOriginalUrl}
        onChange={setNewOriginalUrl}
      />
      <Form.TextField
        id="newShortCode"
        title="New Short Code"
        placeholder="Enter the new short code"
        value={newShortCode}
        onChange={setNewShortCode}
      />
    </Form>
  );
}
