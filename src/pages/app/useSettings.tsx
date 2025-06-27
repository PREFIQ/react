import { useEffect, useState } from "react"

export function useSettings() {
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
       const response = await fetch("/settings.json");
        const data = await response.json()
        setSettings(data)
      } catch (err) {
        console.error("Failed to load settings", err)
      }
    }

    fetchSettings()
  }, [])

  return settings
}
