
class Cart {
    constructor() {
        this._items = [];
        this.apiUrl = "https://api.jsonbin.io/v3/b/655af05f12a5d376599bf455"; 
    }

    addToCart(plan) {
        this._items.push(plan);
        this.saveToApi();
    }

    saveToApi() {
        // Use fetch or your preferred method to save the cart data to the API
        // Example using fetch:
        fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this._items),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Cart data saved to API:', data);
            })
            .catch(error => {
                console.error('Error saving cart data to API:', error);
            });
    }
}
