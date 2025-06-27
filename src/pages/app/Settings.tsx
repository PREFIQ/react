import { useAppContext } from "@/pages/GlobalContext/AppContaxt";

export default function SettingsDisplay() {
  const { settings, updateSettings } = useAppContext();

  if (!settings) return <div>Loading settings...</div>;
// localStorage.removeItem("user_settings");
// window.location.reload();

  return (
    <div>
      <h2>Theme: {settings.theme}</h2>
      <h3>Records per page: {settings.recordsPerPage}</h3>
      <button onClick={() => updateSettings({ theme: "dark" })}>
        Switch to Dark
      </button>
    </div>
  );
}
