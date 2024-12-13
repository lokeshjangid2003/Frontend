import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProdcutsByFiltersAsync, selectAllItems, selectAllProducts, selectBrands, selectCategory,fetchCategoryAsync, fetchBrandsAsync } from '../productSlice';

import { useEffect } from 'react';
import { discountedPrice, ITEMS_PER_PAGE } from '../../../app/constant';

import Pagination from '../../common/Pagination';
// import { fetchAllProductsAsync } from '../productSlice';
/*
This example requires some changes to your config:

```
// tailwind.config.js
module.exports = {
  // ...
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
    ],
    }
    ```
    */
   import {
     Dialog,
     DialogBackdrop,
     DialogPanel,
     Disclosure,
     DisclosureButton,
     DisclosurePanel,
     Menu,
     MenuButton,
     MenuItem,
     MenuItems,
    } from '@headlessui/react'
    import { XMarkIcon } from '@heroicons/react/24/outline'
    import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
    import { ChevronLeftIcon, ChevronRightIcon ,StarIcon} from '@heroicons/react/20/solid'
    import { Link } from 'react-router-dom';
import { fetchCategories } from '../productAPI';

    const items = [
      { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
      { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
      { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
    ]

const sortOptions = [
  { name: 'Best Rating', sort:'rating',order:'desc', current: false },
  { name: 'Price: Low to High', sort:'price',order:'asc', current: false },
  { name: 'Price: High to Low', sort:'price',order:'desc', current: false },
]
// const subCategories = [
//   { name: 'Totes', href: '#' },
//   { name: 'Backpacks', href: '#' },
//   { name: 'Travel Bags', href: '#' },
//   { name: 'Hip Bags', href: '#' },
//   { name: 'Laptop Sleeves', href: '#' },
// ]




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}





export default function Product() {

  const dispatch=useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const products=useSelector(selectAllProducts);

  const totalItems=useSelector(selectAllItems);
  const brands=useSelector(selectBrands);
  const categories=useSelector(selectCategory)
  const [filter,setFilter]=useState({});
  const [sort,setSort]=useState({});
  const [page,setPage]=useState(1);



  const Products = [
    {
      id: 'brand',
      name: 'Brand',
      options:brands,
    },
    {
      id: 'category',
      name: 'Category',
      options:categories,
    },
  
  ]



  const handleFilter=(e,section,option)=>{
    let newFilter={...filter};
    let count=Object.keys(filter).length;

    if(e.target.checked){
      if(newFilter[section.id]){
        newFilter[section.id].push(option.value);
      }
      else{
        newFilter[section.id]=[option.value];
      }
    }
    else{
      let index=newFilter[section.id].findIndex((e)=>e==option.value);
      newFilter[section.id].splice(index,1);
    }
    console.log('filter Object is : ',newFilter);
    setFilter(newFilter);
  }

  const handleSort=(e,option)=>{
    const Lsort={ _sort :option.sort , _order :option.order};
    setSort(Lsort);
  }


  const handlePage=(e,page)=>{
    setPage(page);
  }


  useEffect(()=>{
    
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProdcutsByFiltersAsync({filter,sort,pagination}))
    // TODO :server will filter deleted products
  },[dispatch,filter,sort,page]);

  useEffect(()=>{
    dispatch(fetchCategoryAsync());
    dispatch(fetchBrandsAsync());
  },[])

  return (
    <>
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
               {/* Filters */}
               <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
             

                {Products && Products.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"

                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                            </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                > <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <p
                          onClick={(e)=>handleSort(e,option)}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                          )}
                        >
                          {option.name}
                        </p>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                
                {Products.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              onChange={(e)=>handleFilter(e,section,option)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                        </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}


              <div className="lg:col-span-3">
              <ProductGrid items={products}></ProductGrid>
              </div>
            
              </div>
          </section>
        </main>
      </div>




    {/* Pagination Start  */}
    <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems}></Pagination>
    
    </div>
   
    </>
  )
};



function ProductGrid({items}){

  return<>
     <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items && items.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
            <div key={product.id} className="group relative border-solid border-2 border-gray-100 p-2">
              <div className="min-h aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <img
                  alt={product.title}
                  src={product.images[0]}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <div href={product.thumbnail}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </div>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                  <StarIcon className='w-4 h-4 inline'></StarIcon>
                  <span className="align-bottom">{product.rating}</span>
                  </p>
                </div>
                <div>
                <p className="text-sm font-medium text-gray-900">${discountedPrice(product)}</p>
                <p className="text-sm block line-through font-medium text-gray-500">${product.price}</p>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </>
};

