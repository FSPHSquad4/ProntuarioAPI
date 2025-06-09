import { REPOSITORY_TYPES } from "./repositories";
import { SERVICE_TYPES } from "./services";
import { CONTROLLER_TYPES } from "./controllers";
import { CORE_TYPES } from "./core";

export const TYPES = {
    ...REPOSITORY_TYPES,
    ...SERVICE_TYPES,
    ...CONTROLLER_TYPES,
    ...CORE_TYPES,
};
