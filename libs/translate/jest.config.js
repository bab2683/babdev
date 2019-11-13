module.exports = {
  name: 'translate',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/translate',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
