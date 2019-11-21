const angularJson = require('../angular.json');
const libsPath = 'libs/';
const appsPath = 'apps/';

function isApp(architect) {
  return architect.build !== undefined;
}

function getAllProjects() {
  return Object.keys(angularJson.projects).filter(project => project.indexOf('e2e') === -1);
}

function getOnlyApps() {
  return getAllProjects().filter(project => isApp(angularJson.projects[project].architect));
}

function getOnlyLibraries() {
  return getAllProjects().filter(project => !isApp(angularJson.projects[project].architect));
}

function getProjectsWithPath() {
  return [...getAppsWithPath(), ...getLibrariesWithPath()];
}

function getAppsWithPath() {
  return getOnlyApps().map(app => ({
    name: app,
    path: `${appsPath}${app}/`
  }));
}

function getLibrariesWithPath() {
  return getOnlyLibraries().map(lib => ({
    name: lib,
    path: `${libsPath}${lib}/`
  }));
}

module.exports = {
  getAllProjects,
  getOnlyApps,
  getOnlyLibraries,
  getProjectsWithPath,
  getAppsWithPath,
  getLibrariesWithPath
};
