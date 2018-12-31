let fs = require("fs");
const { spawn } = require('child_process');
let pack1;
let pack2;
beforeAll(()=>{
    console.log("read original packages");
    pack1 = require("./test/prj1/package.json");
    pack2 = require("./test/prj2/package.json");
});

test("test full path",(done)=>{
    const process = spawn("node", ["./", "./test/prj2/package.json", "./test/prj1/package.json"]);
    process.on("close", (exitcode)=>{
        expect(exitcode).toBe(0);
        let pack11 = JSON.parse(fs.readFileSync("./test/prj1/package.json",{encoding:"utf8"}));
        let pack22 = JSON.parse(fs.readFileSync("./test/prj2/package.json",{encoding:"utf8"}));
        expect(pack22.dependencies).toMatchObject({
            "dep2": "^2.0.0",
            "dep3": "^3.0.0"
        });
        expect(pack11.dependencies).toMatchObject({
            "dep1": "^1.0.0",
            "dep2": "^2.0.0",
            "dep3": "^3.0.0"
        });
        done();
    })
});

test("test prj path",(done)=>{
    const process = spawn("node", ["./", "./test/prj2", "./test/prj1"]);
    process.on("close", (exitcode)=>{
        expect(exitcode).toBe(0);
        let pack11 = JSON.parse(fs.readFileSync("./test/prj1/package.json",{encoding:"utf8"}));
        let pack22 = JSON.parse(fs.readFileSync("./test/prj2/package.json",{encoding:"utf8"}));
        expect(pack22.dependencies).toMatchObject({
            "dep2": "^2.0.0",
            "dep3": "^3.0.0"
        });
        expect(pack11.dependencies).toMatchObject({
            "dep1": "^1.0.0",
            "dep2": "^2.0.0",
            "dep3": "^3.0.0"
        });
        done();
    })
});

test("test no dest",(done)=>{
    const process = spawn("node", ["./", "./test/prj2", "./test/prj3"]);
    process.on("close", (exitcode)=>{
        expect(exitcode).toBe(0);
        let pack33 = JSON.parse(fs.readFileSync("./test/prj3/package.json",{encoding:"utf8"}));
        let pack22 = JSON.parse(fs.readFileSync("./test/prj2/package.json",{encoding:"utf8"}));
        expect(pack33.dependencies).toMatchObject({
            "dep2": "^2.0.0",
            "dep3": "^3.0.0"
        });
        expect(pack22.dependencies).toMatchObject({
            "dep2": "^2.0.0",
            "dep3": "^3.0.0"
        });
        done();
    })
});

afterAll(()=>{
    console.log("recover original packages");
    fs.writeFileSync("./test/prj1/package.json", JSON.stringify(pack1, null, " "));
    fs.writeFileSync("./test/prj2/package.json", JSON.stringify(pack2, null, " "));
    fs.unlinkSync("./test/prj3/package.json")
});