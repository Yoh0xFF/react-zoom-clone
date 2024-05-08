const config = {
    bracketSpacing: true,
    bracketSameLine: true,
    singleQuote: true,
    jsxSingleQuote: true,
    trailingComma: 'all',
    semi: true,
    tabWidth: 2,
    useTabs: false,
    arrowParens: 'always',
    importOrder: ['^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    plugins: [
        '@trivago/prettier-plugin-sort-imports',
        'prettier-plugin-packagejson',
    ],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};

export default config;
