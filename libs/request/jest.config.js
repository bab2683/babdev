module.exports = {
  name: 'request',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/request',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
