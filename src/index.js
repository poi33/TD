import * as PIXI from "pixi.js";
import { Tile, TYPE_ENUM } from "./tile.js";
//import { Graphics as PGraphics } from "pixi.js";

const app = new PIXI.Application({
    width: 1000,
    height: 600,
});

document.addEventListener("DOMContentLoaded", function () {
    //console.log("Start game");
    document.body.appendChild(app.view);
    drawGame();
    /* app.stage.interactive = true;
    app.stage.addEventListener("mouseDown", () => {
        console.log("press down");
    }); */
});

function drawGame() {
    const renderWidth = app.view.width; // 800
    const renderHeight = app.view.height; // 600

    const graphicContainer = new PIXI.Container();
    app.stage.addChild(graphicContainer);

    //cell size 100, 100
    let gridProp = {
        rowCount: 8,
        columnCount: 6,
    };
    //let gridHeight = Math.round(renderheight / gridProp.columnCount);
    //let gridwidth = Math.round(renderWidth / gridProp.rowCount);
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
            grid.push(tile);
        }
    }

    graphicContainer.addChild(...grid);
}
