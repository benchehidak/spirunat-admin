/* eslint-disable react/display-name */
'use client';
import React, { useState, useMemo, useEffect } from "react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import axios from "axios";

import { Menu } from "@headlessui/react";

import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import Modal from "react-modal";
import { toast } from "react-toastify";

const OrdersTable = () => {
  //////////////MODAL DECLARATION////////////
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ModalDeleteData, setModalDeleteData] = useState(null);

  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    axios.post('/api/orders/getallorders', {})
      .then(response => {
        if (response.data.success) {
          setOrdersData(response.data.order);
        } else {
          toast.error("Failed to fetch orders");
        }
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const COLUMNS = [
    {
      Header: "Order ID",
      accessor: "id",
      Cell: (row) => <span>{`${row?.cell?.value.slice(0, 3)}...${row?.cell?.value.slice(-3)}`}</span>,
    },
    {
      Header: "Client",
      accessor: (row) => `${row.fname} ${row.lname}`,
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Total",
      accessor: "totalAmount",
      Cell: (row) => <span>{row?.cell?.value.toFixed(3)} TND</span>,
    },
    {
      Header: "Statut",
      accessor: "status",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Date",
      accessor: "createdAt",
      Cell: (row) => <span>{new Date(row?.cell?.value).toLocaleString()}</span>,
    },
    {
      Header: "Addresse",
      accessor: "deliveryAdress",
      Cell: (row) => (
        <div>
          <div>{row?.cell?.value.street}</div>
          <div>{row?.cell?.value.city}, {row?.cell?.value.state} {row?.cell?.value.zipCode}</div>
        </div>
      ),
    },
    // {
    //   Header: "Delivery Info",
    //   accessor: "deliveryInfo",
    //   Cell: (row) => (
    //     <div>
    //       <div>Date: {row?.cell?.value.deliveryDate}</div>
    //       <div>Time: {row?.cell?.value.deliveryTime}</div>
    //       <div>Fee: ${row?.cell?.value.deliveryFee.toFixed(2)}</div>
    //       <div>Carrier: {row?.cell?.value.delivery_carrier}</div>
    //       <div>Tracking: {row?.cell?.value.tracking_number}</div>
    //     </div>
    //   ),
    // },
    {
      Header: "Payment",
      accessor: "paymentMethod",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: "Produits",
      accessor: "products",
      Cell: (row) => (
        <div>
          {row?.cell?.value.map(product => (
            <div key={product.idProd}>
              {product.qte}x {product.prodName} @ {product.price.toFixed(3)} TND
            </div>
          ))}
        </div>
      ),
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (row) => (
        <div>
          <Dropdown
            classMenuItems="right-0 w-[140px] top-[-60px]"
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
                    ${item.name === "cancel"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white"
                      : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"}
                      ${item.name === "deliver" ? "bg-success-500 text-success-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white" : ""}
                    w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex space-x-2 items-center rtl:space-x-reverse`}
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
      ),
    },
  ];

  const actions = [
    {
      name: "cancel",
      icon: "heroicons-outline:trash",
      click: (orderData) => {
        
        console.log("Delete order", orderData);
        axios.post('/api/orders/updateOrder', {
          id: orderData.id,
          status: "cancelled"
        })
          .then(response => {
            if (response.data.success) {
              toast.success('Success', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              toast.warning(response.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
              });
              setModalIsOpen(false);
            }
          })
          .catch(error => {
            console.error("Error cancelling order:",
              error);

        })
        
      },
    },
    {
      name : "ship",
      icon: "heroicons-outline:truck",
      click: (orderData) => {
        console.log("Ship order", orderData);
        axios.post('/api/orders/updateOrder', {
          id: orderData.id,
          status: "shipped"
        })
          .then(response => {
            if (response.data.success) {
              toast.success('Success', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              toast.warning(response.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
              });
              setModalIsOpen(false);
            }
          })
          .catch(error => {
            console.error("Error shipping order:",
              error);

        })
      },
    },
    {
      name: "deliver",
      icon: "heroicons-outline:check-circle",
      click: (orderData) => {
        console.log("Deliver order", orderData);
        axios.post('/api/orders/updateOrder', {
          id: orderData.id,
          status: "delivered"
        })
          .then(response => {
            if (response.data.success) {
              toast.success('Success', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
              });
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              toast.warning(response.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true,
              });
              setModalIsOpen(false);
            }
          })
          .catch(error => {
            console.error("Error delivering order:",
              error);

        })
      
      },
    }
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => ordersData, [ordersData]);

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

  /////////// modal ///////////

  const deleteOrder = () => {
    closeModalDel();
    axios.delete(`/api/orders/deleteorder?id=${ModalDeleteData.id}`)
      .then(function (response) {
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.warning(response.data.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
          });
          setModalIsOpen(false);
        }
      })
      .catch(function (error) {
        console.log('Error', error);
      });
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
        contentLabel="Server Response Modal"
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4 overflow-x-hidden overflow-y-auto bg-white rounded-lg shadow"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="relative w-full max-h-full">
          <div className="relative bg-white rounded-lg shadow">
            <div className="px-6 py-6 lg:px-8">
              <h4 className="font-medium text-lg mb-3 text-slate-900">
                Are you sure you want to delete this order?
              </h4>
              <div className="text-base text-slate-600 dark:text-slate-300">
                Order ID: {ModalDeleteData?.id}
              </div>
            </div>
            <div className="px-6 py-3 bg-gray-100 rounded-b-lg lg:px-8">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                // onClick={closeModalDel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={deleteOrder}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Orders</h4>
          <div className="flex space-x-2">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} className="h-10" />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps()}
              >
                <thead className="border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th className="table-th" {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render('Header')}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                              : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps()}
                >
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td
                            className="table-td"
                            {...cell.getCellProps()}
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
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
                  className={` ${pageIdx === pageIndex
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
                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default OrdersTable;
