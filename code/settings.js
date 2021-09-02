class Settings {
    constructor() {
        this.current_page = false;
        this.buttons = [];
        for(let i = 0; i < 10; i++) {
            this.buttons.push(new Button(80 , 25 , 20 , 20 + i * 50 , "RUN"));

        }
        this.buttons.push(new Button(80 , 25 , width * 0.64 , height * 0.95 , "BACK" , this.toggle_page , null))

    }
    toggle_page() {
        this.current_page = !this.current_page;
    }
    render() {
        this.buttons.map(button => button.render());
    }
    mouseClicked(x , y) {
        let clicked = this.buttons.find(button => button.contains(x , y));
        if(clicked) clicked.click();
    }
    
}