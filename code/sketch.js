
node_dim = 30;
// let nodes = [];
// let edges = null;
let dragging = false;
let buttons = [];
let dijkstra_table;
let graph;
let source;
let destination;
let menu_up = false;
let pending_edge_from = null;
let settings_page;
let current_letter = "A";
function equal_nodes(n1 , n2) {
  // console.log(n1.x == n2.x && n1.y == n2.y);
  return n1.x == n2.x && n1.y == n2.y;
}


// function Dijkstra(source) {
//   let table = new DijkstraHeap();
//   data = nodes.map(node => {
//     if(equal_nodes(source , node)){
//       // table.insert([node , 0 , "null"])
//       table.insert(new Data(node , 0 , "null"))
//     }
//     else table.insert(new Data(node , Number.MAX_SAFE_INTEGER , "null"))
//   })

//   while(table.size > 0) {
//     // print_table(table);
//     let current_cell = table.minimum();
//     let current_node = current_cell.vertex;
//     table.ignore_from_heap(0);
//     for(let i = 0 ; i < current_node.edges.length; i++) {
//       let alternative_distance = current_cell.distance + current_node.edges[i].weight;
//       let neighbour_data;
//       for(let j = 0; j < table.heap.length; j++) {
//         if(equal_nodes(table.heap[j].vertex , current_node.edges[i].node_b)) {
//           neighbour_data = table.heap[j];
//           if(neighbour_data.distance > alternative_distance) {
//             neighbour_data.distance = alternative_distance;
//             neighbour_data.previous = current_node;
//             table.update();
//           }
//         }
//       }
//     }
//     // print_table(table);console.log("\n\n\n\n");
//   }
//     return table;
// }
  // dijkstra_table = Dijkstra(nodes[0]);
  let dijkstra_algorithm = (source) => {
    
    let table = new DijkstraHeap();
    data = graph.nodes.map(node => {
      if(equal_nodes(source , node)){
        // table.insert([node , 0 , "null"])
        table.insert(new Data(node , 0 , "null"))
      }
      else table.insert(new Data(node , Number.MAX_SAFE_INTEGER , "null"))
    })
    while(table.size > 0) {
      // print_table(table);
      let current_cell = table.minimum();
      let current_node = current_cell.vertex;
      table.ignore_from_heap(0);
      for(let i = 0 ; i < current_node.edges.length; i++) {
        let alternative_distance = current_cell.distance + current_node.edges[i].weight;
        let neighbour_data;
        for(let j = 0; j < table.heap.length; j++) {
          if(equal_nodes(table.heap[j].vertex , current_node.edges[i].node_b)) {
            neighbour_data = table.heap[j];
            if(neighbour_data.distance > alternative_distance) {
              neighbour_data.distance = alternative_distance;
              neighbour_data.previous = current_node;
              table.update();
            }
          }
        }
      }
      print_table(table);console.log("\n\n\n\n");
    }
    return table;
  }
function print_table(table) {
    let str = "ver    dis   pre     \n"
  for(let i = 0; i < table.heap.length; i++) {
    str += table.heap[i].vertex.hex_color + "     " + table.heap[i].distance + "      " + table.heap[i].previous.hex_color+  "      \n";
  }
  console.log(str)
}

function setup() {
  frameRate(10);
  resizeCanvas(720 , 720);
  background(124);
  stroke(0);
  graph = get_random_graph(10);
  settings_page = new Settings();
  // dijkstra_algorithm(graph.nodes[0])
  buttons.push(new Button(80 , 25 , width * 0.85 , height * 0.95 , "RUN" , console.log , "null"));
  buttons.push(new Button(80 , 25 , width * 0.64 , height * 0.95 , "SETTINGS" , open_settings , null))
  create_drop_down();
}
function open_settings() {
  settings_page.toggle_page();
}

function create_drop_down() {

  background(200);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Dijkstra');
  sel.option('kiwi');
  sel.option('grape');
  sel.selected('Dijkstra');
  sel.changed(mySelectEvent);
  sel.position(width * 0.9 ,  height * 0.9);
}

function get_random_graph(nodes_count) {
  let min_x =  0;width/-2;
  let min_y = 0;height/-2;
  let max_x = width;width/2;
  let max_y = height;height/2;
  let nodes = [];
  let edges = [];
  for(let i = 0; i < nodes_count; i++) {
    let temp = new Node(Math.floor(Math.random() * (max_x - min_x) + min_x) , Math.floor(Math.random() * (max_y - min_y) + min_y) , current_letter);
    let found = nodes.find(node => node.contains(temp.x , temp.y));
    if(found) i--;
    
    else {
      nodes.push(temp);
      current_letter = String.fromCharCode(current_letter.charCodeAt(0) + 1)
    }
  }
  nodes.map(node => {
    for(let i = 0; i < Math.floor(Math.random() * 5 + 1); i++) {
      let next_neighbour = nodes[Math.floor(Math.random() * nodes_count)];
      if(node.edges.find(e => e.node_b && equal_nodes(e.node_b , next_neighbour) || equal_nodes(node , next_neighbour))) 
        continue;
      new_edge = new Edge(node , next_neighbour , Math.floor((Math.sqrt(Math.pow(node.x - next_neighbour.x, 2)) + (Math.pow(node.y - next_neighbour.y, 2)))));

      node.edges.push(new_edge);
      edges.push(new_edge);
    }
  })
  edges = edges.filter(edge => edge.weight > 0);
  return new Graph(nodes , edges);
}


