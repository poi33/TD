import * as PIXI from "pixi.js";
import { Tile, TYPE_ENUM } from "./tile.js";
import { GameUi } from "./ui.js";
var PF = require("pathfinding");

const app = new PIXI.Application({
    width: 1000,
    height: 600,
});

document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(app.view);
    const renderWidth = app.view.width; // 800
    const renderHeight = app.view.height; // 600

    setupGrid(app.stage);
    setupUI(app.stage);
    /* app.stage.interactive = true;
    app.stage.addEventListener("mouseDown", () => {
        console.log("press down");
    }); */
});

function setupUI(stage) {
    const uiContainer = new GameUi();
    stage.addChild(uiContainer);
}

function setupGrid(stage) {
    const graphicContainer = new PIXI.Container();
    stage.addChild(graphicContainer);

    //cell size 100, 100
    let gridProp = {
        rowCount: 8,
        columnCount: 6,
    };

    const w = TYPE_ENUM.WALL;
    const t = TYPE_ENUM.TOWER;
    const g = TYPE_ENUM.GRASS;

    let mapGrid = [
        [g, g, g, w, g, w, w, g],
        [g, g, g, w, g, g, w, g],
        [g, w, g, w, t, g, w, g],
        [g, w, g, g, g, g, w, g],
        [g, w, w, w, w, w, w, g],
        [g, g, g, g, g, g, g, g],
    ];

    /* Each tile has a hitdetection with 5 points like:
     * |x| |x|
     * | |x| |
     * |x| |x|
     */

    let grid = [];
    let traversable = []; // Hit detection matrix for pathfinding.

    for (let i = 0; i < gridProp.columnCount; i++) {
        let traversable_row = [];
        let row = [];
        for (let j = 0; j < gridProp.rowCount; j++) {
            let tile = new Tile(j, i, mapGrid[i][j]);
            traversable_row.push(tile.traversable);
            tile.draw();
            row.push(tile);
        }
        grid.push(row);
        traversable.push(traversable_row);
    }

    let PFgrid = new PF.Grid(8, 6, traversable);
    let finder = new PF.AStarFinder();

    var path = finder.findPath(4, 0, 7, 0, PFgrid);
    console.log(path);

    blinkPath(path);

    grid.forEach((elem) => {
        graphicContainer.addChild(...elem);
    });

    function blinkPath(path) {
        let count = 0;
        let showPathTaskID = setInterval(function () {
            let x = path[count][0];
            let y = path[count][1];
            let tile = grid[y][x];
            tile.selected = true;
            tile.draw();

            if (count >= path.length - 1) {
                killInterval();
            }
            count++;
        }, 500);

        function killInterval() {
            clearInterval(showPathTaskID);
        }
    }
}

function print(array) {
    let map = "";
    array.forEach((element) => {
        element.forEach(function (num) {
            map += num;
        });
        map += "\n";
    });
    console.log(map);
}
