module.exports = {
  name: 'styleguide',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/styleguide',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
