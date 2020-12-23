import React, { useEffect, useState, useRef, useCallback } from 'react';
import {useParams, useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getContacts, initContact, setFilterEven} from "../store/contact/action";
import {CustomScrollbar, CustomTable} from "../component";
import {evenSelector, getContactData, getPages, isLoadingSelector} from "../store/contact/selector";

const headerRows = ['ID', 'Name', 'Phone'];

function ModalView() {
  const { option } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [contact, setContact] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  const contacts = useSelector(getContactData);
  const pages = useSelector(getPages)
  const isLoading = useSelector(isLoadingSelector)
  const even = useSelector(evenSelector)

  console.log({contacts, pages, isLoading, even})
  let bottomBoundaryRef = useRef(null);

  const closeModal = e => {
    e.stopPropagation();
    if (contact) {
      setContact(null)
    } else {
      history.goBack();
    }
  };

  const navigate = (path) => {
    if (contact) {
      setContact(null)
    }
    if (path === option) return
    dispatch(initContact())
    history.replace(`/contacts/${path}`, { background: location.state.background })
  }

  const scrollObserver = useCallback(
      node => {
        new IntersectionObserver(entries => {
          entries.forEach(en => {
            if (en.intersectionRatio > 0 && pages !== 0 && pages > page && !isLoading) {
              // dispatch(getContacts(page, query, countryId))
              setPage(page + 1)
              // setTimeout(() => setPage(page + 1), 100)
            }
          });
        }).observe(node);
      },
      [page, pages, isLoading]
  );

  const onChangeEven = useCallback((e) => {
    dispatch(setFilterEven(e.target.checked))
  }, [dispatch])

  const onChangeQuery = (e) => {
    setSearch(e.target.value)
  }

  const onClickRow = (row) => setContact(row)

  useEffect(() => {
    const timeOutId = setTimeout(() => setQuery(search), 2000);
    return () => clearTimeout(timeOutId);
  }, [search]);

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
           {contact ? <h3>Contact Detail</h3>
                    : <h3>{option === 'all' ? 'All' : 'US'} Contacts</h3>
           }
           {!contact &&
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={onChangeQuery}
              placeholder="search..." />
           }
         </div>
         <div className="modal-body">
           {contact ? (
             <div>
               <h5>Contact ID: {contact.id}</h5>
               <h5>Name: {contact.first_name + ' ' + contact.last_name}</h5>
               <h5>Country: {contact.country.iso}</h5>
               <h5>Email: {contact.email}</h5>
               <h5>Phone: {contact.phone_number}</h5>
             </div>
           ) : (
             <CustomScrollbar>
               <CustomTable
                   tableName="contactTable"
                   headerRows={headerRows}
                   data={contacts}
                   onClickRow={onClickRow}
               />
               {!isLoading && <div id='page-bottom-boundary' style={{ border: '1px solid red' }} ref={bottomBoundaryRef} />}
             </CustomScrollbar>
           )}
         </div>
         <div className="modal-footer justify-content-between">
           <div className="align-items-start" style={contact && { visibility: 'hidden'}}>
             <div className="form-check">
               <input className="form-check-input" type="checkbox" value="" id="checkEven" checked={even} onChange={onChangeEven} />
               <label className="form-check-label" htmlFor="checkEven">
                 Only Even
               </label>
             </div>
           </div>
           <div>
             <button className="btn btn-primary btn-sm mx-2" onClick={() => navigate('all')}>All Contacts</button>
             <button className="btn btn-primary btn-sm mx-2" onClick={() => navigate('us')}>US Contacts</button>
             <button className="btn btn-danger btn-sm mx-2" onClick={closeModal}>Close</button>
           </div>
         </div>
       </div>
      </div>
  );
}

export default ModalView;
