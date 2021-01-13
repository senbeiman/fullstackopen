const parseArguments = (args: Array<string>, minLength: number): Array<number> => {
  if (args.length < minLength + 2) throw new Error('Not enough arguments');
  const parameters = args.slice(2, ).map(p => Number(p));
  if (parameters.includes(NaN)){
    throw new Error('Provided values were not numbers!');
  }
  return parameters;
};

export default parseArguments;