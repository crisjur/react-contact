import React, { useEffect, useState, useRef, useCallback } from 'react';
import {useParams, useHistory, Link, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getContacts, initContact, setFilterEven} from "../store/contact/action";
import {CustomScrollbar, CustomTable} from "../component";
import {evenSelector, getContactData, getPages, isLoadingSelector} from "../store/contact/selector";


const headerRows = ['ID', 'Name', 'Email'];

function ModalView() {
  const { option } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [contact, setContact] = useState(null)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [countryId, setCountryId] = useState('')

  const contacts = useSelector(getContactData);
  const pages = useSelector(getPages)
  const isLoading = useSelector(isLoadingSelector)
  const even = useSelector(evenSelector)

  console.log({contacts, pages, isLoading, even})
  let bottomBoundaryRef = useRef(null);

  const closeModal = e => {
    e.stopPropagation();
    history.goBack();
  };

  const scrollObserver = useCallback(
      node => {
        new IntersectionObserver(entries => {
          entries.forEach(en => {
            if (en.intersectionRatio > 0 && pages !== 0 && pages > page && !isLoading) {
              console.log("========node=======", node)
              // dispatch(getContacts(page, query, countryId))
              setPage(page + 1)
              // setTimeout(() => setPage(page + 1), 100)
            }
          });
        }).observe(node);
      },
      [page, pages, isLoading, dispatch]
  );

  const onChangeEven = useCallback((e) => {
    console.log(e.target.checked)
    dispatch(setFilterEven(e.target.checked))
  }, [])

  useEffect(() => {
    if (option === 'all') {
      dispatch(getContacts(page, query))
    } else if (option === 'us') {
      dispatch(getContacts(page, query, '226'))
    }
  }, [option, page, query, dispatch]);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
      dispatch(initContact())
    };
  }, [dispatch]);

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);
  return (
      <div className="modal-container">
       <div className="modal-content">
         <div className="modal-header d-flex flex-column">
           {contact ? <h3>Contract Detail</h3>
                    : <h3>{option === 'all' ? 'All' : 'US'} Contracts</h3>
           }
           {!contact &&
            <input
              type="text"
              className="form-control"
              placeholder="search..." />
           }
         </div>
         <div className="modal-body">
           <CustomScrollbar>
             <CustomTable
               tableName="contactTable"
               headerRows={headerRows}
               data={contacts}
             />
             {!isLoading && <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef} />}
           </CustomScrollbar>
         </div>
         <div className="modal-footer justify-content-between">
           <div className="align-items-start">
             <div className="form-check">
               <input className="form-check-input" type="checkbox" value="" id="checkEven" checked={even} onChange={onChangeEven} />
               <label className="form-check-label" htmlFor="checkEven">
                 Only Even
               </label>
             </div>
           </div>
           <div>
             <button className="btn btn-primary btn-sm mx-2">All Contracts</button>
             <button className="btn btn-primary btn-sm mx-2">US Contacts</button>
             <button className="btn btn-danger btn-sm mx-2" onClick={closeModal}>Close</button>
           </div>
         </div>
       </div>
      </div>
  );
}

export default ModalView;
