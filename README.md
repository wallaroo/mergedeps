# Merge Deps
a simple script to merge dependencies from a package to another.
Useful in lerna repositories were an src package builds a dist package

## install
```
npm i -D mergedeps
```

## usage

for example in a lerna monorepo you can install at conainer level and add a script like:

```json
{
  "name":"my-monorepo",
  "devDependencies":{
    "lerna":"latest",
    "mergedeps":"latest"
  },
  "scripts":{
    "lerna":"lerna",
    "bootstrap":"npm mergedeps && lerna bootstrap",
    "mergedeps":"mergedeps ./packages/myPack-src ./packages/myPack-dist"
  }
}
```