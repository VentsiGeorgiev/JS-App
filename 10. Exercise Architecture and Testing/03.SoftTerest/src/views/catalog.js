import { e } from '../views/dom.js';

const section = document.getElementById('dashboard-holder');
section.remove();

export async function showCatalogPage(ctx) {
   ctx.showSection(section);
}