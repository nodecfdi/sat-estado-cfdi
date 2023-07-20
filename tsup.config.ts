import isCI from 'is-ci';
import { defineConfig, type Options } from 'tsup';

const entry = 'src/index.ts';

const sharedConfig = defineConfig({
    name: 'rfc',
    globalName: 'rfc',
    splitting: false,
    sourcemap: true,
    format: ['esm', 'cjs', 'iife'],
    minify: isCI,
    shims: true,
});

const mainConfig = defineConfig({
    ...sharedConfig,
    entry: {
        rfc: entry,
    },
    dts: false,
}) as Options;

const dtsConfig = defineConfig({
    ...sharedConfig,
    entry: {
        rfc: entry,
    },
    dts: {
        entry,
        only: true,
        resolve: true,
    },
}) as Options;

export default defineConfig([mainConfig, dtsConfig]);