function mySelectEvent() {
  let item = sel.value();
  background(200);
  text('It is a ' + item + '!', 50, 50);
}

function handle_menu(node , action_selected) {
  if(!node) {
    if(action_selected == "new graph") {
      graph = get_random_graph(10);
    }
    if(action_selected == "add node") {
      let node = new Node(width / 2 , node_dim , current_letter);
      current_letter = String.fromCharCode(current_letter.charCodeAt(0) + 1)
      graph.add_node(node);
    }
    if(action_selected == "clear") {
      graph = new Graph([] , []);
      current_letter = "A";
    }
  }
  if(action_selected == "delete") {
    for(let i = 0; i < graph.nodes.length; i++) {
      for(let j = 0; j < graph.nodes[i].edges.length; j++) {
        if(equal_nodes(graph.nodes[i].edges[j].node_b , node) || equal_nodes(graph.nodes[i].edges[j].node_a , node)) {
          for(let k = 0; k < graph.edges.length; k++) {
            if(equal_edges(graph.edges[k] , graph.nodes[i].edges[j])) {
              graph.edges.splice(k , 1);
            }
          }
        }
      }
    } 
    graph.nodes.splice(graph.nodes.indexOf(node) , 1);
  }
  else if(action_selected == "destination") {
    if(source && equal_nodes(source , node))
      source = null;
    destination = node;
  }
  else if(action_selected == "source") {
    if(destination && equal_nodes(destination , node)) 
      destination = null;
    source = node;
  }
  else if(action_selected == "reset") {
    if(destination && equal_nodes(destination , node)) 
      destination = null;
    else source = null;
  }
}

function equal_edges(edge1 , edge2) {
  return edge1 && edge2 && equal_nodes(edge1.node_a , edge2.node_a) && equal_nodes(edge1.node_b , edge2.node_b);
}
if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    if(menu_up) return;
    if(pending_edge_from) {
      pending_edge_from = null;
      return;
    }
    menu_up = true;
    let found_node = graph.nodes.find(node => node.contains(mouseX , mouseY));
    if(found_node) {
      
      background(200);
      sel = createSelect();
      sel.position(found_node.x, found_node.y);
      sel.option("")
      sel.option("..");
      sel.option("source");
      sel.option("destination");
      sel.option("delete");
      sel.option("reset")
      sel.changed(() => {handle_menu(found_node , sel.value()); sel.remove(); menu_up = false;});
      sel.position(found_node.x, found_node.y)

    }
    else {
      background(200);
      sel = createSelect();
      sel.position(mouseX, mouseY);
      sel.option("");
      sel.option("...");
      sel.option("new graph");
      sel.option("add node");
      sel.option("clear");
      sel.changed(() => {handle_menu(null , sel.value()); sel.remove(); menu_up = false;});
      sel.position(mouseX, mouseY)
    }
  }, false);
} 

function draw() {
  background(124);
  if(settings_page.current_page) {
    settings_page.render();
    return;
  }
  draw_edges(graph.edges);
  draw_nodes(graph.nodes);
  draw_pointers(graph.edges);
  buttons.map(button => button.render());
}

function draw_pointers(edges) {
  for(let i = 0; i < edges.length; i++) {
    let intersection_point = line_circle_intersection(edges[i].node_a.x , edges[i].node_a.y , edges[i].node_b.x , edges[i].node_b.y , node_dim/2);
   
    let tri = [[0 , 0] , [5 , -10] , [-5 , -10]];
    let m = (edges[i].node_b.y - edges[i].node_a.y) / (edges[i].node_b.x - edges[i].node_a.x);
    let deg = Math.atan(m) + Math.PI/2;
    if(edges[i].node_a.y < edges[i].node_b.y) deg += Math.PI;
    if(m < 0) deg += Math.PI

    let cos_res = Math.cos(deg);
    let sin_res = Math.sin(deg);
    //rotate
    let tx1 = cos_res * tri[0][0] - sin_res * tri[0][1];
    let ty1 = sin_res * tri[0][0] + cos_res * tri[0][1];
    let tx2 = cos_res * tri[1][0] - sin_res * tri[1][1];
    let ty2 = sin_res * tri[1][0] + cos_res * tri[1][1];
    let tx3 = cos_res * tri[2][0] - sin_res * tri[2][1];
    let ty3 = sin_res * tri[2][0] + cos_res * tri[2][1];
    tri[0][0] = tx1 
    tri[0][1] = ty1 
    tri[1][0] = tx2
    tri[1][1] = ty2
    tri[2][0] = tx3
    tri[2][1] = ty3

    tri.map(vector => {vector[0] += intersection_point[0]; vector[1] += intersection_point[1];})

    fill(0);
    triangle(tri[0][0] , tri[0][1] , tri[1][0] , tri[1][1] , tri[2][0] , tri[2][1]);
  }
}

