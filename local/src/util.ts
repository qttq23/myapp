
const path = require('path');
const process = require('process');

export class Util {

    static getPathResource(resourceItem: string): string {

        let srcDir = 'output';
        if (process.env.NODE_ENV === 'development') {
            srcDir = '.';
        }
        return path.resolve(__dirname, '..', srcDir, 'resource', resourceItem);
    }
}

