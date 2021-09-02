'use strict'
import icons from "url:../../img/icons.svg";
import View from "./demoViews.js";
import PreviewView from './demoPreviewView.js';
class resultView extends View {

    _parentElement = document.querySelector('.results');
    _errorMessage = "we could not find the recipe so please try again later";
    _message = "";
    _generateMarkup() {
        //console.log(icons);
        return this._data.map((result) => PreviewView.render(result, false)).join('');

    }


   /* _generateMarkupPreview(result) {
        const id = window.location.hash.slice(1);
        return `<li class="preview">
      <a class="preview__link ${result.id===id ? 'preview__link--active': ""}" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
    }*/


}
export default new resultView();