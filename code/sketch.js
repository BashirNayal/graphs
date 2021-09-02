
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
  frameRate(5);
  resizeCanvas(720 , 720);
  background(124);
  stroke(0);
  graph = get_random_graph(2);
  // dijkstra_algorithm(graph.nodes[0])
  buttons.push(new Button(80 , 25 , width * 0.85 , height * 0.95 , "RUN"))
  create_drop_down();
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
  sel.position(width * 0.9 ,  height * 0.9)
}

function get_random_graph(nodes_count) {
  let min_x =  width/-2;
  let min_y = height/-2;
  let max_x = width/2;
  let max_y = height/2;
  let nodes = [];
  let edges = [];
  for(let i = 0; i < nodes_count; i++) {
    let temp = new Node(Math.floor(Math.random() * (max_x - min_x) + min_x) , Math.floor(Math.random() * (max_y - min_y) + min_y));
    let found = nodes.find(node => node.contains(temp.x , temp.y));
    if(found) i--;
    else nodes.push(temp);
  }
  nodes.map(node => {
    for(let i = 0; i < Math.floor(Math.random() * 5 + 1); i++) {
      let next_neighbour = nodes[Math.floor(Math.random() * nodes_count)];
      if(node.edges.find(e => e.node_b && equal_nodes(e.node_b , next_neighbour) || equal_nodes(node , next_neighbour))) 
        continue;
      if(i > 0) continue;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      new_edge = new Edge(node , next_neighbour , Math.floor((Math.sqrt(Math.pow(node.x - next_neighbour.x, 2)) + (Math.pow(node.y - next_neighbour.y, 2)))));



      node.edges.push(new_edge);
      edges.push(new_edge)
    }
  })
  edges = edges.filter(edge => edge.weight > 0);
  return new Graph(nodes , edges)
}


function mySelectEvent() {
  let item = sel.value();
  background(200);
  text('It is a ' + item + '!', 50, 50);
}

function handle_menu(node , action_selected) {
  console.log('here')
  if(!node) {
    if(action_selected == "new graph") {
      graph = get_random_graph(10);
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
    destination = node;
  }
  else if(action_selected == "source") {
    source = node;
  }
}

function equal_edges(edge1 , edge2) {
  return edge1 && edge2 && equal_nodes(edge1.node_a , edge2.node_a) && equal_nodes(edge1.node_b , edge2.node_b);
}
if (document.addEventListener) {
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    if(menu_up) return;
    menu_up = true;
    // alert("You've tried to open context menu"); //here you draw your own menu
    let found_node = graph.nodes.find(node => node.contains(mouseX , mouseY));
    if(found_node) {
      
      background(200);
      sel = createSelect();
      sel.position(found_node.x, found_node.y);
      sel.option("..");
      sel.option('source');
      sel.option('destination');
      sel.option('delete');
      sel.changed(() => {handle_menu(found_node , sel.value()); sel.remove(); menu_up = false;});
      sel.position(found_node.x, found_node.y)

    }
    else {
      background(200);
      sel = createSelect();
      sel.position(mouseX, mouseY);
      sel.option("");
      // sel.option("...");
      sel.option('new graph');
      sel.selected("...")
      sel.changed(() => {handle_menu(null , sel.value()); sel.remove(); menu_up = false;});
      sel.position(mouseX, mouseY)
    }
  }, false);
} 


function draw() {
  translate(width/2, height/2); 
  scale(1, -1);
  background(124);
  // ellipse(0,0,10,10);
  // text("hi" , 10 , 10)
  draw_edges(graph.edges);
  draw_nodes(graph.nodes);
  draw_pointers(graph.edges);
  // draw_run_button();
  buttons.map(button => button.render());


 
}
function draw_pointers(edges) {
  for(let i = 0; i < edges.length; i++) {




    fill(200);

    let temp1 = trying(edges[i].node_a.x , edges[i].node_a.y , edges[i].node_b.x , edges[i].node_b.y , node_dim/2)
    
    // ellipse(temp1[0] , temp1[1] , 10 , 10);



    
    let x1 = 0;
    let y1 = 5;
    let x2 = -5;
    let y2 = 0;
    let x3 = 5;
    let y3 = 0;
    
    // triangle(x1 , y1 , x2 , y2 , x3 , y3);
    fill(0);

    let tri = [[x1,y1] , [x2,y2] , [x3,y3]];
    // console.log(tri)
    // console.log(tri)
    // line(x1 , y1 , -200 , 59)
    // let deg = Math.atan2(edges[i].node_b.x , edges[i].node_b.y);//* (Math.PI/180)
    let m = (edges[i].node_b.y - edges[i].node_a.y) / (edges[i].node_b.x - edges[i].node_a.x);
    let deg = Math.atan(m) + 1.5708
    if(edges[i].node_a.y < edges[i].node_b.y) deg+=Math.PI;
    // console.log(deg - 1.5708)
    // console.log("M: " + (edges[i].node_b.y - edges[i].node_a.y) / (edges[i].node_b.x - edges[i].node_a.x))
    // if(deg - 1.5708 < 0) deg += 1.5708;
    if(m < 0) deg += 3.14
    // console.log(Math.atan2(-1,-1))
    let cos_res = Math.cos(deg);
    let sin_res = Math.sin(deg);
    // console.log(sin_res)
    // tri.map(vector => {vector[0]})
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
    tri.map(vector => {vector[0] += temp1[0]; vector[1] += temp1[1];})
    // triangle(tx1 , ty1 , tx2 , ty2 , tx3 , ty3);
    triangle(tri[0][0] , tri[0][1] , tri[1][0] , tri[1][1] , tri[2][0] , tri[2][1]);



    // console.log(mid);
    // let mid = find_triangle_location(edges[i].node_a.x , edges[i].node_a.y , edges[i].node_b.x , edges[i].node_b.y)
    // ellipse(mid[0] , mid[1] , 10 , 10);
    
  }

}
function draw_edges(edges) {
  fill(0);
  // edges = graph.edges;
  for(let i = 0; i < edges.length; i++) {
    if(edges[i].part_of_tree) {
      line(edges[i].node_a.x , edges[i].node_a.y , edges[i].node_b.x , edges[i].node_b.y);
      text(edges[i].weight , ((edges[i].node_a.x + edges[i].node_b.x) / 2) , ((edges[i].node_a.y + edges[i].node_b.y) / 2));










    }

    // console.log(temp1)
    //TODO calculate intersection between the edge and the second node and draw a rectangle there
    // let res = get_point(edges[i].node_a.y , edges[i].node_b.y , edges[i].node_a.x , edges[i].node_b.x);
    // triangle(((edges[i].node_a.x + edges[i].node_b.x) / 2) , ((edges[i].node_a.y + edges[i].node_b.y) / 2) , ((edges[i].node_a.x + 10+ edges[i].node_b.x) / 2) , ((edges[i].node_a.y +10+ edges[i].node_b.y) / 2) , ((edges[i].node_a.x + edges[i].node_b.x) / 2) , ((edges[i].node_a.y + edges[i].node_b.y) / 2))
  }
}


