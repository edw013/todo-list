const populateList = head => {
    if (head == "") {
        return;
    }

    const listEl = document.getElementById("list");
    const curNode = itemList[head];
    while (curNode.next != "") {
        const listNodeEl = document.createElement("li");
        listNodeEl.setAttribute("class", "listNode");
        listNodeEl.setAttribute("data-id", curNode.id);
        // create some kind of card element with the data
        listEl.appendChild(listNodeEl);
        curNode = itemLIst[curNode.next];
    }
}

const addItemDialog = itemList => {
    const itemDialogTitle = document.getElementById("itemDialogTitle");
    itemDialogTitle.innerHTML = "Add Item";
    const confirmButton = document.getElementById("itemDialogConfirmButton");
    confirmButton.innerHTML = "Add";

    // we use onclick here because we want to overwrite other listeners
    confirmButton.onclick = () => {
        addItemSubmit(itemList);
    }
}

const addItemSubmit = itemList => {
    const nameEl = document.getElementById("itemName");
    if (!nameEl.checkValidity()) {
        return false;
    }

    const itemForm = document.getElementById("itemForm");
    const data = new FormData(itemForm);

    const list = document.getElementById("list");
    const lastNode = list.lastElementChild;
    const prevNodeId = (lastNode == null) ? "" : lastNode.getAttribute("data-id");
    const node = new LinkedListNode("", data.get("item"), data.get("desc"), prevNodeId, "", data.get("tags"));
    itemList.addNode(node);

    const nodeLi = document.createElement("li");
    nodeLi.setAttribute("data-id", node.id);
    nodeLi.innerHTML = node.name;
    list.appendChild(nodeLi);

    // alas we must use jquery
    $("#itemDialog").modal("hide");
    resetItemForm();
}

const addTags = () => {
    const itemTagsFakeEl = document.getElementById("itemTagsFake");
    const itemTagsEl = document.getElementById("itemTags");
    if (itemTagsFakeEl.value != "") {
        const tags = itemTagsFakeEl.value.split(",");
        const tagList = document.getElementById("tagList");
        for (let i = 0; i < tags.length; i++) {
            const newTag = document.createElement("div");
            newTag.setAttribute("class", "tag");
            newTag.innerHTML = tags[i].trim();
            tagList.appendChild(newTag);
        }

        if (itemTagsEl.value == "") {
            itemTagsEl.value = itemTagsFakeEl.value;
        }
        else {
            itemTagsEl.value += "," + itemTagsFakeEl.value;
        }

        itemTagsFakeEl.value = "";
    }
}

const getItems = () => {
}

const resetItemForm = () => {
    document.getElementById("itemForm").reset();
    const tagList = document.getElementById("tagList");
    tagList.innerHTML = "";
}