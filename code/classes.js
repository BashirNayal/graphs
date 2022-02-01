class Graph {
  constructor(nodes , edges) {
    this.nodes = nodes;
    this.edges = edges;
    this.node_dim = 30;
    this.source = null;
    this.destination = null;
    this.directed = false;
  }
  add_node(node) {
    this.nodes.push(node);
  }
  add_edge(edge) {
    this.edges.push(edge);
  }
}

class Node {
  constructor(x , y , id) {
    this.x = x;
    this.y = y;
    this.edges = [];
    this.hex_color = "#ffffff";
    this.part_of_tree = true;
    this.id = id;
    this.out = [];
    this.in = [];
    this.visited = false;
  }
  equals(rhs) {
    if(typeof(rhs) != Node) {
      return false;
  }
    return this.x == rhs.x && this.y == rhs.y; 
  }
  change_pos(new_x , new_y) {
    this.x = new_x;
    this.y = new_y;
  }
  contains(x , y) {
    return (Math.sqrt(Math.pow(this.x - x, 2) + (Math.pow(this.y - y, 2))) <= node_dim/2) || 
           (this.x == x && this.y == y)
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
  constructor(button_width , button_height , button_x , button_y , text , fun , toggle , state) {
    this.button_height =button_height ;
    this.button_width = button_width;
    this.button_x = button_x;
    this.button_y = button_y;
    this.text = text;
    this.color = "grey";
    this.fun = fun;
    this.toggle = toggle;
    this.state = state;
  }
  contains(x , y) {
    return (this.button_x <= x &&
      this.button_x + this.button_width >= x &&
      this.button_y <= y &&
      this.button_y + this.button_height >= y )
  }
  click() {
    if(this.toggle) {
      this.state = !this.state;
      return;
    }

    this.fun();
  }
  get_state() {
    return this.state;
  }
  render() {
    fill(this.color);
    if(this.contains(mouseX , mouseY) || this.state) fill("d64321");
    rect(this.button_x , this.button_y, this.button_width , this.button_height)
    fill(0);
    text(this.text , this.button_x  , this.button_y + 5, this.button_width , this.button_height)
  }
}
class NameGenerator {
  constructor() {
    this.current = "A";
    this.freed = [];
    this.maxed = false;
  }

  get_next() {
    if(this.freed.length > 0) return this.freed.pop();
    else if(!this.maxed) {
      let temp = this.current;
      this.current = String.fromCharCode(this.current.charCodeAt(0) + 1)
      if(this.current == "Z") this.maxed = true;
      return temp;
    }
    else {
      let l1 = this.current[0];
      let l2;
      if(this.current.length == 1) { //introduction of second letter
        l1 = "A"
        l2 = "A"
        let temp = this.current;
        this.current = l1 + l2;
        return temp;
      }
      else {
        let temp = this.current;
        l2 = this.current[1];
        if(l2 == "Z") {
          l1 = String.fromCharCode(l1.charCodeAt(0) + 1)
          l2 = "A"
        }
        else {
          l2 = String.fromCharCode(l2.charCodeAt(0) + 1)
        }
        this.current = l1 + l2;
        return temp;
      }

    }
  }
  reset() {
    this.maxed = false;
    this.current = "A";
    this.freed = [];
  }
  remove(name) {
    this.freed.push(name)
  }


}
