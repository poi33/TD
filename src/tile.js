import { Container, Graphics as PGraphics } from "pixi.js"

export const TYPE_ENUM = {
    //ERROR null: 0, //yes 1 index types
    WALL: 1,
    TOWER: 2,
    PERMA_WALL: 3,
    GRASS: 4,
    SELECTED: 10,
};

const dimention = {
    width: 100,
    height: 100,
};

const colorCode = [
    0x311F36, //dark purple
    0x2C1890, //bright blue
    0x575368, //gray blue
    0x287B00, //grass green
    0x8E2800, //Error red
]

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

        this.on("click", this.handleClick);
        this.image = this.draw();
        this.addChild(this.image);
    }

    get color() {
        switch(this.type) {
            case 0: 
                log.error("Cell without type");
                return;
            case 1: return colorCode[1];
            case 2: return colorCode[2];
            case 4: return colorCode[3];
            case 10: return colorCode[4];

            default: return colorCode[0];
        }
    }

    handleClick(event) {
        let image;
        if (this.selected == false) {
            this.selected = true;
            image = this.draw(true);
        } else {
            image = this.draw(false);
            this.selected = false;
        }
        this.removeChild(this.image);
        this.image = image;
        this.addChild(this.image);
    }

    draw(select=false) {
        if (select == false) {
            return Tile.drawCell(this.x, this.y, this.color);
        } else {
            return Tile.drawCell(this.x, this.y, this.color, colorCode[4], 3);
        }
    }



    static drawCell(x, y, color, lineColor=0xffffff, width=1) {
        return new PGraphics()
            .beginFill(color)
            .lineStyle(width, lineColor)
            .drawRect(
                x * dimention.width,
                y * dimention.height,
                dimention.width,
                dimention.height
            )
            .endFill();
    }
}