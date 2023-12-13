let types = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

let recipes = [
  [
    [{ name: 'Pancakes', type: 'Breakfast' }],
    [{ name: 'Chips', type: 'Snacks' },
    [{ name: 'Omelette', type: 'Breakfast' }],
    [{ name: 'Sandwich', type: 'Lunch' }],
    [{ name: 'Pizza', type: 'Dinner' }],
    [{ name: 'Salad', type: 'Lunch' }]
  ],
  [
    [{ name: 'Pizza', type: 'Dinner' }],
    [{ name: 'Pancakes', type: 'Breakfast'}],
    [{ name: 'Sandwich', type: 'Lunch' }],
    [{ name: 'Chips', type: 'Snacks' }],
    [{ name: 'Omelette', type: 'Breakfast' }],
    [{ name: 'Salad', type: 'Lunch' }]
  ],
  [
    [{ name: 'Omelette', type: 'Breakfast' }],
    [{ name: 'Salad', type: 'Lunch' },
    [{ name: 'Pancakes', type: 'Breakfast' }],
    [{ name: 'Sandwich', type: 'Lunch' }],
    [{ name: 'Pizza', type: 'Dinner' }],
    [{ name: 'Chips', type: 'Snacks' }]
  ],
  [
    [{ name: 'Sandwich', type: 'Lunch' }],
    [{ name: 'Pizza', type: 'Dinner' }],
    [{ name: 'Chips', type: 'Snacks' }],
    [{ name: 'Pancakes', type: 'Breakfast' }],
    [{ name: 'Omelette', type: 'Breakfast' }],
    [{ name: 'Salad', type: 'Lunch' }]
  ]
];

recipes[0][0].type = types[0]

// Custom sorting function
function sortByTypes(arr) {
  return arr.sort((a, b) => {
    let typeA = types.indexOf(a.type);
    let typeB = types.indexOf(b.type);
    return typeA - typeB;
  });
}

// Sorting each sub-array in recipes array
this.renderRecipes.forEach(subArray => sortByTypes(subArray));

console.log(recipes);