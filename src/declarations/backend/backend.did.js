export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'getGameStatus' : IDL.Func([], [IDL.Text], []) });
};
export const init = ({ IDL }) => { return []; };
