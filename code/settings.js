class Settings {
    constructor(vals) {
        let attributes = ["DIRECTED" , "SHOW WEIGHTS" , "SHOW ARROWS", "TEST"]
        this.current_page = false;
        this.buttons = [];
        for(let i = 0; i < attributes.length; i++) {
            this.buttons.push(new Button(80 , 30 , 20 , 20 + i * 50 , attributes[i] , () => this.buttons[i].state ,true , vals[i]));
        }
        this.buttons.push(new Button(80 , 25 , width * 0.64 , height * 0.95 , "BACK" , () => this.toggle_page()))
    }
    toggle_page() {
        this.current_page = !this.current_page;
        if(!this.current_page) {
            graph.directed = this.buttons[0].state;

        }
    }
    show_weights() {
        return this.buttons[1].state;
    }
    show_arrows() {
        return this.buttons[2].state;
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
        for(let i = 0; i < node.out.length; i++) {
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
        let delete_indeces = [];
        for(let i = 0; i < res.length; i++) {
            if(!graph.directed) {
                let second_node = this.node.out[i].node_b;
                second_node = this.node.out[i].node_b
                for(let j = 0; j < second_node.out.length; j++) {
                    if(equal_nodes(second_node.out[j].node_b , this.node)) {
                        if(res[i] == "0" || res[i] == "") {
                            second_node.out.splice(j , 1);
                        }
                        else second_node.out[j].weight = parseInt(res[i]);
                    }
                }
            }
            if(res[i] == "0" || res[i] == "") {
                let edge = this.node.out[i];
                // let index = this.node.out[i].node_b.out.indexOf(edge);
                // this.node.out[i].node_b.out.splice(index , 1);
                let index = this.node.out[i].node_b.in.indexOf(edge);
                this.node.out[i].node_b.in.splice(index , 1);
                delete_indeces.push(i);
            }
            else this.node.out[i].weight = parseInt(res[i]);
        }
        delete_indeces.map(i => this.node.out.splice(i, 1));
        this.input.map(e => e.remove())
        this.button.remove();
        graph_updated();
    }
    remove() {
        this.input.map(e => e.remove())
        this.button.remove();
    }
    render() {
        let box = [this.x , this.y];
        let box_width = 250;
        let box_height = 270;
        let scroll_bar = [250 , 270];
        if(box[0] + box_width > width) box[0] -= box_width;
        if(box[1] + box_height > height) box[1] -= box_height;
        fill(255);
        rect(box[0] , box[1] , box_width , box_height);
        fill(0);
        for(let i = 0; i < this.input.length; i++) {
            if(!this.init) this.input[i].value(this.node.out[i].weight);
            if(box[1]  + (i * 30) + this.scroll_value > box[1] + box_height - 60 || box[1]  + (i * 30) + this.scroll_value < box[1]) {
                this.input[i].hide();
                continue;
            }
            this.input[i].show();
            this.input[i].position(box[0] , box[1]  + (i * 30) + this.scroll_value);
            text(`${this.node.id} -> ${this.node.out[i].node_b.id}` , box[0] + 180 ,  box[1] + (i * 30) + 10 + this.scroll_value);  
        }
        this.button.position(box[0] , box[1] + box_width);   //
        this.init = true;
        this.x = box[0];
        this.y = box[1];
        rect(box[0] + box_width - 10 , box[1] , 10 , box_height);
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
        this.y + 270 >= y);
    }   
}