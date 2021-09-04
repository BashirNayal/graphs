
node_dim = 30;
// let nodes = [];
// let edges = null;
let dragging = false;
let buttons = [];
let dijkstra_table;
let graph;
let source;
let destination;
let menu_list = null;
let pending_edge_from = null;
let settings_page;
let current_letter = "A";
let input_form = null;
let namer;
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
  if(!source) source = graph.source;
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
    for(let i = 0 ; i < current_node.out.length; i++) {
      let alternative_distance = current_cell.distance + current_node.out[i].weight;
      let neighbour_data;
      for(let j = 0; j < table.heap.length; j++) {
        if(equal_nodes(table.heap[j].vertex , current_node.out[i].node_b)) {
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
    str += table.heap[i].vertex.id + "     " + table.heap[i].distance + "      " + table.heap[i].previous.id+  "      \n";
  }
  console.log(str)
}
function setup() {
  frameRate(10);
  resizeCanvas(720 , 720);
  background(124);
  stroke(0);
  settings_page = new Settings([false , false , true]);
  namer = new NameGenerator();
  graph = get_random_graph(10 , false);

  // dijkstra_algorithm(graph.nodes[0])
  buttons.push(new Button(80 , 25 , width * 0.85 , height * 0.95 , "RUN" , dijkstra_algorithm));
  buttons.push(new Button(80 , 25 , width * 0.64 , height * 0.95 , "SETTINGS" , open_settings))
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
function get_random_graph(nodes_count , directed) {
  let min_x =  0;
  let min_y = 0;
  let max_x = width;
  let max_y = height;
  let nodes = [];
  // let edges = [];
  for(let i = 0; i < nodes_count; i++) {
    let temp = new Node(Math.floor(Math.random() * (max_x - min_x) + min_x) , Math.floor(Math.random() * (max_y - min_y) + min_y) , namer.get_next());
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
      // if(node.edges.find(e => e.node_b && equal_nodes(e.node_b , next_neighbour) || equal_nodes(node , next_neighbour))) 
      //   continue;
      if(node.out.find(e => equal_nodes(e.node_b , next_neighbour))) continue;
      new_edge = new Edge(node , next_neighbour , Math.floor((Math.sqrt(Math.pow(node.x - next_neighbour.x, 2)) + (Math.pow(node.y - next_neighbour.y, 2))) / 100));
      if(equal_nodes(new_edge.node_a , new_edge.node_b)) continue;
      node.out.push(new_edge)
      next_neighbour.in.push(new_edge)
      // edges.push(new_edge);
      if(!directed) {
        new_edge_back = new Edge(next_neighbour , node , Math.floor((Math.sqrt(Math.pow(node.x - next_neighbour.x, 2)) + (Math.pow(node.y - next_neighbour.y, 2))) / 100));
        node.in.push(new_edge_back)
        next_neighbour.out.push(new_edge_back)
      }
    }
  })
  // edges = edges.filter(edge => edge.weight > 0);
  return new Graph(nodes , null);
}
function mySelectEvent() {
  let item = sel.value();
  background(200);
  text('It is a ' + item + '!', 50, 50);
}
function handle_menu(node , action_selected , x , y) {
  if(!node) {
    if(action_selected == "new graph") {
      graph = get_random_graph(10 , graph.directed);
    }
    if(action_selected == "add node") {
      let node = new Node(x , y , namer.get_next());
      current_letter = String.fromCharCode(current_letter.charCodeAt(0) + 1)
      graph.add_node(node);
    }
    if(action_selected == "clear") {
      graph = new Graph([] , []);
      namer.reset();
    }
  }
  if(action_selected == "delete") {
    for(let i = 0; i < node.in.length; i++) {
      let edge = node.in[i]
      let index = node.in[i].node_a.out.indexOf(edge);
      node.in[i].node_a.out.splice(index , 1);
      // index = graph.edges.indexOf(edge);
      // graph.edges.splice(index , 1);
    }
    for(let i = 0; i < node.out.length; i++) {
      let edge = node.out[i]
      let index = node.out[i].node_a.in.indexOf(edge);
      node.out[i].node_b.in.splice(index , 1);
      // index = graph.edges.indexOf(edge);
      // graph.edges.splice(index , 1);
    }

    namer.remove(node.id);
    graph.nodes.splice(graph.nodes.indexOf(node) , 1);
  }
  else if(action_selected == "destination") {
    if(graph.source && equal_nodes(graph.source , node))
      graph.source = null;
      graph.destination = node;
  }
  else if(action_selected == "source") {
    if(graph.destination && equal_nodes(graph.destination , node)) 
    graph.destination = null;
    graph.source = node;
  }
  else if(action_selected == "reset") {
    if(graph.destination && equal_nodes(destination , node)) 
      graph.destination = null;
    else graph.source = null;
  }
}
function equal_edges(edge1 , edge2) {
  return edge1 && edge2 && equal_nodes(edge1.node_a , edge2.node_a) && equal_nodes(edge1.node_b , edge2.node_b);
}
if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    if(menu_list) return;
    if(pending_edge_from) {
      pending_edge_from = null;
      return;
      }
    let found_node = graph.nodes.find(node => node.contains(mouseX , mouseY));
    let x = mouseX;
    let y = mouseY;
    if(found_node) {
      background(200);
      menu_list = createSelect();
      menu_list.position(found_node.x, found_node.y);
      menu_list.option("")
      menu_list.option("..");
      menu_list.option("source");
      menu_list.option("destination");
      menu_list.option("delete");
      menu_list.option("reset")
      menu_list.changed(() => {handle_menu(found_node , menu_list.value() , x , y); menu_list.remove(); menu_list = null; pending_edge_from = null});
      menu_list.position(found_node.x, found_node.y)
    }
    else {
      background(200);
      menu_list = createSelect();
      menu_list.position(x, y);
      menu_list.option("");
      menu_list.option("...");
      menu_list.option("new graph");
      menu_list.option("add node");
      menu_list.option("clear");
      menu_list.changed(() => {handle_menu(null , menu_list.value()  , x , y); menu_list.remove(); menu_list = null; pending_edge_from = null;});
      menu_list.position(x, y)
    }
  }, false);
} 
function draw() {
  background(124);
  if(settings_page.current_page) {
    settings_page.render();
    return;
  }
  draw_edges();
  draw_nodes(graph.nodes);
  if(settings_page.show_arrows()) draw_pointers();
  buttons.map(button => button.render());
  if(input_form) input_form.render();
}
function draw_pointers(edges) {
  for(let i = 0; i < graph.nodes.length; i++) {
    for(let j = 0; j < graph.nodes[i].out.length; j++) {
      let intersection_point = line_circle_intersection(graph.nodes[i].out[j].node_a.x , graph.nodes[i].out[j].node_a.y , graph.nodes[i].out[j].node_b.x , graph.nodes[i].out[j].node_b.y , node_dim / 2);
      let tri = [[0 , 0] , [5 , -10] , [-5 , -10]];
      let m = (graph.nodes[i].out[j].node_b.y - graph.nodes[i].out[j].node_a.y) / (graph.nodes[i].out[j].node_b.x - graph.nodes[i].out[j].node_a.x);
      let deg = Math.atan(m) + Math.PI/2;
      if(graph.nodes[i].out[j].node_a.y < graph.nodes[i].out[j].node_b.y) deg += Math.PI;
      if(m < 0) deg += Math.PI
      // console.log("test")
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
  // for(let i = 0; i < edges.length; i++) {
  //   let intersection_point = line_circle_intersection(edges[i].node_a.x , edges[i].node_a.y , edges[i].node_b.x , edges[i].node_b.y , node_dim/2);
   
  //   let tri = [[0 , 0] , [5 , -10] , [-5 , -10]];
  //   let m = (edges[i].node_b.y - edges[i].node_a.y) / (edges[i].node_b.x - edges[i].node_a.x);
  //   let deg = Math.atan(m) + Math.PI/2;
  //   if(edges[i].node_a.y < edges[i].node_b.y) deg += Math.PI;
  //   if(m < 0) deg += Math.PI

  //   let cos_res = Math.cos(deg);
  //   let sin_res = Math.sin(deg);
  //   //rotate
  //   let tx1 = cos_res * tri[0][0] - sin_res * tri[0][1];
  //   let ty1 = sin_res * tri[0][0] + cos_res * tri[0][1];
  //   let tx2 = cos_res * tri[1][0] - sin_res * tri[1][1];
  //   let ty2 = sin_res * tri[1][0] + cos_res * tri[1][1];
  //   let tx3 = cos_res * tri[2][0] - sin_res * tri[2][1];
  //   let ty3 = sin_res * tri[2][0] + cos_res * tri[2][1];
  //   tri[0][0] = tx1 
  //   tri[0][1] = ty1 
  //   tri[1][0] = tx2
  //   tri[1][1] = ty2
  //   tri[2][0] = tx3
  //   tri[2][1] = ty3

  //   tri.map(vector => {vector[0] += intersection_point[0]; vector[1] += intersection_point[1];})

  //   fill(0);
  //   triangle(tri[0][0] , tri[0][1] , tri[1][0] , tri[1][1] , tri[2][0] , tri[2][1]);
  // }
}
function draw_edges(edges) {
  fill(0);
  // for(let i = 0; i < edges.length; i++) {
  //   if(edges[i].part_of_tree) {
  //     line(edges[i].node_a.x , edges[i].node_a.y , edges[i].node_b.x , edges[i].node_b.y);
  //     if(settings_page.show_weights()) text(edges[i].weight , ((edges[i].node_a.x + edges[i].node_b.x) / 2) , ((edges[i].node_a.y + edges[i].node_b.y) / 2));
  //     // if(i == 0) {
  //       // noFill();
  //       // curve(50 , 40 , edges[i].node_a.x , edges[i].node_a.y , edges[i].node_b.x , edges[i].node_b.y ,50 ,50);
  //     // }
  //   }
  // }
  for(let i = 0; i < graph.nodes.length; i++) {
    for(let j = 0; j < graph.nodes[i].out.length; j++) {
      line(graph.nodes[i].out[j].node_a.x , graph.nodes[i].out[j].node_a.y , graph.nodes[i].out[j].node_b.x , graph.nodes[i].out[j].node_b.y);
      if(settings_page.show_weights()) text(graph.nodes[i].out[j].weight , 
                                          ((graph.nodes[i].out[j].node_a.x + graph.nodes[i].out[j].node_b.x) / 2) , 
                                          ((graph.nodes[i].out[j].node_a.y + graph.nodes[i].out[j].node_b.y) / 2));

    }
  }
  if(pending_edge_from) {
    line(pending_edge_from.x , pending_edge_from.y , mouseX , mouseY);
  }
}
function line_circle_intersection(x1 , y1 , x2 , y2 , r) {
  //https://stackoverflow.com/questions/6091728/line-segment-circle-intersection________________//|
  let m = (y2 - y1) / (x2 - x1);                                                                //|
  let c = y2 - m * x2;                                                                          //|
  //                                                                                            //|
  let sec = (Math.sqrt(1 + Math.pow(m , 2)));                                                   //| 
  let res_x1 = x2 + r / sec;                                                                    //|
  let res_x2 = x2 + r / (sec * -1);                                                             //|
  //                                                                                            //| 
  let res_y1 = m * res_x1 + c;                                                                  //| 
  let res_y2 = m * res_x2 + c;                                                                  //|        
  //____________________________________________________________________________________________//|
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
      if(graph.source && equal_nodes(graph.source , nodes[i])) fill(0)
      if(graph.destination && equal_nodes(graph.destination , nodes[i])) fill("red");
      ellipse(nodes[i].x , nodes[i].y , node_dim , node_dim);
      fill(0);
      text(nodes[i].id , nodes[i].x , nodes[i].y)
    }
  }
}
function mouseDragged() {
  if(input_form || menu_list) return;
  dragging = true;
  let x = mouseX// - width/2;
  let y =(mouseY)// - height/2) * -1;
  if(settings_page.current_page) return;
  let node_on_move = graph.nodes.find(node => node.contains(x , y))
  if(node_on_move) {
    // if(mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height)
    node_on_move.change_pos(x , y);
  }
}
function mouseClicked() {
  if(dragging || input_form || menu_list) {
    dragging = false;
    return;
  }
  if(settings_page.current_page) {
    settings_page.mouseClicked(mouseX , mouseY);
    return;
  }
  let clicked_node = graph.nodes.find(node => node.contains(mouseX , mouseY));
  let clicked_button = buttons.find(button => button.contains(mouseX , mouseY));
  if(clicked_node) {
    if(pending_edge_from) {
      if(equal_nodes(pending_edge_from , clicked_node) || clicked_node.in.find(e => equal_nodes(e.node_a , pending_edge_from))) {
        return;
      }
      //Add a check that ensures there is no outgoing edge to the same node
      let temp = pending_edge_from.edges.find(edge => equal_nodes(edge.node_b , clicked_node))
      if(temp) return;
      let edge = new Edge(pending_edge_from , clicked_node , Math.floor((Math.sqrt(Math.pow(clicked_node.x - pending_edge_from.x, 2)) + (Math.pow(clicked_node.y - pending_edge_from.y, 2))) / 100))
      if(!graph.directed) {
        let edge_back = new Edge(clicked_node , pending_edge_from , Math.floor((Math.sqrt(Math.pow(clicked_node.x - pending_edge_from.x, 2)) + (Math.pow(clicked_node.y - pending_edge_from.y, 2))) / 100))
        pending_edge_from.in.push(edge_back);
        clicked_node.out.push(edge_back);
      }
      // graph.add_edge(edge);
      pending_edge_from.out.push(edge);
      clicked_node.in.push(edge);
      pending_edge_from = null;
      return;
    }
    pending_edge_from = clicked_node;
  }
  else if(clicked_button) clicked_button.click();
  else if(pending_edge_from) {
    let node = new Node(mouseX , mouseY , namer.get_next());
    let edge = new Edge(pending_edge_from , node , Math.floor((Math.sqrt(Math.pow(node.x - pending_edge_from.x, 2)) + (Math.pow(node.y - pending_edge_from.y, 2))) / 100));
    if(!graph.directed) {
      let edge_back = new Edge(node , pending_edge_from, Math.floor((Math.sqrt(Math.pow(node.x - pending_edge_from.x, 2)) + (Math.pow(node.y - pending_edge_from.y, 2))) / 100));
      pending_edge_from.in.push(edge_back);
      node.out.push(edge_back);
    }
    graph.add_node(node);
    // graph.add_edge(edge);
    pending_edge_from.out.push(edge);
    node.in.push(edge);
    pending_edge_from = null;
    return;
  }
}
function doubleClicked() {
  pending_edge_from = null;
  if(input_form) return;
  let node = graph.nodes.find(node => node.contains(mouseX , mouseY));
  if(node) {
    input_form = new InputForm(mouseX , mouseY , node);
  }
}
function find_mid_point(x1 , y1 , x2 , y2) {
  let x = (x1 + x2) / 2;
  let y = (y1 + y2) / 2;
  return [x , y];
}
function keyPressed() {
  if(keyCode === 27) {//ESC button
    if(input_form) input_form.remove();
    input_form = null;
    if(menu_list) menu_list.remove();
    menu_list = null;
    pending_edge_from = null;
  }
}
function mouseWheel(event) {
  if(input_form && input_form.contains(mouseX , mouseY)) {
    input_form.scroll(event.delta);
    return false;
  }
}

function valid_edge(edge) {
  if(graph.directed) {

  }
  else {

  }
}