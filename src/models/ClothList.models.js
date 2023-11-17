import { v4 as uuidv4 } from 'uuid';

class ClothList {
    constructor() {
        this.id = uuidv4();
        this.clothList = [];
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

    addCloth(cloth) {
        this.clothList.push(cloth);
    }

    getClothList() {
        return this.clothList;
    }

    getClothById(id) {
        return this.clothList.find(cloth => cloth.id === id);
    }

    getClothBySearch(searchParams, param1) {
        return this.clothList.filter(cloth => cloth[searchParams] == param1);
    }

    removeClothById(id) {
        this.clothList = this.clothList.filter(cloth => cloth.id !== id);
    }

    updateClothById(id, cloth) {
        const index = this.clothList.findIndex(cloth => cloth.id === id);
        cloth.id = id;
        this.clothList[index] = cloth;
    }

    getTotalClothes() {
        return this.clothList.length;
    }
}

export default ClothList;