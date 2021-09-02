class DijkstraHeap {
    constructor() {
        this.heap = [];
        this.size = 0;
        this.build_heap();
    }
    // constructor(arr) {
        
    //     this.heap = arr;
    //     this.size = arr.length;
    //     this.build_heap();
    // }
    update() {
        this.build_heap();
    }
    build_heap() {
        for(let i = Math.floor((this.size + 3) / 2); i >= 0; i--) {
            this.heapify(i);
        }
    }

    heapify(i) {
        let left_index = 2 * i + 1;
        let right_index = 2 * i + 2;
        let largest_index;
        // if(this.size === 3) {
        //     // console.log(i);
        //     // console.log(this.heap[i+1][0])
        //     console.log(this.heap[left_index])
        //     console.log(this.heap[right_index])
        //     // console.log(this.heap)
        //     // for(let a = 0; a < this.heap.length; a ++) {
        //     //     console.log(this.heap[a]);
        //     // }
        //     // console.log(this.size)
        // }

        if(left_index < this.size && this.heap[left_index].valueOf() < this.heap[i].valueOf()) largest_index = left_index;
        else largest_index = i;
        if(right_index < this.size && this.heap[right_index].valueOf() < this.heap[largest_index].valueOf()) largest_index = right_index;
        if(largest_index != i) {
            let temp = this.heap[largest_index];
            this.heap[largest_index] = this.heap[i];
            this.heap[i] = temp;
            this.heapify(largest_index);
        }
    }
    sort() {
        for(let i = this.size - 1; i > 0; i--) {
            let temp = this.heap[0];
            this.heap[0] = this.heap[i];
            this.heap[i] = temp;
            this.size -= 1;
            this.heapify(0);
        }
    }
    minimum() {
        return this.heap[0];
    }
    extract_min() {
        if(this.size < 1) return;
        let min = this.heap[0];
        this.size -= 1;
        this.heap[0] = this.heap[this.size];
        this.heapify(0)
        return min;
    }
    bubble_up(i) {
        while(i > 0 && this.heap[Math.floor((i - 1) / 2)].valueOf() > this.heap[i].valueOf()) {
            let temp = this.heap[Math.floor((i - 1) / 2)];
            this.heap[Math.floor((i - 1) / 2)] = this.heap[i];
            this.heap[i] = temp;
            i = Math.floor((i - 1) / 2);
        }
    }
    insert(element) {
        if(this.heap.length > this.size) {
            this.heap[this.size] = element;
            this.size += 1;
            this.bubble_up(this.size - 1)
        }
        else {
            this.size += 1;
            this.heap.push(element);
            this.bubble_up(this.size - 1)
        }
    }
    get_heap() {
        for(let i = 0; i < this.size; i ++) {
            console.log(this.heap[i]);
        }
    }
    get_array() {
        return this.heap.map(a => ({...a}))
    }
    ignore_from_heap(i) {
        let temp = this.heap[this.size - 1];
        this.heap[this.size - 1] = this.heap[i];
        this.heap[i] = temp;
        this.size -= 1; 
        this.heapify(0);
        // this.build_heap();
    }
}



class Data {
    constructor(ver , dis , pre) {
      this.vertex = ver;
      this.distance = dis;
      this.previous = pre;
    }
    valueOf() {
      return this.distance;
    }
  }






























class Heap {
    constructor(arr) {
        
        this.heap = arr;
        this.size = arr.length;
        this.build_heap();
    }

    build_heap() {
        for(let i = Math.floor((this.size + 3) / 2); i >= 0; i--) {
            this.heapify(i);
        }
    }

    heapify(i) {
        let left_index = 2 * i + 1;
        let right_index = 2 * i + 2;
        let largest_index;
        if(left_index < this.size && this.heap[left_index].valueOf() < this.heap[i].valueOf()) largest_index = left_index;
        else largest_index = i;
        if(right_index < this.size && this.heap[right_index].valueOf() < this.heap[largest_index].valueOf()) largest_index = right_index;
        if(largest_index != i) {
            let temp = this.heap[largest_index];
            this.heap[largest_index] = this.heap[i];
            this.heap[i] = temp;
            this.heapify(largest_index);
        }
    }
    // sort() {
    //     for(let i = this.size - 1; i > 0; i--) {
    //         let temp = this.heap[0];
    //         this.heap[0] = this.heap[i];
    //         this.heap[i] = temp;
    //         this.size -= 1;
    //         this.heapify(0);
    //     }
    // }
    minimum() {
        return this.heap[0];
    }
    extract_min() {
        if(this.size < 1) return;
        let min = this.heap[0];
        this.size -= 1;
        this.heap[0] = this.heap[this.size];
        this.heapify(0)
        return min;
    }
    bubble_up(i) {
        while(i > 0 && this.heap[Math.floor((i - 1) / 2)].valueOf() > this.heap[i].valueOf()) {
            let temp = this.heap[Math.floor((i - 1) / 2)];
            this.heap[Math.floor((i - 1) / 2)] = this.heap[i];
            this.heap[i] = temp;
            i = Math.floor((i - 1) / 2);
        }
    }
    insert(element) {
        if(this.heap.length > this.size) {
            this.heap[this.size] = element;
            this.size += 1;
            this.bubble_up(this.size - 1)
        }
        else {
            this.size += 1;
            this.heap.push(element);
            this.bubble_up(this.size - 1)
        }
    }
    get_heap() {
        for(let i = 0; i < this.size; i ++) {
            console.log(this.heap[i]);
        }
    }
    get_array() {
        return this.heap.map(a => ({...a}))
    }
    ignore_from_heap(i) {
        let temp = this.heap[this.size - 1];
        this.heap[this.size - 1] = this.heap[i];
        this.heap[i] = temp;
        this.size -= 1; 
        this.heapify(0);
        // for(let i = this.size - 1; i > 0; i--) {
        //     this.bubble_up(i);
        // }
        // this.build_heap();
    }
}
