// @ts-expect-error – this isn't typed... yet
import Tatooine from "tatooine";

import historicData from "../scrapedOutput/data.json";

const vaccineScraper = {
  engine: "json",
  options: {
    request: {
      url:
        'https://services.arcgis.com/rQj5FcfuWPllzwY8/arcgis/rest/services/Mono_County_Vaccination_Status/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=[{"onStatisticField"%3A"Vacc_Inventory"%2C"outStatisticFieldName"%3A"Vacc_Inventory_sum"%2C"statisticType"%3A"sum"},{"onStatisticField"%3A"Vacc_Admin_2"%2C"outStatisticFieldName"%3A"Vacc_Admin_2_sum"%2C"statisticType"%3A"sum"},{"onStatisticField"%3A"Vacc_Admin_1"%2C"outStatisticFieldName"%3A"Vacc_Admin_1_sum"%2C"statisticType"%3A"sum"}]',
    },
  },
  selectors: {
    root: {
      value: "features",
    },
    vaccinesReceived: { value: "attributes.Vacc_Inventory_sum" },
    vaccineDose1: { value: "attributes.Vacc_Admin_1_sum" },
    vaccineDose2: { value: "attributes.Vacc_Admin_2_sum" },
  },
  // @ts-expect-error – this isn't typed
  fork: ({ sources, error }) => {
    const [source] = sources;
    const { vaccinesReceived, vaccineDose1, vaccineDose2 } = source;

    return {
      sources: {
        vaccinesReceived: parseInt(vaccinesReceived),
        vaccineDose1: parseInt(vaccineDose1),
        vaccineDose2: parseInt(vaccineDose2),
        date: getTimestamp(),
      },
      error,
    };
  },
  metadata: "Mono County vaccination progress",
};

type VaccineDataPoint = {
  vaccinesReceived: number;
  vaccineDose1: number;
  vaccineDose2: number;
  date: string;
  error?: string;
  source?: string;
};

Tatooine([vaccineScraper]).then(
  ([{ sources, metadata, error }]: [
    { sources: VaccineDataPoint; metadata: any; error: any }
  ]): void => {
    const newDatapoint = { ...sources, source: "scraper" };
    if (error) {
      newDatapoint.error = error;
    }
    const prevData: Array<VaccineDataPoint> = historicData.slice();
    const data: Array<VaccineDataPoint> = historicData.slice();
    const lastDatapoint = prevData.pop();

    if (!lastDatapoint || !isSameDatapoint(lastDatapoint, newDatapoint)) {
      data.push(newDatapoint);
    }

    console.log(JSON.stringify(data, null, 2));
  }
);

function isSameDatapoint(a: VaccineDataPoint, b: VaccineDataPoint): boolean {
  return (
    a.date === b.date &&
    a.vaccineDose1 === b.vaccineDose1 &&
    a.vaccineDose2 === b.vaccineDose2 &&
    a.vaccinesReceived === b.vaccinesReceived
  );
}

function getTimestamp(): string {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // lol
  return `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
}
