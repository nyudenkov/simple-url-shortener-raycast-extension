// src/commands/RetrieveLinks.tsx

import { useEffect, useState } from "react";
import {
  List,
  ActionPanel,
  Action,
  showToast,
  Toast,
  Clipboard,
  getPreferenceValues,
  useNavigation,
} from "@raycast/api";
import { getShortenedLinks, deleteLink } from "./api-link-service";
import { apiPreferences } from "./preferences";
import ModifyLink from "./modify-link";

export default function RetrieveLinks() {
  const [links, setLinks] = useState([]);
  const preferences = getPreferenceValues<apiPreferences>();
  const { push } = useNavigation();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await getShortenedLinks();
      setLinks(response);
    } catch (error) {
      showToast({ title: "Error", message: "Failed to retrieve links", style: Toast.Style.Failure });
    }
  };

  const handleCopyLink = async (shortCode: string) => {
    const linkToCopy = `${preferences.API_BASE_URL}/public/${shortCode}`;
    await Clipboard.copy(linkToCopy);
    showToast({ title: "Link Copied", message: linkToCopy, style: Toast.Style.Success });
  };
  const handleModifyLink = (link) => {
    push(<ModifyLink id={link.id} originalUrl={link.original_url} shortCode={link.short_code} />);
  };

  const handleDeleteLink = async (shortCode: string) => {
    try {
      await deleteLink(shortCode);
      showToast({ title: "Success", message: "Link deleted", style: Toast.Style.Success });
      fetchLinks(); // Refresh the list after deletion
    } catch (error) {
      showToast({ title: "Error", message: "Failed to delete link", style: Toast.Style.Failure });
    }
  };

  return (
    <List isLoading={links.length === 0}>
      {links.map((link) => (
        <List.Item
          key={link.id}
          title={link.original_url}
          subtitle={link.short_code}
          actions={
            <ActionPanel>
              <Action title="Copy Link" onAction={() => handleCopyLink(link.short_code)} />
              <Action title="Delete Link" onAction={() => handleDeleteLink(link.short_code)} destructive={true} />
              <Action title="Modify Link" onAction={() => handleModifyLink(link)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
