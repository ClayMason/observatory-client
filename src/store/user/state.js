import { COLLECTION_STATE, MODEL_STATE, FILTER_STATE, PAGINATION_STATE } from '@/store/lib/mixins'

// User Module State
const state = {
  ...COLLECTION_STATE,
  ...MODEL_STATE,
  ...FILTER_STATE,
  ...PAGINATION_STATE
}

export default state
