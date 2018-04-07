/* eslint-disable */

module.exports = {
    "collectCoverageFrom": [
        "app/**/*.{js,jsx}",
        "!app/**/*.test.{js,jsx}",
        "!app/*/RbGenerated*/*.{js,jsx}",
        "!app/app.js",
        "!app/routes.js",
        "!server/*.js"
    ],
    "browser": true,
    "testURL": "http://localhost",
    "coverageThreshold": {
        "global": {
            "statements": 30,
            "branches": 30,
            "functions": 30,
            "lines": 30,
        }
    },
    "moduleDirectories": [
        "app",
        "node_modules"
    ],
    "moduleFileExtensions": [
        "jsx",
        "js",
        "json"
    ],
    "transformIgnorePatterns": [
        "<rootDir>/node_modules/(?!common-frontend-components/)"
    ],
    "modulePathIgnorePatterns": [
        "<rootDir>/build/",
    ],
    "moduleNameMapper": {
        ".*\\.(css|less|styl|scss|sass)$": "<rootDir>/internals/mocks/cssModule.js",
            ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|font|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/internals/mocks/image.js"
    },
    
    "testRegex": "app/.*\\.test\\.js$"
};
