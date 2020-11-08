import * as fs from 'fs'
import * as path from 'path'


export class Generator {
    public basePath: string
    public baseFile: string
    public buildPath: string

    constructor(basePath: string, buildPath: string = "build") {

        fs.statSync(basePath)
        this.basePath = path.resolve(basePath)

        this.buildPath = path.join(this.basePath, buildPath)
        if (!fs.existsSync(this.buildPath)) {
            fs.mkdirSync(this.buildPath)
        }

        try {
            const fileRes = fs.readFileSync(path.join(this.basePath, 'base.grammar'))
            this.baseFile = fileRes.toString()
        } catch (e) {
            this.baseFile = ''
        }
    }

    BuildFile(name: string, toFile: boolean = true): string {
        const fileStr = fs.readFileSync(path.join(this.basePath, name)).toString()
        const re = /^import (.+)$/
        // TODO 解析import
        const imports = Array.from(new Set(
                fileStr.split("\n")
                .map(line => {
                    return re.test(line.trim()) ? re.exec(line.trim())[1] : null
                })
                .filter(t => t)))
            .map(filename => {
                return this.BuildFile(filename + ".grammar")
            })
        const newFile = fileStr + "\n\n//---import---\n\n" + imports.join("\n\n\n")
        if (toFile)
            fs.writeFileSync(path.join(this.buildPath, name), newFile)
        return newFile
    }

    BuildAll(): string[] {
        const files = fs.readdirSync(this.basePath).filter(t => t.endsWith('grammar'))
        files.forEach(t => this.BuildFile(t))
        return files
    }

    merge(mainFile: string, outPath: string) {
        const filenames = [
            mainFile,
            ...fs.readdirSync(this.basePath).filter(t => t.endsWith('grammar') && t != mainFile)
        ]
        const fileContents = filenames.map(t => this.BuildFile(t, false))
        fs.writeFileSync(outPath, fileContents.join("\n\n//-----merge-----\n\n"))
    }
}

