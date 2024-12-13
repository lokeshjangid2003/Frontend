import { ITEMS_PER_PAGE } from "../../app/constant";
import { ChevronLeftIcon, ChevronRightIcon ,StarIcon} from '@heroicons/react/20/solid'



function Pagination({page,setPage,handlePage,totalItems}){
  return<>
   <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page-1)*ITEMS_PER_PAGE+1}</span> to <span className="font-medium">{page*ITEMS_PER_PAGE>totalItems?totalItems :page*ITEMS_PER_PAGE}</span> of{' '}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
             <div
              onClick={()=>{
                if(page!=1){
                  setPage(page-1)
                }
                }
              }
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </div>
            {Array.from({length:Math.ceil(totalItems/ITEMS_PER_PAGE)}).map((el,index)=>
              <div
              onClick={e=>handlePage(e,index+1)}
              key={index}
              className={`relative cursor-pointer inline-flex ${index+1==page? 'bg-indigo-600 text-white': 'text-gray-900'} items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
              >
              {index+1}
            </div>
            )}
            
    
            <div
              onClick={()=>
              {
                 const pageval=Math.ceil((totalItems)/ITEMS_PER_PAGE);
                 if(page!=pageval){
                  setPage(page+1);
                 }
              }
              }
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  </>
}

export default Pagination;