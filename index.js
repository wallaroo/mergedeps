#! /usr/bin/env node

var src = process.argv[2];
var dest = process.argv[3];
var fs = require("fs");
var path = require("path");
if (src && dest){
  src = path.normalize(src);
  dest = path.normalize(dest);
  if (!src.endsWith("package.json")){
    src = path.join(src, "package.json");

  }
  if (!dest.endsWith("package.json")){
    dest = path.join(dest, "package.json");
  }
  var srcPackPath = path.join(process.cwd(), src);
  var dstPackPath = path.join(process.cwd(), dest);
  
  console.log("copying from " + srcPackPath + " to " + dstPackPath)
  var srcPack = require(srcPackPath);
  var dstPack;
  if (fs.existsSync(dstPackPath)){
    dstPack = require(dstPackPath);
  }else{
    dstPack = Object.assign({}, srcPack);
  }
  dstPack.dependencies = Object.assign(dstPack.dependencies, srcPack.dependencies);
  fs.writeFileSync(dstPackPath, JSON.stringify(dstPack, null, " "));
  console.log("copied from " + srcPackPath + " to " + dstPackPath)
}else{
  console.warn("nothing copied")
}

