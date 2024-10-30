document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const ContenedorProductos = document.getElementById('ContenedorProductos');
    const toggleViewBtn = document.getElementById('toggleView');
    let isGridView = false;

    // Alternar entre vista de lista y cuadrícula
    toggleViewBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        ContenedorProductos.className = isGridView ? 'grid-view' : 'list-view';
        toggleViewBtn.textContent = isGridView ? 'Ver en Lista' : 'Ver en Cuadrícula';
    });

    // Cargar productos desde la API
    const loadProducts = async (search = '', rubro = '') => {
        const response = await fetch(`/api/productos?search=${search}&rubro=${rubro}`);
        const productos = await response.json();
        renderProducts(productos);
    };

    // Renderizar los productos en la página
    const renderProducts = (productos) => {
        ContenedorProductos.innerHTML = '';
        productos.forEach(producto => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <div><strong>Código:</strong> ${producto.Codigo}</div>
                <div><strong>Descripción:</strong> ${producto.Descripcion}</div>
                <div><strong>Rubro:</strong> ${producto.Rubro}</div>
                <div><strong>Precio:</strong> $${producto.Precio}</div>
                <div><img src="${producto.URLImagen}" alt="${producto.Descripcion}" /></div>
            `;
            ContenedorProductos.appendChild(productItem);
        });
    };
    

    // Cargar productos al inicio
    loadProducts();

    // Búsqueda de productos
    searchInput.addEventListener('input', () => {
        const search = searchInput.value;
        const rubro = categorySelect.value;
        loadProducts(search, rubro);
    });

    // Filtrar productos por rubro
    categorySelect.addEventListener('change', () => {
        const search = searchInput.value;
        const rubro = categorySelect.value;
        loadProducts(search, rubro);
    });

    // Cargar rubros desde la API
    const loadCategories = async () => {
        const response = await fetch('/api/rubros');
        const rubros = await response.json();
        rubros.forEach(rubro => {
            const option = document.createElement('option');
            option.value = rubro.Codigo;
            option.textContent = rubro.Descripcion;
            categorySelect.appendChild(option);
        });
    };

    loadCategories();
});
