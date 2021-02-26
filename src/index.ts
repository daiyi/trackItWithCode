// @ts-expect-error – this isn't typed... yet
import Tatooine from "tatooine";

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
    return { sources: { ...sources[0], date: new Date() }, error };
  },
  metadata: "Mono County vaccination progress",
};

// @ts-expect-error Tatooine isn't typed
Tatooine([vaccineScraper]).then(([data]) => {
  console.log(JSON.stringify(data, null, 2));
});
