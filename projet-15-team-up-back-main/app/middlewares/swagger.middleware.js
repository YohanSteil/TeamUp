import expressJSDocSwagger from 'express-jsdoc-swagger';
import * as url from 'url';

const options = {
  info: {
    version: '1.0.0',
    title: "Team'Up",
    description: "Api Team'Up",
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: url.fileURLToPath(new URL('../', import.meta.url)),
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: true,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/api/docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
};

export default (app) => expressJSDocSwagger(app)(options);
