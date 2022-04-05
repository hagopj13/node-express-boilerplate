import { ModelType } from "@typegoose/typegoose/lib/types";
import { Document } from "mongoose";

/* eslint-disable no-param-reassign */
export type PaginateFilter = any

export type PaginateOptions = {
  sortBy?: string;
  populate?: string;
  limit?: number;
  page?: number;
}

export const paginate = (schema: any) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  async function paginate(
    this: ModelType<any>,
    filter: PaginateFilter,
    options: PaginateOptions
  ) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria: string[] = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && options.limit > 0 ? options.limit : 10;
    const page = options.page && options.page > 0 ? options.page : 1;
    const skip = (page - 1) * limit;

    // mongoose does not like undefined values
    for (let key in filter) {
      if (filter[key] === undefined) {
        delete filter[key]
      }
    }

    const countPromise = this.countDocuments(filter).exec();
    let docsQuery = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        type Populate = {
          path: string,
          populate: string | Populate,
        }
        let arr = populateOption
        .split('.')
        .reverse()
        .reduce((a, b) => ({ path: b, populate: a }), undefined as unknown as any) as Populate

        docsQuery = docsQuery.populate(arr)
      });
    }

    const values = await Promise.all([countPromise, docsQuery.exec()]);
    const [totalResults, results] = values;
    const totalPages = Math.ceil(totalResults / limit);
    const result = {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
    return result;
  }

  schema.statics.paginate = paginate;

  return paginate;
};