import 'lite-youtube-embed';
import Fslightbox from 'fslightbox';
window.fslightbox = Fslightbox;
import { zoom } from './partials/image-zoom';

class CustomSallaProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.products = [];
    this.filteredProducts = [];
    this.filters = {
      brand: [],
      size: [],
    };
    this.availableFilters = {
      brand: new Set(),
      size: new Set(),
    };
  }

  connectedCallback() {
    this.renderSkeleton();
    this.fetchProducts();
    this.initProductOptionValidations();
    this.initImagesZooming();

    window.addEventListener('resize', () => this.initImagesZooming());
  }

  async fetchProducts() {
    try {
      const res = await fetch('/api/v1/products');
      const json = await res.json();
      this.products = json.data || [];
      this.filteredProducts = [...this.products];
      this.extractAvailableFilters();
      this.render();
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }

  extractAvailableFilters() {
    this.products.forEach((product) => {
      if (product.brand) this.availableFilters.brand.add(product.brand);
      if (product.size) this.availableFilters.size.add(product.size);
    });
  }

  initProductOptionValidations() {
    this.shadowRoot.querySelector('.product-form')?.addEventListener('change', (event) => {
      this.reportValidity() && this.updateProductPrice(new FormData(event.target));
    });
  }

  updateProductPrice(formData) {
    // Your logic to update price after option change
    // For now, just log the updated form data
    console.log(formData);
  }

  initImagesZooming() {
    const imageZoom = this.shadowRoot.querySelector('.image-slider .magnify-wrapper');
    if (window.innerWidth < 1024 || imageZoom) return;
    setTimeout(() => {
      const image = this.shadowRoot.querySelector('.image-slider .swiper-slide-active img');
      zoom(image?.id, 2);
    }, 250);
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      const brandMatch = this.filters.brand.length ? this.filters.brand.includes(product.brand) : true;
      const sizeMatch = this.filters.size.length ? this.filters.size.includes(product.size) : true;
      return brandMatch && sizeMatch;
    });
    this.updateProductList();
  }

  renderFilterOptions(name) {
    const values = Array.from(this.availableFilters[name]);
    return values
      .map(
        (value) => `
      <label>
        <input type="checkbox" class="filter-checkbox" name="${name}" value="${value}" /> ${value}
      </label>
    `
      )
      .join('');
  }

  updateProductList() {
    const productList = this.shadowRoot.querySelector('#product-list');
    if (!productList) return;
    productList.innerHTML = '';
    if (!this.filteredProducts.length) {
      productList.innerHTML = '<p>لا توجد منتجات تطابق الفلاتر المختارة.</p>';
      return;
    }
    this.filteredProducts.forEach((product) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price?.formatted || ''}</p>
        <p><small>ماركة: ${product.brand || 'غير معروف'}</small></p>
        <p><small>المقاس: ${product.size || 'غير محدد'}</small></p>
      `;
      productList.appendChild(card);
    });
  }

  renderSkeleton() {
    const style = `
      <style>
        .filters {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .filter-group {
          margin-bottom: 10px;
        }
        .product-card {
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
      </style>
    `;

    const html = `
      ${style}
      <div class="filters">
        <div class="filter-group" id="brand-filters">
          <strong>ماركة:</strong><br/>
          <span>جاري التحميل...</span>
        </div>
        <div class="filter-group" id="size-filters">
          <strong>المقاس:</strong><br/>
          <span>جاري التحميل...</span>
        </div>
      </div>
      <div id="product-list">جاري تحميل المنتجات...</div>
    `;
    this.shadowRoot.innerHTML = html;
  }

  render() {
    const brandFilters = this.renderFilterOptions('brand');
    const sizeFilters = this.renderFilterOptions('size');
    this.shadowRoot.querySelector('#brand-filters').innerHTML = `
      <strong>ماركة:</strong><br/>
      ${brandFilters}
    `;
    this.shadowRoot.querySelector('#size-filters').innerHTML = `
      <strong>المقاس:</strong><br/>
      ${sizeFilters}
    `;
    this.updateProductList();
  }
}

customElements.define('custom-salla-product-card', CustomSallaProductCard);
