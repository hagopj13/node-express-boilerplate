const getQueryOptions = query => {
  const sort = query.sort || '+createdAt';
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  return { sort, limit, skip };
};

module.exports = {
  getQueryOptions,
};
