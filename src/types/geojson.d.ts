import { GeoJsonObject } from "geojson";

declare module "*.json" {
  const value: GeoJsonObject;
  export default value;
}