function trying(x1 , y1 , x2 , y2 , r) {
  //https://stackoverflow.com/questions/6091728/line-segment-circle-intersection
  let m = (y2 - y1) / (x2 - x1);
  let c = y2 - m * x2

  let temp = (Math.sqrt(1 + Math.pow(m , 2)))
  let res_x1 = x2 + r/temp;
  let res_x2 = x2 + r/(temp * -1);

  let res_y1 = m * res_x1 + c;
  let res_y2 = m * res_x2 + c;

  let dist1 = Math.floor((Math.sqrt(Math.pow(x1 - res_x1, 2)) + (Math.pow(y1 - res_y1, 2))));
  let dist2 = Math.floor((Math.sqrt(Math.pow(x1 - res_x2, 2)) + (Math.pow(y1 - res_y2, 2))))

  if(dist1 > dist2)
   return [res_x2 , res_y2]


  let trx1 = res_x1;
  let try1 = res_y1;

  //(10,10) 
  //(10,0)
  //(0,10)

  let trx2 = (10 + res_x1) * m;
  let try2 = res_y1 * m

  let trx3 = res_x1 * m;
  let try3 = (10 + res_y1) * m;
  // triangle(trx1 , try1 , trx2 , try2 , trx3 , try3);

  return [res_x1 , res_y1]


}

function draw_nodes(nodes) {
  for(let i = 0; i < nodes.length; i++) {
    if(nodes[i].part_of_tree) {
      fill(nodes[i].hex_color);
      if(source && equal_nodes(source , nodes[i])) fill(0)
      if(destination && equal_nodes(destination , nodes[i])) fill("red");
      ellipse(nodes[i].x , nodes[i].y , node_dim , node_dim);
    }
  }
}

function find_mid_point(x1 , y1 , x2 , y2) {
  let x = (x1 + x2) / 2;
  let y = (y1 + y2) / 2;
  return [x , y];

}
function find_triangle_location(x1 , y1 , x2 , y2) {
  let mid = find_mid_point(x1 , y1 , x2 , y2);
    // let dis = Math.floor((Math.sqrt(Math.pow(mid[0] - x2 , 2)) + (Math.pow(mid[1] - y2, 2))))
  for(let i = 0; i < 3; i++) {
    mid = find_mid_point(mid[0] , mid[1] , x2 , y2);
  }
  return mid;

}

function mouseDragged() {
  let x = mouseX - width/2;
  let y =(mouseY - height/2) * -1;
  let node_on_move = graph.nodes.find(node => node.contains(x , y))
  if(node_on_move) {
    // if(mouseX < width && mouseX > 0 && mouseY > 0 && mouseY < height)
    node_on_move.change_pos(x , y);
    dragging = true;
  }
}
function mouseClicked() {
  let x = mouseX - width/2;
  let y =(mouseY - height/2) * -1;
  // console.log(x + " " + y)
  
  if(dragging) {
    dragging = false;
    return;
  }
  let clicked_node = graph.nodes.find(node => node.contains(x , y));
  if(clicked_node) {
    // clicked_node.hex_color = 0;
  }
  let clicked_button = buttons.find(button => button.contains(x , y));
  if(clicked_button) clicked_button.click();
}





// function get_point(y1 , y2 , x1 , x2) {
//   let m = (y1 - y2)/(x1 - x2);
//   let c = y1 - m * x1;
//   let x = x2 - node_dim;
  
//   let y = -1/ m * x + c

//   let dy = Math.sqrt(Math.pow(3 , 2)/(Math.sqrt(m , 2) + 1))
//   let dx = -1 * m * dy; 
//   return [x  , y];
// }
// function get_perpendicular_line(x1 , y1 , x2 , y2) {
  
//   let m = (y1 - y2)/(x1 - x2);
//   let c = y1 - m * x1;
  
//   // y = -1/mx + c
//   //(midx , midy)
//   //newc = midy - (-1/m)midx

// }
