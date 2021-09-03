class Settings {
    constructor() {
        this.current_page = false;
        this.buttons = [];
        for(let i = 0; i < 10; i++) {
            this.buttons.push(new Button(80 , 25 , 20 , 20 + i * 50 , "RUN"));
        }
        this.buttons.push(new Button(80 , 25 , width * 0.64 , height * 0.95 , "BACK" , () => this.toggle_page() , null))
    }
    toggle_page() {
        console.log("k")
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
class InputForm {
    constructor(x , y , node) {
        this.x = x;
        this.y = y;
        this.node = node;
        this.input = [];
        this.scroll_value = 0;
        this.init = false;
        for(let i = 0; i < node.edges.length; i++) {
            this.input.push(createInput());
            this.input[i].position(x , y + (i * 30))
        }
        this.button = createButton("UPDATE");
        this.button.position(x , y + 30 * this.input.length + 1);
        this.button.mousePressed(() => this.handle_submit());

    }
    handle_submit() {
        input_form = null;
        let res = this.input.map(e => e.value());
        for(let i = 0; i < res.length; i++) {
            if(res[i] == "0" || res[i] == "") {
                let idx = graph.edges.indexOf(this.node.edges[i]);
                if(idx >= 0) graph.edges.splice(idx , 1);
                this.node.edges.splice(i , 1)
            }
            else this.node.edges[i].weight = res[i]
        }
        this.input.map(e => e.remove())
        this.button.remove();
    }
    remove() {
        this.input.map(e => e.remove())
        this.button.remove();
    }
    render() {
        let box = [this.x , this.y];
        let box_width = 250;
        let box_height = 270;
        if(box[0] + box_width > width) box[0] -= box_width;
        if(box[1] + box_height > height) box[1] -= box_height;
        fill(255);
        rect(box[0] , box[1] , box_width , box_height);
        fill(0);
        for(let i = 0; i < this.input.length; i++) {
            if(box[1]  + (i * 30) + this.scroll_value > box[1] + box_height - 60 || box[1]  + (i * 30) + this.scroll_value < box[1]) {
                this.input[i].hide();
                continue;
            }
            this.input[i].show();
            this.input[i].position(box[0] , box[1]  + (i * 30) + this.scroll_value);
            text(`${this.node.id} -> ${this.node.edges[i].node_b.id}` , box[0] + 180 ,  box[1] + (i * 30) + 10 + this.scroll_value);
            if(!this.init) this.input[i].value(this.node.edges[i].weight);
            
        }
        this.button.position(box[0] , box[1] + box_width);   //
        this.init = true;
        this.x = box[0];
        this.y = box[1];
    }
    scroll(d) {
        if(this.input.length <= 7) return;
        if(d > 0) {
            if(this.scroll_value < -(this.input.length * 15) - 30) return; //this -30 is the height of of the submit button
            this.scroll_value -= 30;
        }
        else {
            if(this.scroll_value >= 0) return;
            this.scroll_value += 30;
        }
    }
    contains(x , y) {
        return (this.x <= x &&
        this.x + 250 >= x &&
        this.y <= y &&
        this.y + 270 >= y )
    }
        
}