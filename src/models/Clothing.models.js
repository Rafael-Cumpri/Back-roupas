import { v4 as uuidv4 } from 'uuid';

class Cloth {
    constructor(name, type, size, color, quantityInStock, img) {
        this.id = uuidv4();
        this.name = name;
        this.type = type;
        this.size = size;
        this.color = color;
        this.quantityInStock = quantityInStock;
        this.img = img;
    }

    generateID() {
        let today = new Date();
        let date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
        let time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds() + '' + today.getMilliseconds();
        let random4Digits = "ABCDEDFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let random4DigitsID = '';
        for (let i = 0; i < 4; i++) {
            random4DigitsID += random4Digits.charAt(Math.floor(Math.random() * random4Digits.length));
        }
        return date + time + "-" + random4DigitsID;
    }

    // Getters

    getID() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getSize() {
        return this.size;
    }

    getColor() {
        return this.color;
    }

    getQuantityInStock() {
        return this.quantityInStock;
    }

    getImg() {
        return this.img;
    }

    // Setters

    setName(name) {
        this.name = name;
    }

    setType(type) {
        this.type = type;
    }

    setSize(size) {
        this.size = size;
    }

    setColor(color) {
        this.color = color;
    }

    setQuantityInStock(quantityInStock) {
        this.quantityInStock = quantityInStock;
    }

    setImg(img) {
        this.img = img;
    }
}

export default Cloth;