'use strict'
import View from './demoViews.js';
import icons from 'url:../../img/icons.svg';


class PaginationView extends View{
    _parentElement = document.querySelector(".pagination");

    addHandlerPagination(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            console.log(btn);
            handler(+btn.dataset.goto);
           // console.log(+btn.dataset.goto);


        });


    }
    _generateMarkup() {

        const currPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
      

        if (currPage === 1 && numPages > 1) {

            return ` <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
            <span>Page${currPage +1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;

        }
        if (currPage == numPages && numPages > 1) {

            return `<button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page${currPage-1}</span>
          </button>`;

        }
        if (currPage < numPages) {
            return `<button data-goto="${currPage-1}"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page${currPage - 1}</span>
          </button>

            <button data-goto="${currPage + 1}"class="btn--inline pagination__btn--next">
            <span>Page${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;


            

        }
        return '';

    }





}
export default new PaginationView();