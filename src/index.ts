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

const historyScraper = {
  engine: "json",
  options: {
    request: {
      url:
        "https://raw.githubusercontent.com/daiyi/trackItWithCode/master/scrapedOutput/data.json",
      // url: "https://jsonplaceholder.typicode.com/todos",
    },
  },
  selectors: {
    vaccinesReceived: { value: "vaccinesReceived" },
    vaccineDose1: { value: "vaccineDose1" },
    vaccineDose2: { value: "vaccineDose2" },
    date: { value: "date" },
  },
  metadata: "historical data",
};

type VaccineDataPoint = {
  vaccinesRecieved: number;
  vaccineDose1: number;
  vaccineDose2: number;
  date: string;
};

const data: Array<VaccineDataPoint> = [];

const promise = Tatooine([historyScraper]).then(
  ([{ sources, metadata, error }]: [
    { sources: Array<VaccineDataPoint>; metadata: any; error: any }
  ]): Array<VaccineDataPoint> => {
    // sources: array of objects, e.g:
    // [
    //   {
    //     vaccinesReceived: '10528',
    //     vaccineDose1: '4694',
    //     vaccineDose2: '3368'
    //   }
    // ]
    return sources;
  }
);

const promise2 = Tatooine([vaccineScraper]).then(
  ([{ sources, metadata, error }]: [
    { sources: VaccineDataPoint; metadata: any; error: any }
  ]): Array<VaccineDataPoint> => {
    // sources: object, e.g:
    //   {
    //     vaccinesReceived: '10528',
    //     vaccineDose1: '4694',
    //     vaccineDose2: '3368'
    //   }
    const datapoint = [{ ...sources, metadata }];
    return datapoint;
  }
);

Promise.all([promise, promise2]).then((values) => {
  const data = values.reduce(
    (accumulated, currentArray) => accumulated.concat(currentArray),
    []
  );
  console.log(JSON.stringify(data, null, 2));
});
