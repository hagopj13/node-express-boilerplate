const resourceStates = {
  IMPORTED: 'imported',// when image is imported for the first time
  OPEN: 'open',// images for which auction is ongoing
  FINISH: 'finish',// transient state
  SOLD: 'sold',//resource sold state
};
module.exports = {
  resourceStates
};
