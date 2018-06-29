'use strict';

var config = {
  projectName: 'taorong',
  date: '2018-6-28',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']
    },
    typescript: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
        baseUrl: '.',
        declaration: false,
        experimentalDecorators: true,
        jsx: 'react',
        jsxFactory: 'Nerv.createElement',
        module: 'commonjs',
        moduleResolution: 'node',
        noImplicitAny: false,
        noUnusedLocals: true,
        outDir: './dist/',
        preserveConstEnums: true,
        removeComments: false,
        rootDir: '.',
        sourceMap: true,
        strictNullChecks: true,
        target: 'es6'
      },
      include: ['src/**/*'],
      exclude: ['node_modules'],
      compileOnSave: false
    }
  },
  defineConstants: {},
  weapp: {},
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    }
  }
};

module.exports = function (merge) {
  if ("development" === 'development') {
    return merge({}, config, require("./dev.js"));
  }
  return merge({}, config, require("./prod.js"));
};