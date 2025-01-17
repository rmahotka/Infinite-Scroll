import vue from "eslint-plugin-vue";

export default [
    {
        files: ["*.vue", "*.js", "*.ts"],
        plugins: {
            vue,
        },
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        rules: {
            "vue/no-multiple-template-root": "off",
            "vue/html-indent": ["error", 2],
            "vue/max-attributes-per-line": ["error", { singleline: 3 }],
        },
    },
];
