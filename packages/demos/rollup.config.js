/** @license
 *  Copyright 2019 - present The Trapeze Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

const env = process.env.ROLLUP_WATCH
  ? 'development'
  : 'production';

export default {
  input: './dist/mount.js',
  output: {
    dir: './site/bundles',
    format: 'esm',
  },
  preserveEntrySignatures: false,
  plugins: [
    ...(
      process.env.ROLLUP_WATCH
        ? [
            livereload({
              watch: 'site',
            })
          ]
        : []
    ),
    resolve({
      modulesOnly: true,
      dedupe: ['firebase', 'jsxstyle'],
    }),
    resolve({
      // preact@10 is failing `modulesOnly: true`.  TODO: find out why.
      resolveOnly: ['preact'],
      dedupe: ['preact'],
      mainFields: ['module'],
    }),
    replace({
      preventAssignment: true, // futureproofing requested by a rollup warning
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};
