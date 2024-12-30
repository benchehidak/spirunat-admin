/* eslint-disable react/display-name */
'use client';
import React, { useState, useMemo } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import Modal from "react-modal";
import axios from "axios";
import { useSession } from "next-auth/react";




// const IndeterminateCheckbox = React.forwardRef(
  //   ({ indeterminate, ...rest }, ref) => {
    //     const defaultRef = React.useRef();
    //     const resolvedRef = ref || defaultRef;
    
    //     React.useEffect(() => {
      //       resolvedRef.current.indeterminate = indeterminate;
      //     }, [resolvedRef, indeterminate]);
      
      //     return (
        //       <>
        //         <input
        //           type="checkbox"
        //           ref={resolvedRef}
        //           {...rest}
        //           className="table-checkbox"
        //         />
        //       </>
        //     );
        //   }
        // );
        
const ExamapleOne = (bookingData) => {
  const { data: session } = useSession();

  function openModal(userData) {
    setUserData(userData);
    setModalContent(
        <div className='flex flex-col'>
            <div >
            <div className='flex flex-row'>
            <h1 className='font-bold'>
                Name:
            </h1>
            <h1 >
                {userData.name}
            </h1>
            </div>
                <div className='flex flex-row'>
                    <h1  className='font-bold'>
                        Email:
                    </h1>
                    <h1>
                        {userData.email + ' '}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1  className='font-bold'>
                        Phone Number:
                    </h1>
                    <h1 >
                        {userData.phoneNumber}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1  className='font-bold'>
                        Number of Tickets:
                    </h1>
                    <h1>
                        {userData.numTickets}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1 className='font-bold'>
                        Status:
                    </h1>
                    <h1>
                        {userData.status}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1 className='font-bold '>
                        Birth Date:
                    </h1>
                    <h1 >
                        {userData.birthDate}
                    </h1>
                </div>
            </div>
        </div>
    );
    setModalIsOpen(true);
    }
    function closeModal(){
      setModalIsOpen(false);
  }
  function deletebooking(id){
      axios.post('/api/protected/deletebooking', {
          id: id,
          })
          .then(function (response) {
              if(response.data.success)
                  {
                      window.location.reload();
                      setUserData(null);
                  
                  }
          })
          .catch(function (error) {
              console.log(error);
          });
  }
  function markContactedSold(id, sellData) {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/protected/marksold/', { id });
        const resSell = await axios.post('/api/protected/sell/', { 
          name: sellData.name,
          email: sellData.email,
          phoneNumber: sellData.phoneNumber,
          seller: session.user.name,
         });
        console.log(resSell.data);
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }
  function openModalsell(selldata) {
    setSellData(selldata);
    console.log(selldata);
    setModalSellContent(
        <div className='flex flex-col'>
            <div >
            <div className='flex flex-row'>
            <h1 className='font-bold'>
                Name:
            </h1>
            <h1 >
                {selldata.name}
            </h1>
            </div>
                <div className='flex flex-row'>
                    <h1  className='font-bold'>
                        Email:
                    </h1>
                    <h1>
                        {selldata.email + ' '}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1  className='font-bold'>
                        Phone Number:
                    </h1>
                    <h1 >
                        {selldata.phoneNumber}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1  className='font-bold'>
                        Number of Tickets:
                    </h1>
                    <h1>
                        {selldata.numTickets}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1 className='font-bold'>
                        Status:
                    </h1>
                    <h1>
                        {selldata.status}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1 className='font-bold '>
                        Birth Date:
                    </h1>
                    <h1 >
                        {selldata.birthDate}
                    </h1>
                </div>
            </div>
        </div>
    );
    setModalSellIsOpen(true);
    }
    function closeSellModal(){
      setModalSellIsOpen(false);
    }
    function openModalContacted(contacteddata) {
      setContactedData(contacteddata);
      setModalContactedContent(
        <div className='flex flex-col'>
            <div >
            <div className='flex flex-row'>
            <h1 className='font-bold'>
                Name:
            </h1>
            <h1 >
                {contacteddata.name}
            </h1>
            </div>
                <div className='flex flex-row'>
                    <h1  className='font-bold'>
                        Email:
                    </h1>
                    <h1>
                        {contacteddata.email + ' '}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1  className='font-bold'>
                        Phone Number:
                    </h1>
                    <h1 >
                        {contacteddata.phoneNumber}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1  className='font-bold'>
                        Number of Tickets:
                    </h1>
                    <h1>
                        {contacteddata.numTickets}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1 className='font-bold'>
                        Status:
                    </h1>
                    <h1>
                        {contacteddata.status}
                    </h1>
                </div>
                <div className='flex flex-row items-center'>
                    <h1 className='font-bold '>
                        Birth Date:
                    </h1>
                    <h1 >
                        {contacteddata.birthDate}
                    </h1>
                </div>
            </div>
        </div>
    );
    setModalContactedIsOpen(true);
    }
    function closeModalContacted(){
      setModalContactedIsOpen(false);
    }
    function markContacted(id) {
      const fetchData = async () => {
        try {
          const response = await axios.post('/api/protected/markcontacted/', { id });
          console.log(response.data);
          window.location.reload();
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }



  const COLUMNS = [
  
    {
      Header: "Name",
      accessor: "name",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Phone",
      accessor: "phoneNumber",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: (row) => {
        return <span style={{textTransform: 'none'}} >{row?.cell?.value}</span>;
      },
    },
    
    {
      Header: "Birthdate",
      accessor: "birthDate",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "quantity",
      accessor: "numTickets",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "date",
      accessor: "date",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "status",
      accessor: "status",
      Cell: (row) => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                row?.cell?.value === "Sold"
                  ? "text-success-500 bg-success-500"
                  : ""
              } 
              ${
                row?.cell?.value === "contacted"
                  ? "text-warning-500 bg-warning-500"
                  : ""
              }
              ${
                row?.cell?.value === "Pending"
                  ? "text-danger-500 bg-danger-500"
                  : ""
              }
              
               `}
            >
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div>
            <Dropdown
              classMenuItems="right-0 w-[140px] top-[-60px] "
              label={
                <span className="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {actions.map((item, i) => (
                  <Menu.Item key={i}>
                    <div
                      onClick={() => item.click(row?.cell?.row?.original)}
                      className={`
                  
                    ${
                      item.name === "delete"
                        ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                        : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                    }
                     w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                     first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                     
                    >
                      <span className="text-base">
                        <Icon icon={item.icon} />
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  
  const actions = [
    {
      name: "Contacted",
      icon: "heroicons-outline:check",
      click : (userdata) => {
        openModalContacted(userdata)
      }
    },
    {
      name: "Sell",
      icon: "heroicons:shopping-cart",
      click : (userdata) => {
        openModalsell(userdata)
      }
  
    },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
      click : (userdata) => {
        openModal(userdata)
      }
  
    },
  ];
  // console.log(bookingData);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => bookingData.bookingData, []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [userData, setUserData] = useState(null);
  const [modalsellIsOpen, setModalSellIsOpen] = useState(false);
  const [modalSellContent, setModalSellContent] = useState('');
  const [selldata, setSellData] = useState(null);
  const [modalContactedIsOpen, setModalContactedIsOpen] = useState(false);
  const [modalContactedContent, setModalContactedContent] = useState('');
  const [contacteddata, setContactedData] = useState(null);


  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Bookings</h4>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  
                  <tr>
                    <th className="table-th">
                      Name
                    </th>
                    <th className="table-th">
                      Phone
                    </th>
                    <th className="table-th">
                      Email
                    </th>
                    <th className="table-th">
                      Birthdate
                    </th>
                    <th className="table-th">
                      quantity
                    </th>
                    <th className="table-th">
                      date
                    </th>
                    <th className="table-th">
                      status
                    </th>
                    <th className="table-th">
                      action
                    </th>
                  </tr>

                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {

                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                      <tr key={key} {...restRowProps}>
                        {row.cells.map((cell) => {
                          const { key, ...restCellProps } = cell.getCellProps();
                          return (
                            <td
                              key={key}
                              {...restCellProps}
                              className="table-td"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse flex-wrap">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  style={{
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    
  }}
  contentLabel="Server Response Modal"
  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
  <div className="relative w-full max-h-full">
    <div className="relative bg-white rounded-lg shadow">
      <button
        type="button"
        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        onClick={closeModal}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Delete</span>
      </button>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-900">Delete booking</h3>
        <p className="text-sm text-gray-500">{modalContent}</p>
      </div>
        <div className="px-6 py-3 bg-gray-100 rounded-b-lg lg:px-8">
            <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={closeModal}
            >
                Cancel
            </button>
            <button
                type="button"
                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => deletebooking(userData._id)}
            >
                Delete
            </button>
            </div>
    </div>
  </div>
</Modal>
<Modal
  isOpen={modalsellIsOpen}
  onRequestClose={closeSellModal}
  style={{
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
  }}
  contentLabel="Server Response Modal"
  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
  <div className="relative w-full max-h-full">
    <div className="relative bg-white rounded-lg shadow">
      <button
        type="button"
        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        onClick={closeSellModal}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Sell</span>
      </button>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-900">Sell Ticket</h3>
        <p className="text-sm text-gray-500">{modalSellContent}</p>
      </div>
        <div className="px-6 py-3 bg-gray-100 rounded-b-lg lg:px-8">
            <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={closeSellModal}
            >
                Cancel
            </button>
            <button
                type="button"
                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => markContactedSold(selldata._id, selldata)}
            >
                Sell
            </button>
            </div>
    </div>
  </div>
</Modal>
<Modal
  isOpen={modalContactedIsOpen}
  onRequestClose={closeModalContacted}
  style={{
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
  }}
  contentLabel="Server Response Modal"
  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
  <div className="relative w-full max-h-full">
    <div className="relative bg-white rounded-lg shadow">
      <button
        type="button"
        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        onClick={closeModalContacted}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Contacted</span>
      </button>
      <div className="px-6 py-6 lg:px-8">
        <h3 className="mb-4 text-xl font-medium text-gray-900">Mark as contacted</h3>
        <div className="text-sm text-gray-500">{modalContactedContent}</div>
      </div>
        <div className="px-6 py-3 bg-gray-100 rounded-b-lg lg:px-8">
            <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={closeModalContacted}
            >
                Cancel
            </button>
            <button
                type="button"
                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => markContacted(contacteddata._id)}
            >
                Contacted
            </button>
            </div>
    </div>
  </div>
</Modal>
    </>
  );
};

export default ExamapleOne;
