function graph_updated() {
    dijkstra_table = null;
  }



function equal_nodes(n1 , n2) {
return n1.x == n2.x && n1.y == n2.y;
}

function print_table(table) {
    let str = "vertex\t\t\tdistance\t\tpredecessor\n";
  for(let i = 0; i < table.heap.length; i++) {
    let cell_1 = table.heap[i].vertex.id;
    let cell_2 = (table.heap[i].distance == Number.MAX_SAFE_INTEGER ?
              "infinity" : table.heap[i].distance);
    let cell_3 = table.heap[i].previous.id;

    str += table.heap[i].vertex.id + "\t\t\t" + 
    (table.heap[i].distance == Number.MAX_SAFE_INTEGER ?
      "infinity" : table.heap[i].distance) +
    "\t\t" + 
    table.heap[i].previous.id + "\n";
  }
  console.log(str);
}


function get_random_graph(nodes_count , directed) {
    let min_x =  0;
    let min_y = 0;
    let max_x = width;
    let max_y = height;
    let nodes = [];
    for(let i = 0; i < nodes_count; i++) {
      let temp = 
        new Node(Math.floor(Math.random() * 
        (max_x - min_x) + min_x) , 
        Math.floor(Math.random() * (max_y - min_y) + min_y) ,
        namer.get_next()); // <------------------------------------------------------
      let found = nodes.find(node => node.contains(temp.x , temp.y));
      if(found) i--;
      else 
        nodes.push(temp);
    }
    nodes.map(node => {
      for(let i = 0; i < Math.floor(Math.random() * 5 + 1); i++) {
        let next_neighbour = nodes[Math.floor(Math.random() * nodes_count)];
        if(node.out.find(e => equal_nodes(e.node_b , next_neighbour))) continue;
        new_edge = new Edge(node , 
                            next_neighbour , 
                            Math.floor((Math.sqrt(Math.pow(node.x - next_neighbour.x, 2)) + 
                            (Math.pow(node.y - next_neighbour.y, 2))) / 100));
        if(equal_nodes(new_edge.node_a , new_edge.node_b)) continue;
        node.out.push(new_edge);
        next_neighbour.in.push(new_edge);
        if(!directed) {
          new_edge_back = new Edge(next_neighbour , 
                                   node ,
                                   Math.floor((Math.sqrt(Math.pow(node.x - next_neighbour.x, 2)) + 
                                   (Math.pow(node.y - next_neighbour.y, 2))) / 100));
          node.in.push(new_edge_back);
          next_neighbour.out.push(new_edge_back);
        }
      }
    })
    return new Graph(nodes , null, directed);
}