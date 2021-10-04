// import the robotjs library
var robot = require(`robotjs`);

function main() {

    console.log("Starting...");
    sleep(4000);


    // basic infinite loop use ctr + c to stop
    while (true) {
        var tree = findTree();

        //Scenario for not finding a tree, exiting the loop.
        if (tree == false) {
            console.log(`could not find a tree`);
            break;
        }

        // chopping trees
        robot.moveMouseSmooth(tree.x, tree.y);
        robot.mouseClick();
        sleep(8000);




        dropLogs1();
    }    

    console.log("Done.");

}



function dropLogs1() {
    
    var inventory_x = 2341;
    var inventory_y = 1135;

    var confirmationofdrop_x = 295;
    var confirmationofdrop_y = 1307;

    // dropping log 1 from inventory
    robot.moveMouseSmooth(inventory_x, inventory_y);
    robot.mouseClick(`right`);
    robot.moveMouseSmooth(inventory_x, inventory_y + 40);
    robot.mouseClick();
    sleep(2500);
    robot.moveMouseSmooth(confirmationofdrop_x, confirmationofdrop_y);
    robot.mouseClick();

}

function testscreenCapture() {

    // taking a screenshot
    var img = robot.screen.capture(0, 0, 2560, 1440);
    var pixel_color = img.colorAt(21, 17);

    console.log(pixel_color);
}

function findTree() {
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);

    var tree_colors = ["866336", "8C6839", "8D6939", "352716", "231A0E", "4D391F"];


    for (var i = 0; i < 1000; i++) {
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);

        var sample_color = img.colorAt(random_x, random_y);

        if (tree_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;

            console.log("Found a tree at: " + screen_x + ", " + screen_y + " color " + sample_color);
            return {x: screen_x, y: screen_y};
        }
        

    }
    
    // No matching tree color in screen
    return false;
}


function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



main();