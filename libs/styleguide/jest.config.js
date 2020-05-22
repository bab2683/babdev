module.exports = {
  name: 'styleguide',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/styleguide',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
