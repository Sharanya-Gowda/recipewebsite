let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});

document.querySelector('.btn-delete').addEventListener('click', async function() {
  const recipeId = this.closest('.recipe').getAttribute('data-id');
  
  try {
    const response = await fetch(`/recipe/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      alert('Recipe deleted successfully');
      location.reload();  // Reload the page to reflect changes
    } else {
      alert(data.message || 'Failed to delete recipe');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