function draw_edges(edges) {
  fill(0);
  for(let i = 0; i < edges.length; i++) {
    if(edges[i].part_of_tree) {
      line(edges[i].node_a.x , edges[i].node_a.y , edges[i].node_b.x , edges[i].node_b.y);
      text(edges[i].weight , ((edges[i].node_a.x + edges[i].node_b.x) / 2) , ((edges[i].node_a.y + edges[i].node_b.y) / 2));
    }
  }
  if(pending_edge_from) {
    line(pending_edge_from.x , pending_edge_from.y , mouseX , mouseY);
  }
}


function line_circle_intersection(x1 , y1 , x2 , y2 , r) {
  //https://stackoverflow.com/questions/6091728/line-segment-circle-intersection________________//||
  let m = (y2 - y1) / (x2 - x1);                                                                //||
  let c = y2 - m * x2;                                                                          //||
  //                                                                                            //||
  let sec = (Math.sqrt(1 + Math.pow(m , 2)));                                                   //|| 
  let res_x1 = x2 + r / sec;                                                                    //||
  let res_x2 = x2 + r / (sec * -1);                                                             //||
  //                                                                                            //|| 
  let res_y1 = m * res_x1 + c;                                                                  //|| 
  let res_y2 = m * res_x2 + c;                                                                  //||         
  //____________________________________________________________________________________________//||
  let dist1 = Math.floor((Math.sqrt(Math.pow(x1 - res_x1, 2)) + (Math.pow(y1 - res_y1, 2))));
  let dist2 = Math.floor((Math.sqrt(Math.pow(x1 - res_x2, 2)) + (Math.pow(y1 - res_y2, 2))));
  if(dist1 > dist2)
   return [res_x2 , res_y2]
  else 
    return [res_x1 , res_y1]
}

function draw_nodes(nodes) {
  for(let i = 0; i < nodes.length; i++) {
    if(nodes[i].part_of_tree) {
      fill(nodes[i].hex_color);
      if(source && equal_nodes(source , nodes[i])) fill(0)
      if(destination && equal_nodes(destination , nodes[i])) fill("red");
      ellipse(nodes[i].x , nodes[i].y , node_dim , node_dim);
      fill(0);
      text(nodes[i].id , nodes[i].x , nodes[i].y)
    }
  }
}


function mouseDragged() {
  let x = mouseX// - width/2;
  let y =(mouseY)// - height/2) * -1;
  if(settings_page.current_page) return;
  let node_on_move = graph.nodes.find(node => node.contains(x , y))
  if(node_on_move) {
    // if(mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height)
    node_on_move.change_pos(x , y);
    dragging = true;
  }
}
function mouseClicked() {
  let x = mouseX //- width/2;
  let y =(mouseY) //- height/2) * -1;
  if(mouseButton != LEFT) return;
  
  if(dragging) {
    dragging = false;
    return;
  }
  if(settings_page.current_page) {
    settings_page.mouseClicked(mouseX , mouseY);
    return;
  }
  let clicked_node = graph.nodes.find(node => node.contains(x , y));
  let clicked_button = buttons.find(button => button.contains(x , y));
  if(clicked_node) {
    if(pending_edge_from) {
      let edge = new Edge(pending_edge_from , clicked_node , Math.floor((Math.sqrt(Math.pow(clicked_node.x - pending_edge_from.x, 2)) + (Math.pow(clicked_node.y - pending_edge_from.y, 2)))))
      graph.add_edge(edge);
      pending_edge_from = null;
      return;
    }
    pending_edge_from = clicked_node;
  }
  else if(clicked_button) clicked_button.click();
  else if(pending_edge_from) {
    let node = new Node(mouseX , mouseY , current_letter);
    current_letter = String.fromCharCode(current_letter.charCodeAt(0) + 1)
    let edge = new Edge(pending_edge_from , node , Math.floor((Math.sqrt(Math.pow(node.x - pending_edge_from.x, 2)) + (Math.pow(node.y - pending_edge_from.y, 2)))));
    graph.add_node(node);
    graph.add_edge(edge);
    pending_edge_from = null;
    return;
  }
}
function doubleClicked() {
  console.log("double")
  input = createInput();
  input.position(20, 65);
}


function find_mid_point(x1 , y1 , x2 , y2) {
  let x = (x1 + x2) / 2;
  let y = (y1 + y2) / 2;
  return [x , y];
}