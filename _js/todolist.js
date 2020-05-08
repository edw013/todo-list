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

    const listNames = document.getElementById("listNames");
    const lastNode = listNames.lastElementChild;
    const prevNodeId = (lastNode == null) ? "" : lastNode.getAttribute("data-id");
    const node = new LinkedListNode("", data.get("item"), data.get("desc"), prevNodeId, "", data.get("tags"));
    itemList.addNode(node);

    // change the currently active to inactive
    const activeNodeNameEl = listNames.getElementsByClassName("list-group-item list-group-item-action active")[0];
    if (activeNodeNameEl != undefined) {
        activeNodeNameEl.setAttribute("class", "list-group-item list-group-item-action");
    }

    const nodeNameEl = document.createElement("a");
    nodeNameEl.setAttribute("id", node.id + "-name");
    nodeNameEl.setAttribute("class", "list-group-item list-group-item-action active");
    nodeNameEl.setAttribute("data-toggle", "list");
    nodeNameEl.setAttribute("href", "#" + node.id + "-desc");
    nodeNameEl.setAttribute("role", "tab");
    nodeNameEl.setAttribute("aria-controls", node.name);
    nodeNameEl.setAttribute("data-id", node.id);
    nodeNameEl.innerHTML = node.name;
    listNames.appendChild(nodeNameEl);

    const listDescs = document.getElementById("listDescs");
    // change the currently active to inactive
    const activeNodeDescEl = listDescs.getElementsByClassName("tab-pane fade show active")[0];
    if (activeNodeNameEl != undefined) {
        activeNodeDescEl.setAttribute("class", "tab-pane fade show");
    }

    const nodeDescEl = document.createElement("div");
    nodeDescEl.setAttribute("class", "tab-pane fade show active");
    nodeDescEl.setAttribute("id", node.id + "-desc");
    nodeDescEl.setAttribute("role", "tabpanel");
    nodeDescEl.setAttribute("aria-labelledby", node.id + "-name");
    nodeDescEl.innerHTML = node.desc;
    listDescs.appendChild(nodeDescEl);

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