export class Characters {
    constructor(name, eye_color, height, mass, films) {
        this.name = name;
        this.eye_color = this.getEyeColor(eye_color);
        this.height = height;
        this.mass = mass;
        this.films = films;
    }

    getEyeColor(eye_color) {
        switch (eye_color) {
            case "blue":
                return "Azul";
            case "green":
                return "Verde";
            case "yellow":
                return "Amarillo";
            case "brown":
                return "Marrón";
            case "golden":
                return "Dorado";
            case "red":
                return "Rojo";
            default:
                break;
        }
    }
}