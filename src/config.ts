// config.ts
export interface AppConfig {
  backendUrl: string;
}

let config: AppConfig = { backendUrl: "http://localhost:8000" }; // valeur par défaut

export async function loadConfig(): Promise<AppConfig> {
  try {
    const response = await fetch("/constant.json");
    if (!response.ok) {
      throw new Error("Impossible de charger constant.json");
    }
    config = await response.json();
  } catch (error) {
    console.error("Erreur lors du chargement de la configuration :", error);
  }
  return config;
}

export function getConfig(): AppConfig {
  return config;
}
