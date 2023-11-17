import Cloth from "../models/Clothing.models.js";
import ClothList from "../models/ClothList.models.js";

const clothList = new ClothList();

export const getClothes = async (req, res) => {
    const { type, size, color } = req.query;

    let clothes; 

    if (type) {
        clothes = clothList.getClothBySearch('type', type.toLowerCase());
    } else if (size) {
        clothes = clothList.getClothBySearch('size', size.toUpperCase());
    } else if (color) {
        clothes = clothList.getClothBySearch('color', color.toLowerCase());
    } else {
        clothes = clothList.getClothList();
    }

    if(!clothes) {
        return res.status(400).send({ message: "nenhuma roupa foi adicionada ainda" });
    } else if (clothes.length === 0) {
        return res.status(400).send({ message: "nenhuma roupa foi encontrada" });
    }

    res.status(200).send({"roupas":clothes, "tamanho":clothes.length});
};

export const getClothByID = async (req, res) => {
    const { id } = req.params;
    const cloth = clothList.getClothById(id);

    res.status(200).send(cloth);
}

export const createCloth = async (req, res) => {
    const { name, type, size, color, stockQuantity, image } = req.body;
    
    let size1 = size.toUpperCase();
    let type1 = type.toLowerCase();
    let color1 = color.toLowerCase();

    const newCloth = new Cloth(name, type1, size1, color1, stockQuantity, image);
    let errors = []

    if (!name && !type1 && !size1 && !color1 && !stockQuantity && !image) {
        errors.push("todos os campos vazios por favor preencha os campos")
        res.status(400).send({ message: errors })
        return
    }

    if (name.length < 6) {
        errors.push("tamanho do nome da roupa é muito pequeno")
    }

    if (name.length > 40) {
        errors.push("tamanho do nome da roupa é muito grande")
    }

    if (!type1) {
        errors.push("tipo da roupa não foi preenchido")
    } else if (type1.length > 50) {
        errors.push("tamanho do tipo da roupa é muito grande")
    }

    if (!size1) {
        errors.push("tamanho da roupa não foi preenchido")
    } else if (size1 !== "PP" && size1 !== "P" && size1 !== "M" && size1 !== "G" && size1 !== "GG" && size1 !== "XG") {
        errors.push("tamanho da roupa é inválido")
    }

    if (!color1) {
        errors.push("cor da roupa não foi preenchido")
    } else if (color1.length > 20) {
        errors.push("tamanho da cor da roupa é muito grande")
    }

    if (!image) {
        errors.push("imagem da roupa não foi preenchido")
    } else if (image.startsWith("http") == false) {
        errors.push("imagem inválida")
    } else if (image.endsWith(".jpg") == false && image.endsWith(".png") == false && image.endsWith(".jpeg") == false && image.endsWith(".gif") == false) {
        errors.push("imagem inválida")
    }

    if (typeof(stockQuantity) === 'string') {
        errors.push("quantidade de estoque é inválida use um numero")
    } else if (stockQuantity < 0) {
        errors.push("quantidade de estoque é inválida")
    } else if (stockQuantity > 15000) {
        errors.push("quantidade de estoque é muito grande")
    }

    if (errors.length > 0) {
        return res.status(400).send(errors)
    } else {
        clothList.addCloth(newCloth);
        res.status(200).send(newCloth);
    }
}

export const updateCloth = async (req, res) => {
    const { id } = req.params;
    const { nameUpdate, type, size, color, stockQuantity, image } = req.body;

    let size1 = size.toUpperCase();
    let type1 = type.toLowerCase();
    let color1 = color.toLowerCase();

    const updateCloth = new Cloth(nameUpdate, type1, size1, color1, stockQuantity, image);
    let errors = []

    if (!nameUpdate && !type1 && !size1 && !color1 && !stockQuantity && !image) {
        errors.push("todos os campos vazios por favor preencha os campos")
        res.status(400).send({ message: errors })
        return
    }

    if (nameUpdate.length < 6) {
        errors.push("tamanho do nome da roupa é muito pequeno")
    }

    if (nameUpdate.length > 40) {
        errors.push("tamanho do nome da roupa é muito grande")
    }

    if (!type1) {
        errors.push("tipo da roupa não foi preenchido")
    } else if (type1.length > 50) {
        errors.push("tamanho do tipo da roupa é muito grande")
    }

    if (!size1) {
        errors.push("tamanho da roupa não foi preenchido")
    } else if (size1 !== "PP" && size1 !== "P" && size1 !== "M" && size1 !== "G" && size1 !== "GG" && size1 !== "XG") {
        errors.push("tamanho da roupa é inválido")
    }

    if (!color1) {
        errors.push("cor da roupa não foi preenchido")
    } else if (color1.length > 20) {
        errors.push("tamanho da cor da roupa é muito grande")
    }

    if (!image) {
        errors.push("imagem da roupa não foi preenchido")
    } else if (image.startsWith("http") == false) {
        errors.push("imagem inválida")
    } else if (image.endsWith(".jpg") == false && image.endsWith(".png") == false && image.endsWith(".jpeg") == false && image.endsWith(".gif") == false) {
        errors.push("imagem inválida")
    }

    if (typeof(stockQuantity) === 'string') {
        errors.push("quantidade de estoque é inválida use um numero")
    } else if (stockQuantity < 0) {
        errors.push("quantidade de estoque é inválida")
    } else if (stockQuantity > 15000) {
        errors.push("quantidade de estoque é muito grande")
    }

    if (errors.length > 0) {
        return res.status(400).send({ message: errors })
    } else {
        clothList.updateClothById(id, updateCloth);
        res.status(200).send(updateCloth);
    }
}

export const deleteCloth = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: "roupa não encontrada" });
    }

    clothList.removeClothById(id);

    res.status(200).send({ message: `DELETE cloth by ID: ${id}` });
}

export const getClothByType = async (req, res) => {
    const { type } = req.params;
    const cloth = clothList.getClothByType(type);

    res.status(200).send(cloth);
}

export const getClothBySize = async (req, res) => {
    const { size } = req.params;
    const cloth = clothList.getClothBySize(size);

    res.status(200).send(cloth);
}

export const getClothByColor = async (req, res) => {
    const { color } = req.params;
    const cloth = clothList.getClothByColor(color);

    res.status(200).send(cloth);
}

export const getClothBySizeandType = async (req, res) => {
    const { size, type } = req.params;
    const cloth = clothList.getClothBySizeandType(size, type);

    res.status(200).send(cloth);
}

