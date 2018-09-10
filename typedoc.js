module.exports = {
    out: 'rdfMapper-docs',

    // includes: 'src/main/*',
    exclude: [
        process.cwd() + '/src/main/List.ts',
        process.cwd() + '/src/main/processors/*',
        process.cwd() + '/src/main/annotations/interfaces/IRdfPropertyMetadata.ts',
        process.cwd() + '/src/main/annotations/interfaces/IRdfSubjectMetadata.ts'
    ],

    mode: 'file',
    excludeExternals: true,
    excludeNotExported: true,
    excludePrivate: true,
    theme: 'default'
};
