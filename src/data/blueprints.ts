import { BlueprintItem } from '../types';
import { CORE_BLUEPRINTS, ADDITIONAL_BLUEPRINTS } from './blueprintsBase';
import {
  queryCatalog,
  getBlueprintById,
  getBlueprintByGlobalIndex,
  getBlueprintMetadataIndex,
  TOTAL_CATALOG_COUNT,
  ORIGINAL_BLUEPRINTS_COUNT,
  AI_BLUEPRINTS_COUNT
} from './catalogEngine';

export {
  CORE_BLUEPRINTS,
  ADDITIONAL_BLUEPRINTS,
  queryCatalog,
  getBlueprintById,
  getBlueprintByGlobalIndex,
  getBlueprintMetadataIndex,
  TOTAL_CATALOG_COUNT,
  ORIGINAL_BLUEPRINTS_COUNT,
  AI_BLUEPRINTS_COUNT
};

// INITIAL_BLUEPRINTS returns a curated initial memory-safe array for default consumers
export const INITIAL_BLUEPRINTS: BlueprintItem[] = queryCatalog({ page: 1, limit: 100 }).items;
