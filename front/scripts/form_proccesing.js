document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myform');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const des = document.getElementById('des').value;
        const price = document.getElementById('price').value;

        fetch('http://127.0.0.1:8000/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, des, price })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Product added:', data);
            location.reload();
        })
        .catch(error => console.error('Error adding product:', error));
    });



    function fetchProducts() {
        fetch('http://127.0.0.1:8000/api/products/')
            .then(response => response.json())
            .then(data => {
                productTable.innerHTML = '';
                data.forEach(product => {
                    const row = productTable.insertRow();
                    row.insertCell(0).textContent = product.id;
                    row.insertCell(1).textContent = product.name;
                    row.insertCell(2).textContent = product.des;
                    row.insertCell(3).textContent = product.price;
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }
    fetchProducts();
});
