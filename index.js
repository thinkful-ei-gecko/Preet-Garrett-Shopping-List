'use strict'

//create an array store for data (shopping list items and other attributes) 
const store = [
    {id: cuid(), name:'apples', checked: false},
    {id: cuid(), name:'oranges', checked: false},
    {id: cuid(), name:'milk', checked: true},
    {id: cuid(), name:'bread', checked: false}
];

////\\\\creation of function stubs with pseudocode////\\\\

//function for looping/iterating over store - use map(), generate item string
function generateItemElement(item, itemIndex, template){
    return `
        <li data-item-id="${item.id}">
            <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
            <div class="shopping-item-controls">
            <button class="shopping-item-toggle js-item-toggle">
                <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete js-item-delete">
                <span class="button-label">delete</span>
            </button>
            </div>
        </li>`;
}

//function for generating hmtl string - need to iterate over the <li> to generate the string - define a new function for this
function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item, index) => generateItemElement(item, index));
    return items.join("");
}

//function for showing/rendering list to the DOM
function renderShoppingList(){
    //render shopping list in the DOM 
    //where will it be rendered in html? - <ul class="shopping-list js-shopping-list"></ul> need to target that class when writing function
    //what - for each item in store, a string is to be generated
    //join each element into one string, insert back to DOM
    const shoppingListItemsString = generateShoppingItemsString(store);
    $('.js-shopping-list').html(shoppingListItemsString);
}

//function responsible for updting the store with new item 
function addItemToShoppingList(itemName) {
    store.push({id: cuid(), name: itemName, checked: false});
}

//function for when a user submits a new item to their list
function handleNewItemSubmit(){
    //user inputs a new item in the list - which needs to be stored
    //new item appears/appends onto the original list - generate a new list
    //render new shopping list in DOM each time the user adds a new item
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        const newItemName = $('.js-shopping-list-entry').val();
        //console.log(newItemName);
        $('.js-shopping-list-entry').val('');
        addItemToShoppingList(newItemName);
        renderShoppingList();
      });
}

function toggleCheckedForListItem(itemId) {
    //console.log("Toggling checked property for item with id " + itemId);
    const item = store.find(item => item.id === itemId);
    item.checked =! item.checked;
}

function getItemIdFromElement(item) {
    return $(item)
      .closest('li')
      .data('item-id');
}

//function for when a user checks an item off their list 
function handleItemCheckClicked() {
    //check for when an item has been checked-off/clicked
    //iterate through store and target item that was clicked
    //toggle checked property - change value in field
    //re-render list - to refelct updates
    $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
      //console.log('`handleItemCheckClicked` ran');
      const id = getItemIdFromElement(event.currentTarget);
      //console.log(itemId);
      toggleCheckedForListItem(id);
      renderShoppingList();
    });
  }

function deleteListItem(itemId){
    const itemIndex = store.findIndex(item => item.id === itemId);
    store.splice(itemIndex, 1)

}

//function for when a user deletes an item to their list
function handleDeleteItemChecked(){
    //check for when delete button is clicked, iterate thru
    //remove item from store - toggle 
    //re-render shopping list in DOM
    $('.js-shopping-list').on('click', `.js-item-delete`, event => {
        //console.log('`handleDeleteItemChekced` ran');
        const itemIndex = getItemIdFromElement(event.currentTarget);
        //console.log(itemId);
        deleteListItem(itemIndex);
        renderShoppingList();
      });
    }

//callback function, when page loads, initally renders shopping list and activating indiviudal functions
function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemChecked();
  }


$(handleShoppingList);