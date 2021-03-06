import chalk from 'chalk'
import fs from 'fs'
import shell from 'shelljs'
import { promisify } from 'util'
import { execAsync } from './util.js'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stagedGitFiles = require('staged-git-files')

testChangedFiles().catch(() => process.exit(1))

interface FileChanges {
  filename: string
  status: 'Added' | 'Copied' | 'Deleted' | 'Modified' | 'Renamed' | 'Type-Change' | 'Unmerged' | 'Unknown'
}

async function testChangedFiles() {
  const stagedFiles: FileChanges[] = await stagedGitFiles()
  const stagedFilePaths = stagedFiles.map((f) => f.filename)

  if (stagedFilePaths.length === 0) {
    return
  }

  const packageNames = await promisify(fs.readdir)('./packages')

  let code = 0
  for (const packageName of packageNames) {
    const changedFiles = stagedFilePaths
      .filter((f) => f.startsWith(`packages/${packageName}/`))
      .filter((f) => !f.endsWith('.md') && !f.endsWith('package.json'))
      .map((f) => f.replace(`packages/${packageName}/`, ''))

    code += await runTestsForPackage(packageName, changedFiles)
  }

  process.exit(code)
}

async function runTestsForPackage(packageName: string, changedFiles: string[]) {
  if (changedFiles.length === 0) {
    return 0
  }

  shell.echo(
    `Running tests for ${chalk.yellow(`${changedFiles.length}`)} changed file(s) of package '${chalk.cyan(
      packageName,
    )}'...`,
  )

  return await execAsync(
    `yarn test`,
    false,
    `--scope @shaval/${packageName}`,
    `--stream=false`,
    `--`,
    `--`,
    `--passWithNoTests`,
    `--findRelatedTests`,
    ...changedFiles,
  )
}
