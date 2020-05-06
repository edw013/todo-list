/*jshint esversion: 6 */
/*jshint bitwise: false*/
class LinkedList {
    constructor() {
        this.nodes = new Map();
        this.head = "";
    }

    addNode(node) {
        // connect the previous node to the new node
        if (node.prev != "") {
            const prevNode = this.nodes.get(node.prev);
            prevNode.next = node.id;
        }

        if (node.next != "") {
            const nextNode = this.nodes.get(node.next);
            nextNode.prev = node.id;
        }

        this.nodes.set(node.id, node);

        //this.setToStorage();
    }

    deleteNode(node) {
        // we grab this because if we're coming from modify then the prev
        // and next will be incorrect
        const deleteNode = this.nodes.get(node.id);

        // reattach nodes around the node bieng deleted
        if (deleteNode.prev != "") {
            const prevNode = this.nodes.get(deleteNode.prev);
            prevNode.next = deleteNode.next;
        }

        if (deleteNode.next != "") {
            const nextNode = this.nodes.get(deleteNode.next);
            nextNode.prev = deleteNode.prev;
        }

        this.nodes.delete(node.id);

        //this.setToStorage();
    }

    modifyNodeOrder(node) {
        // just remove the node and readd it
        this.deleteNode(node);

        this.addNode(node);
    }

    modifyNodeContent(node) {
        // overwrite the node
        this.nodes.set(node.id, node);

        //this.setToStorage();
    }

    /*getFromStorage() {
        this.nodes = localStorage.getItem("itemList");
        this.head = localStorage.GetItem("itemListHead");
    }

    setToStorage() {
        localStorage.setItem("itemList", this.nodes);
        localStorage.setItem("itemListHead", this.head);
    }*/
}

class LinkedListNode {
    constructor(id, name, desc, prev, next, tagList) {
        this.id = (id != "") ? id : this.guidGenerator();
        this.name = name;
        this.desc = desc;
        this.prev = prev;
        this.next = next;
        this.tags = {};
        const tags = tagList.split(",");
        for (let i = 0; i < tags.length; i++) {
            this.tags[tags[i]] = true;
        }
    }

    guidGenerator() {
        const S4 = function() {
           return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16).substring(1);
        };

        return ("_" + S4() + S4() + "-" + 
                S4() + "-" + S4() + "-" + S4() + "-" + 
                S4() + S4() + S4());
    }
}