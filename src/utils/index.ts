import constants from "../constants";
import mongoose from "mongoose";

//handles database item dynamically based on sort, search, params etc...
const queryConstructor = (query: any, sortBy: string, item: string) => {
  //check for id, userid, _id dynamically
  let params: any = {};
  let array = Object.keys(query);
  for (let i = 0; i < array.length; i++) {
    const value = Object.values(query)[i] as string;
    if (Object.keys(query)[i] === "id") {
      params["_id"] = new mongoose.Types.ObjectId(value);
    } else if (Object.keys(query)[i] === "userId") {
      params[Object.keys(query)[i]] = new mongoose.Types.ObjectId(value);
    } else {
      params[Object.keys(query)[i]] = value;
    }
  }

  //check for limit to ensure pagination
  let { limit, skip, sort, ...restOfParams } = params;
  limit = limit ? Number(limit) : constants.LIMIT;
  skip = skip ? Number(skip) : 0;

  //check for sorting of item
  if (sort === "asc" || sort === "desc") {
    if (typeof sortBy === "object") {
      let first = sortBy[Object.keys(sortBy)[0]];
      let second = sortBy[Object.keys(sortBy)[1]];

      sort =
        sort === "asc"
          ? { [first]: 1, [second]: 1 }
          : { [first]: -1, [second]: -1 };
    } else {
      sort = sort === "asc" ? { [sortBy]: 1 } : { [sortBy]: -1 };
    }
  } else if (sort == undefined) {
    sort = { [sortBy]: 1 };
  } else {
    return {
      error: `Unable to find ${item} might be because of invalid params`,
    };
  }

  return { params: restOfParams, limit, skip, sort };
};

//handles async process and return catches errors and data
const manageAsyncOps = async <T>(
  fn: Promise<T>
): Promise<[Error | null, Awaited<T> | null]> => {
  try {
    const response = await fn;
    return [null, response];
  } catch (error) {
    const err = error as Error;
    return [err, null];
  }
};

export { queryConstructor, manageAsyncOps };
