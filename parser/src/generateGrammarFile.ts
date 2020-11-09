import * as fs from 'fs'
import * as path from 'path'
import * as deepmerge from "deepmerge";

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
    }

    public FindImportInFile(filename): string[] {
        const thePath = path.join(this.basePath, filename);
        if (!fs.existsSync(thePath)) {
            throw `ModuleNotFoundError: No module named '${filename}' (${thePath})`
        }

        const fileStr = fs.readFileSync(thePath).toString()
        const re = /^\/\/ import (.+)$/
        return fileStr.split("\n")
            .map(line => {
                return re.test(line.trim()) ? re.exec(line.trim())[1] : null
            })
            .filter(t => t)
    }

    ResolveImport(startFileNames: string[], currentImports = {}) {
        const imports = startFileNames
            .map(startFile => {
                const newImports = this.FindImportInFile(startFile)

                newImports.forEach(t => {
                    if (Object.keys(currentImports).includes(t + ".grammar"))
                        throw `ModuleImportError: circular import at ${t}->${startFile}->${t}`
                })
                return {[startFile]: newImports}
            })
            .reduce((x, y) => deepmerge(x, y))

        const flat = Object.values(imports)
            .reduce((x, y) => x.concat(y))
            .map(t => t + ".grammar")

        if (flat.length) {
            return this.ResolveImport(flat, deepmerge(imports, currentImports))
        } else {
            return deepmerge(imports, currentImports)
        }
    }

    BuildFile(name: string, toFile: boolean = true): string {
        const imports = Object
            .keys(this.ResolveImport([name]))
            .filter(t => t != name)
            .map(t => fs.readFileSync(path.join(this.basePath, t)).toString())
        const fileStr = fs.readFileSync(path.join(this.basePath, name)).toString()

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
}

