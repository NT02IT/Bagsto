const filterProductBtn = document.querySelector('.products__cont .action__filter');
const filterCloseBtn = document.getElementById('btn-filter-close');
const filterPopover = document.getElementById('product-filter');
filterProductBtn.addEventListener('click', function(){
    filterPopover.classList.remove('collapsed');

    const prdFilterGenderList = filterPopover.querySelectorAll('.filter__gender input[type="checkbox"]')
    const prdFilterBrandList = filterPopover.querySelectorAll('.filter__brand input[type="checkbox"]')
    const prdFilterColorList = filterPopover.querySelectorAll('.filter__color input[type="checkbox"]')
    const prdFilterPriceList = filterPopover.querySelectorAll('.filter__price input[type="text"]')
    const deleteFilterOptionBtn = filterPopover.querySelector('.filter__action .delete')
    deleteFilterOptionBtn.addEventListener('click', () => {
        resetFilterOption(prdFilterGenderList);
        resetFilterOption(prdFilterBrandList);
        resetFilterOption(prdFilterColorList);
        for(let i = 0; i < prdFilterPriceList.length; i++){
            prdFilterPriceList[i].value = ""
        }
    });
});
filterCloseBtn.addEventListener('click', function(){
    filterPopover.classList.add('collapsed');
});

function resetFilterOption(listOption){
    for(let i=0; i<listOption.length; i++){
        listOption[i].checked = false;
    }
}

const sortProductBtn = document.querySelector('.products__cont .action__sort');
const sortProductPopover = document.querySelector('.products__cont .sort-popover')
sortProductBtn.addEventListener('click', function(){
    sortProductPopover.classList.toggle('hidden');
});

document.addEventListener("click", function (event) {
  // Kiểm tra xem người dùng có bấm ra ngoài popup mobileNav không
  if (!burgerBtn.contains(event.target) && !mobileNav.contains(event.target)) {
    mobileNav.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup accPopover không
  if (!headerAvatar.contains(event.target) && !accountPopover.contains(event.target)) {
    accountPopover.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup productFilterPopover không
  if (!filterProductBtn.contains(event.target) && !filterPopover.contains(event.target)) {
    filterPopover.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup sortProductPopover không
  if (!sortProductBtn.contains(event.target) && !sortProductPopover.contains(event.target)) {
    sortProductPopover.classList.add("hidden");
  }

});