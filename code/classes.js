class Graph {
  constructor(nodes , edges) {
    this.nodes = nodes;
    this.edges = edges;
    this.nodes_count = nodes.length;
    this.node_dim = 30;
  }

  
}



class Node {
    constructor(x , y) {
      this.x = x;
      this.y = y;
      this.edges = [];
      this.hex_color = "#ffffff";
      this.part_of_tree = true;
    }
    equals(rhs) {
      if(typeof(rhs) != Node) {
      console.log("here");
        return false;
    }
      console.log("there");
      return this.x == rhs.x && this.y == rhs.y; 
    }
    change_pos(new_x , new_y) {
      this.x = new_x;
      this.y = new_y;
    }
    contains(x , y) {
      return (Math.sqrt(Math.pow(this.x - x, 2) + (Math.pow(this.y - y, 2))) <= node_dim) || (this.x == x && this.y == y)
    }
  }
  class Edge {
    constructor(node_a , node_b , weight) {
      this.node_a = node_a;
      this.node_b = node_b;
      this.weight = weight;
      this.part_of_tree = true;
    }
    valueOf() {
      return this.weight;
    }
  }
  
  class Button {
    constructor(button_width , button_height , button_x , button_y , text , fun) {
      this.button_height =button_height ;
      this.button_width = button_width;
      this.button_x = button_x;
      this.button_y = button_y;
      this.text = text;
      this.color = "grey";
      this.fun = fun;
    }
    contains(x , y) {
      return (this.button_x <= x &&
        this.button_x + this.button_width >= x &&
        this.button_y <= y &&
        this.button_y + this.button_height >= y )
    }
    click() {
      if(this.color == "grey") this.color = "red";
      else this.color = "grey";
      this.fun;
    }
    render() {
      fill(this.color);
      rect(this.button_x , this.button_y, this.button_width , this.button_height)
      fill(0);
      text(this.text, this.button_x + (this.button_width * 0.3) , this.button_y + (this.button_height * 0.6))
    }
  }