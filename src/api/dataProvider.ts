import { API_ACTIONS } from './constants';
import { handleGetList, handleGetOne } from './handlers/resourceHandlers';

const dataProvider = async (type: string, resource: string, params: any) => {
  switch (type) {
    case API_ACTIONS.GET_LIST:
      return handleGetList(resource, params);
      
    case API_ACTIONS.GET_ONE:
      return handleGetOne(resource, params);
      
    // Add other cases
      
    default:
      throw new Error(`Unsupported action type: ${type}`);
  }
};

export default dataProvider;