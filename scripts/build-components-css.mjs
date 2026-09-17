import { readFileSync, writeFileSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import less from 'less'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const entry = resolve(root, 'src/assets/style/components/index.less')
const out = resolve(root, 'src/assets/style/components.css')

const indexSource = readFileSync(entry, 'utf8')
const imports = [...indexSource.matchAll(/@import\s+'([^']+)';/g)].map((m) =>
  resolve(dirname(entry), m[1]),
)

const hasRules = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '').trim().length > 0

const chunks = []
for (const file of imports) {
  const { css } = await less.render(readFileSync(file, 'utf8'), {
    filename: file,
    javascriptEnabled: true,
  })
  if (!hasRules(css)) continue
  chunks.push(css.trim())
}

const banner = '/* 组件样式汇总：由 npm run build:css 生成，勿手改 */'
writeFileSync(out, banner + '\n\n' + chunks.join('\n\n') + '\n')
console.log(
  `components.less -> components.css (${chunks.length} 个组件, ${(statSync(out).size / 1024).toFixed(1)} kB)`,
)
