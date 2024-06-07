import terser from "@rollup/plugin-terser";
import {createRequire} from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");
const year = new Date().getFullYear();
const now = (new Date()).toUTCString();
const banner = `/**!
 * ${pkg.name} (built ${now})
 * 
 * @copyright ${year} Qwil
 * @license ${pkg.license}
 * @version ${pkg.version}
 */
 `;
const defaultOutBase = {
  compact: true,
  banner,
  name: pkg.name,
};
const cjOutBase = {...defaultOutBase, compact: false, format: "cjs", exports: "named"};
const esmOutBase = {...defaultOutBase, format: "esm"};
const umdOutBase = {...defaultOutBase, format: "umd"};
const minOutBase = {name: pkg.name, plugins: [terser()], sourcemap: true};


export default [
  {
    input: "./src/index.js",
    output: [
      {
        ...cjOutBase,
        file: `dist/${pkg.name}.cjs`
      },
      {
        ...esmOutBase,
        file: `dist/${pkg.name}.esm.js`
      },
      {
        ...esmOutBase,
        ...minOutBase,
        file: `dist/${pkg.name}.esm.min.js`
      },
      {
        ...umdOutBase,
        file: `dist/${pkg.name}.js`,
        name: "QwilApiTransport"
      },
      {
        ...umdOutBase,
        ...minOutBase,
        file: `dist/${pkg.name}.min.js`,
        name: "QwilApiTransport"
      }
    ]
  }
];
