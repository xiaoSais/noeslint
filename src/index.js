#!/usr/bin/env node
const program = require('commander')

const fs = require('fs')
const path = require('path')
const emoji = require('node-emoji')

const traverse = function (dir, isDelete) {
    // 先判断是否是目录
    if(fs.statSync(dir).isDirectory()) {
        let fileList = fs.readdirSync(dir)
        for(let i = 0; i<fileList.length; i++) {
            traverse(path.join(dir, fileList[i]), isDelete)
        }
    } else {
        let data = fs.readFileSync(dir, 'utf8');
        const hasSrc = data.match(/<script.*>/gi)
        const hasTemplate = data.match(/<template.*>/gi)
        let newData
        if(hasSrc) {
            if(isDelete) {
                newData = data.replace(/\n\/\* eslint-disable \*\//g, '')
            } else {
                newData = data.replace(hasSrc, hasSrc + '\n' + '/* eslint-disable */' )
            }
            data = newData
        }
        if(hasTemplate) {
            if(isDelete) {
                newData = data.replace(/\n<!-- eslint-disable -->/g, '')
            } else {
                newData = data.replace(hasTemplate[0], hasTemplate[0] + '\n' + '<!-- eslint-disable -->')
            }
        }
        if(newData) {
            fs.writeFileSync(dir, newData, 'utf8')
        }        
    }
}

program
    .version('1.0.0', '-v, --version')
    .option('-d, --dir', 'delete ESlint ')
    .option('-r, --remove', 'remove delete')
program.parse(process.argv)

if(program.dir) {
    for(let i = 0; i < program.args.length; i++) {
        let emoji1 = emoji.random().emoji
        let constr = `开始写入no-eslint头' + '文件夹: ${program.args[i]} + ${emoji1}`
        console.log(constr)
        traverse(program.args[i])
    }
}
if(program.remove) {
    for(let i = 0; i < program.args.length; i++) {
        let emoji1 = emoji.random().emoji
        let constr = `开始删除no-eslint头，文件夹: ${program.args[i]} ${emoji1} ${emoji1} ${emoji1}`
        console.log(constr)
        traverse(program.args[i], true)
    }
}