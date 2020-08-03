import { Container, Graphics as PGraphics } from "pixi.js"

export const TYPE_ENUM = {
    //ERROR null: 0, //yes 1 index types
    WALL: 1,
    TOWER: 2,
    SOME_THING: 3,
    GRASS: 4,
};

const DEBUG = false;
const DEBUG_PATH = false;

const dimention = {
    width: 100,
    height: 100,
};

const COLOR_CODE = {
    PURPLE: 0x311F36, //dark purple
    BLUE: 0x2C1890, //bright blue
    GRAY_BLUE: 0x575368, //gray blue
    GRASS: 0x287B00, //grass green
    ERROR: 0x8E2800, //Error red
    WHITE: 0xFFFFFF,
    SELECTED_COLOR: 0x2C1890,
    DEFAULT_LINE_COLOR: 0xFFFFFF,
}

export class Tile extends Container {
    /*x = 0;
    y = 0;*/
    
    constructor(x, y, type=0) {
        super();
        this.x = x;
        this.y = y;
        this._initial = type;
        this.type = type;
        this.selected = false;
        this.interactive = true;
        this.lineColor = COLOR_CODE.WHITE;

        if (DEBUG_PATH) {
            this.isOnPath = false;
        }

        this.on("click", this.handleClick);
    }

    get color() {
        switch(this.type) {
            case 0: 
                log.error("Cell without type");
                return;
            case TYPE_ENUM.WALL: return COLOR_CODE.PURPLE;
            case TYPE_ENUM.TOWER: return COLOR_CODE.BLUE;
            case TYPE_ENUM.GRASS: return COLOR_CODE.GRASS;
            case 10: return COLOR_CODE.GRASS;

            default: return COLOR_CODE.WHITE;
        }
    }

    handleClick(event) {
        if (this.selected == false) {
            this.selected = true;
        } else {
            this.selected = false;
        }

        this.removeChildren();
        // Redraw when the graphic changes
        this.draw();
    }

    draw() {
        if (this.selected) {
            this.lineColor = COLOR_CODE.BLUE;
        } else {
            this.lineColor = COLOR_CODE.DEFAULT_LINE_COLOR;
        }
        if (this.isOnPath) {
            this.lineColor = COLOR_CODE.ERROR;
        }
        
        let image = drawCell(this.x, this.y, this.color, this.lineColor);

        this.removeChildren()
        this.addChild(image);

    }

    traversable() {
        switch(this.type) {
            case TYPE_ENUM.WALL: return false;
            case TYPE_ENUM.TOWER: return false;
            case TYPE_ENUM.GRASS: return true;
        }
    }
}

/*
 * Util methods that are used in the above class
 */

function drawCell(x, y, color, lineColor=0xFFFFFF, lineWidth=1) {
    return new PGraphics()
        .beginFill(color)
        .lineStyle(lineWidth, lineColor)
        .drawRect(
            x * dimention.width,
            y * dimention.height,
            dimention.width,
            dimention.height
        )
        .endFill();
}