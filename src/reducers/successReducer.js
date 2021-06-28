export default ( state = { }, action ) => {
    const { type, payload } = action;
    
    if ( type === 'RESET_MESSAGES' ) return { }
    
    const matches = /(.*)_(REQUEST|SUCCESS)/.exec(type);
  
    if (!matches) return state;
  
    const [, requestName, requestState] = matches;

    const value = requestState === 'SUCCESS' ? payload.data.message : null;
    if ( !value ) return { ...state }

    return {
      ...state,
      [requestName]: value,
    };
  };