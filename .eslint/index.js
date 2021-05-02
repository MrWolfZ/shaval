module.exports = {
  rules: {
    'import-export-extensions': {
      create: function (context) {
        return {
          ImportDeclaration: checkFileExtension,
          ExportNamedDeclaration: checkFileExtension,
          ExportAllDeclaration: checkFileExtension,
        }

        function checkFileExtension(node) {
          const source = node.source

          // bail if the declaration doesn't have a source (e.g. "export { foo }") or source is not relative,
          if (!source || !source.value.startsWith('.')) {
            return
          }

          if (!source.value.endsWith(`.js`)) {
            context.report({
              node: source,
              message: `Missing file extension ".js" for import or export "${source.value}"`,
            })
          }
        }
      },
    },
  },
}
