Github Pages link: https://bashirnayal.github.io/graphs/code/index.html


Quickly construct a graph and test a few things in mind



adding a node:
-from the menu that can be accessed by right clicking on the background
-clicking on a node will allow the user to create an edge. If the second position where the user connect the edge to is not a node, a new node will be created with an incoming edge

deleting a node:
-right clicking on a node will show a menu with this operation. Deleting a node will also delete all the edges associated with it.

adding an edge:
-clicking on a node will create a pending endge which can be connect to a different node by clicking on the desired node. Clicking on the background outside of any nodes will create a new node with the new edge
if the node picked already has an incoming edge from the initial node, it won't be added

deleting an edge:
-double clicking on the node that contains the edge as an 


toggle res button:
when dijkstra is calculated for instance, clicking this button will show the whole graph and not just the path between the source and destination node.
changing the destination node will not invalidate dijkstra results and will adapt the view accordingly.
Changin the source node, updating the weight of an edge, or adding or deleting a node or an edge will wipe out dijkstra results.


//TODO clean the in array of nodes when delting

//TODO when updating multuple/all edges to 0, not everything gets updated

