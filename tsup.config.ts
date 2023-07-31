import isCI from 'is-ci';
import { defineConfig, type Options } from 'tsup';

const entry = 'src/index.ts';

const sharedConfig = defineConfig({
    name: 'sat-estado-cfdi',
    globalName: 'satEstadoCfdi',
    splitting: false,
    sourcemap: true,
    format: ['esm', 'cjs', 'iife'],
    minify: isCI,
    shims: true,
});

const mainConfig = defineConfig({
    ...sharedConfig,
    entry: {
        'sat-estado-cfdi': entry,
    },
    dts: false,
}) as Options;

const dtsConfig = defineConfig({
    ...sharedConfig,
    entry: {
        'sat-estado-cfdi': entry,
    },
    dts: {
        entry,
        only: true,
        resolve: true,
    },
}) as Options;

export default defineConfig([mainConfig, dtsConfig]);
