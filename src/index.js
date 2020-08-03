import * as PIXI from "pixi.js";
import { Tile, TYPE_ENUM } from "./tile.js";
import { GameUi } from "./ui.js";
import * as PF from "pathfinding";

const app = new PIXI.Application({
    width: 1000,
    height: 600,
});

document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(app.view);
    const renderWidth = app.view.width; // 800
    const renderHeight = app.view.height; // 600

    console.log(PF);

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
    ]
    let grid = [];

    for (let i = 0; i < gridProp.rowCount; i++) {
        for (let j = 0; j < gridProp.columnCount; j++) {
            let tile = new Tile(i, j, mapGrid[j][i]);

            tile.draw();
            grid.push(tile);
        }
    }

    graphicContainer.addChild(...grid);
}